let studentData = localStorage.getItem("studentData")

let student = JSON.parse(studentData)

console.log(student)

let score = 0;

let questionEl = document.querySelector("#question");
let optionsEl = document.querySelector("#options");
let nextBtn = document.querySelector("#nextBtn");

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

function loadQuestion() {
    let q = questions[currentQuestion];

    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach((option, index) => {
        let btn = document.createElement("button");
        btn.textContent = option;

        btn.addEventListener("click", () => {

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

        });

        optionsEl.appendChild(btn);
    });
}

loadQuestion();


nextBtn.addEventListener("click", () => {

    currentQuestion++;

    if(currentQuestion < questions.length){
        loadQuestion();
    } else {
        localStorage.setItem("score", score);
       window.location.href = "result.html";
    }

});

