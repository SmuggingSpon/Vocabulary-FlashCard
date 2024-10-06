fetch("../../Data/currentContest.txt").then(
    response => response.text()
).then(
    data => {
        let text = "";
        for(let i = 0; i < data.length; i++){
            if(data[i] == '#'){
                text += ';';
            }
            else{
                text += data[i];
            }
        }
        for(let i = 0, cntQuestions = 1, cntWords = 1; i < text.length; i++, cntQuestions++){
            let meaning = "", words = ["", "", "", ""];
            while(text[i] != '$'){
                meaning += text[i++];
            }   
            i++;
            for(let j = 0; j < 4; j++, i++){
                while(text[i] != '$'){
                    words[j] += text[i++];
                }
            }
            document.getElementById("question-container").innerHTML += "<p class = \"h5\">" + cntQuestions.toString() + ". " + meaning + "</p>\n";
            let index = parseInt(text[i++]);
            for(let j = 0; j < 4; j++, cntWords++){
                if(j == index){
                    document.getElementById("question-container").innerHTML += "<input class = \"correct-answer-radio\" name = \"" + cntQuestions.toString() + "\" type = \"radio\" id = \"" + cntWords.toString() + "\">\n<label for = \"" + cntWords.toString() + "\" class = \"correct-answer\">" + words[j] + "</label>\n<br>\n";
                }
                else{
                    document.getElementById("question-container").innerHTML += "<input name = \"" + cntQuestions.toString() + "\" type = \"radio\" id = \"" + cntWords.toString() + "\">\n<label for = \"" + cntWords.toString() + "\">" + words[j] + "</label>\n<br>\n";
                }
            }
        }
    }
).catch(Error => console.log(Error));
function submitContest(){
    let correctItems = document.getElementsByClassName("correct-answer");
    for(let i = 0; i < correctItems.length; i++){
        correctItems[i].style.fontWeight = "bold";
    }
    let correctRadios = document.getElementsByClassName("correct-answer-radio");
    let correct = 0, incorrect = 0;
    for(let i = 0; i < correctRadios.length; i++){
        if(correctRadios[i].checked){
            correct++;
        }
        else{
            incorrect++;
        }
    }
    document.getElementById("correct-display").innerHTML = "Correct: " + correct.toString();
    document.getElementById("incorrect-display").innerHTML = "Incorrect: " + incorrect.toString();
}