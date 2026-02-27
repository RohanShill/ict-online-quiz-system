let StudentName = document.querySelector("#name")
let rollno = document.querySelector("#rollNo")
let SelectClass = document.querySelector("#class")
let form = document.querySelector("#studentForm");

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let nameValue = StudentName.value
    console.log(nameValue)

    let rollValue = rollno.value
    console.log(rollValue)

    let classValue = SelectClass.value
    console.log(classValue)

    if (nameValue === "" || rollValue === "" || classValue === "") {
        alert("Please fill all the fields");
        return; //Alert
    }


    let student = {  //this is student object
        name: nameValue,
        roll: rollValue,
        class: classValue
    }

    console.log(student)

    localStorage.setItem("studentData", JSON.stringify(student)) //locally store ho rha data

    window.location.href = "quiz.html" // redirect to quiz.html

})
