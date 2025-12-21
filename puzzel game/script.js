const puzzles = [
    {
        question: "What comes next in the series: 2, 4, 8, 16, ?",
        options: ["18", "24", "32", "20"],
        answer: "32"
    },
    {
        question: "If all roses are flowers and some flowers fade then:",
        options: [
            "All roses fade",
            "Some roses may fade",
            "No roses fade",
            "None"
        ],
        answer: "Some roses may fade"
    },
    {
        question: "Which number is odd one out?",
        options: ["2", "4", "3", "6"],
        answer: "3"
    }
];

let currentIndex = 0;
let score = 0;

function loadQuestion() {
    const q = puzzles[currentIndex];
    document.getElementById("question").innerText = q.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.classList.add("option-btn");

        btn.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected) {
    if (selected === puzzles[currentIndex].answer) {
        score++;
        alert("Correct");
    } else {
        alert("Wrong");
    }
}

function nextQuestions() {
    currentIndex++;

    if (currentIndex < puzzles.length) {
        loadQuestion();
    } else {
        document.querySelector(".container").innerHTML =
            `<h2>Game Over</h2>
             <p>Your Score: ${score}/${puzzles.length}</p>`;
    }
}

loadQuestion();

