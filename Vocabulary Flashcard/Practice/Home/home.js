function sendNumberOfQuestions(){
    document.cookie = "numberOfQuestions = " + document.getElementById("numberOfQuestions").value;
    const xhhtp = new XMLHttpRequest();
    xhhtp.open("POST", "home.php", true);
    xhhtp.send();
}