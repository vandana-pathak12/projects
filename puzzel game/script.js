let questions = [];

async function loadQuiz() {
    const res = await fetch(
        "https://opentdb.com/api.php?amount=10&category=9&type=multiple"
    );
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
        const div = document.createElement("div");
        div.className = "question";

        div.innerHTML = `
            <p><b>Q${i + 1}. ${q.question}</b></p>
            <div class="options">
                ${q.options.map(opt => `
                    <label>
                        <input type="radio" name="q${i}" value="${opt}">
                        ${opt}
                    </label>
                `).join("")}
            </div>
        `;

        quizDiv.appendChild(div);
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

    document.getElementById("result").innerText =
        `Your Score: ${score} / ${questions.length}`;

    document.getElementById("submitBtn").disabled = true;
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

loadQuiz();



