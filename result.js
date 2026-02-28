let studentData = localStorage.getItem("studentData");
let scoreData = localStorage.getItem("score");

if (!studentData || !scoreData) {
    document.body.innerHTML = "<h2>No Quiz Data Found. Please take the quiz first.</h2>";
} else {

    let student = JSON.parse(studentData);
    let score = Number(scoreData);

    let totalQuestions = 2;
    let percentage = ((score / totalQuestions) * 100).toFixed(0);
    let result = percentage >= 50 ? "PASS" : "FAIL";

    document.querySelector("#studentDetails").textContent =
    `Name: ${student.name} | Roll: ${student.roll} | Class: ${student.class}`;

    document.querySelector("#scoreText").textContent =
    `Score: ${score} / ${totalQuestions}`;

    document.querySelector("#percentageText").textContent =
    `Percentage: ${percentage}%`;

    document.querySelector("#finalResult").textContent =
    result;
}