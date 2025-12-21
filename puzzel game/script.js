let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;

async function startQuiz() {
    document.getElementById("start-screen").classList.add("hide");
    document.getElementById("quiz-screen").classList.remove("hide");

    const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
    const data = await res.json();

    questions = data.results.map(q => ({
        question: q.question,
        options: shuffle([...q.incorrect_answers, q.correct_answer]),
        answer: q.correct_answer
    }));

    loadQuestion();
}

function loadQuestion() {
    answered = false;
    const q = questions[currentIndex];

    document.getElementById("question").innerHTML = q.question;
    document.getElementById("score").innerText = `Score: ${score}`;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerHTML = option;
        btn.onclick = () => checkAnswer(btn, option);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(button, selected) {
    if (answered) return;
    answered = true;

    const correct = questions[currentIndex].answer;

    if (selected === correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
        document.querySelectorAll("#options button").forEach(btn => {
            if (btn.innerHTML === correct) {
                btn.classList.add("correct");
            }
        });
    }

    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        loadQuestion();
    }
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}


