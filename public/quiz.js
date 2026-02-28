let studentData = localStorage.getItem("studentData")

let student = JSON.parse(studentData)

console.log(student)

let score = 0;

let questionEl = document.querySelector("#question");
let optionsEl = document.querySelector("#options");
let nextBtn = document.querySelector("#nextBtn");
let questionCountEl = document.querySelector("#questionCount");
let timerEl = document.querySelector("#timer");
let totalTime = 35*60;
let timerInterval;

let info = document.querySelector("#studentInfo")
info.textContent = `Name: ${student.name} | Roll: ${student.roll}| Class: ${student.class}`

let questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        correct: 0

    },
    {
        question: "Which tag is used for paragraph?",
        options: ["<p>", "<h1>", "<div>", "<span>"],
        correct: 0
    }


];
let currentQuestion = 0;


function startExamTimer() {

    timerInterval = setInterval(() => {

        let minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;

        timerEl.textContent = 
        `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        totalTime--;

        if (totalTime < 0) {
            clearInterval(timerInterval);

            localStorage.setItem("score", score);
            window.location.href = "result.html";
        }

    }, 1000);
}

function loadQuestion() {

nextBtn.disabled = true

    let q = questions[currentQuestion];

    questionCountEl.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach((option, index) => {
        let btn = document.createElement("button");
        btn.textContent = option;

        btn.addEventListener("click", () => {

            clearInterval(timerInterval);

            let allButtons = optionsEl.querySelectorAll("button");

            allButtons.forEach(button => {
                button.disabled = true;
            });
            if (index === q.correct) {
                btn.style.backgroundColor = "green";
                score++;
            } else {
                btn.style.backgroundColor = "red";

                // correct answer bhi green karo
                allButtons[q.correct].style.backgroundColor = "green";
            }
nextBtn.disabled = false;  
        });

        optionsEl.appendChild(btn);

    });
}

loadQuestion();


nextBtn.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
       let finalData = {
  name: student.name,
  roll: student.roll,
  class: student.class,
  score: score,
  total: questions.length,
  date: new Date().toLocaleString()
};

fetch("http://localhost:3000/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(finalData)
})
.then(res => res.json())
.then(data => {
  console.log(data);
  window.location.href = "result.html";
});
    }

});

startExamTimer();