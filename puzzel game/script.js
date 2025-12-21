let questions = [];
let currentIndex = 0;
let score = 0;
let userAnswers = [];

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
        url = "https://opentdb.com/api.php?amount=10&type=multiple";
    }

    const res = await fetch(url);
    const data = await res.json();

    questions = data.results.map(q => ({
        question: q.question,
        options: shuffle([...q.incorrect_answers, q.correct_answer]),
        answer: q.correct_answer
    }));

    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentIndex];
    document.getElementById("question").innerHTML =
        `Q${currentIndex + 1}. ${q.question}`;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(opt => {
        optionsDiv.innerHTML += `
            <label>
                <input type="radio" name="option" value="${opt}">
                ${opt}
            </label>
        `;
    });
}

function nextQuestion() {
    const selected = document.querySelector('input[name="option"]:checked');
    userAnswers[currentIndex] = selected ? selected.value : null;

    if (currentIndex < questions.length - 1) {
        currentIndex++;
        loadQuestion();
    } else {
        submitQuiz();
    }
}

function submitQuiz() {
    questions.forEach((q, i) => {
        if (userAnswers[i] === q.answer) {
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

