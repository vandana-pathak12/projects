let questions = [];

function showCategory() {
    document.getElementById("startScreen").classList.add("hide");
    document.getElementById("categoryScreen").classList.remove("hide");
}

async function startQuiz(type) {
    document.getElementById("categoryScreen").classList.add("hide");
    document.getElementById("quizScreen").classList.remove("hide");

    let url = "";

    if (type === "gk") {
        url = "https://opentdb.com/api.php?amount=10&category=9&type=multiple";
    } else {
        url = "https://opentdb.com/api.php?amount=10&category=18&type=multiple";
    }

    const res = await fetch(url);
    const data = await res.json();

    questions = data.results.map((q, index) => ({
        id: index,
        question: q.question,
        options: shuffle([...q.incorrect_answers, q.correct_answer]),
        answer: q.correct_answer
    }));

    displayQuestions();
}

function displayQuestions() {
    const quizDiv = document.getElementById("quiz");
    quizDiv.innerHTML = "";

    questions.forEach((q, i) => {
        quizDiv.innerHTML += `
            <div class="question">
                <p><b>Q${i + 1}. ${q.question}</b></p>
                <div class="options">
                    ${q.options.map(opt => `
                        <label>
                            <input type="radio" name="q${i}" value="${opt}">
                            ${opt}
                        </label>
                    `).join("")}
                </div>
            </div>
        `;
    });
}

function submitQuiz() {
    let score = 0;

    questions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === q.answer) {
            score++;
        }
    });

    document.getElementById("quizScreen").classList.add("hide");
    document.getElementById("resultScreen").classList.remove("hide");

    document.getElementById("finalScore").innerText =
        `Your Score: ${score} / ${questions.length}`;
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}



