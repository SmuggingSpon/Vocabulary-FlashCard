function sendNumberOfQuestions(){
    document.cookie = "numberOfQuestions = " + document.getElementById("number-of-questions").value;
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "home.php", true);
    xhttp.send();
}