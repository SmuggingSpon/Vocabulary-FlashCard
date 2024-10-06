function sendNumberOfQuestions(){
    document.cookie = "numberOfQuestions = " + document.getElementById("number-of-questions").value;
    const xhhtp = new XMLHttpRequest();
    xhhtp.open("POST", "home.php", true);
    xhhtp.send();
}