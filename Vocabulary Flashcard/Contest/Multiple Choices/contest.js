let numberOfQuestions = 0;
let currentWords = [], currentMeanings = [];
function prepareContest(){
    for(let _ = 0; _ < 10; _++){
        for(let i = 0; i < currentWords.length; i++){
            let index = Math.floor(Math.random() * currentWords.length);
            [currentWords[i], currentWords[index]] = [currentWords[index], currentWords[i]];
            [currentMeanings[i], currentMeanings[index]] = [currentMeanings[index], currentMeanings[i]];
        }
    }
    let allIndex = [];
    for(let i = 0; i < currentWords.length; i++){
        allIndex.push(i);
    }
    for(let cntQuestions = 1, cntWords = 1; cntQuestions <= numberOfQuestions; cntQuestions++){
        for(let _ = 0; _ < 10; _++){
            for(let i = 0; i < allIndex.length; i++){
                let index = Math.floor(Math.random() * currentWords.length);
                [allIndex[i], allIndex[index]] = [allIndex[index], allIndex[i]];
            }
        }
        document.getElementById("question-container").innerHTML += "<p class = \"h5\">" + cntQuestions.toString() + ". " + currentMeanings[cntQuestions - 1] + "</p>\n";
        let index = Math.floor(Math.random() * 4);
        for(let j = 0, currentAllIndex = 0; j < 4; j++, cntWords++){
            if(j == index){
                document.getElementById("question-container").innerHTML += "<input class = \"correct-answer-radio\" name = \"" + cntQuestions.toString() + "\" type = \"radio\" id = \"" + cntWords.toString() + "\">\n<label for = \"" + cntWords.toString() + "\" class = \"correct-answer\">" + currentWords[cntQuestions - 1] + "</label>\n<br>\n";
            }
            else{
                if(allIndex[currentAllIndex] == cntQuestions - 1){
                    currentAllIndex++;
                }
                document.getElementById("question-container").innerHTML += "<input name = \"" + cntQuestions.toString() + "\" type = \"radio\" id = \"" + cntWords.toString() + "\">\n<label for = \"" + cntWords.toString() + "\">" + currentWords[allIndex[currentAllIndex]] + "</label>\n<br>\n";
                currentAllIndex++;
            }
        }
    }
}
fetch("../../Data/currentContest.txt").then(
    response => response.text()
).then(
    decksData => {
        for(let i = 0; i < decksData.length; i++){
            let deckName = "";
            while(decksData[i] != '#'){
                deckName += decksData[i++]; 
            }
            if(deckName.length == 0){
                break;
            }
            fetch("../../Data/" + deckName + ".deck").then(
                response => response.text()
            ).then(
                data => {
                    for(let I = 0; I < data.length; ){
                        let word = "";
                        while(I < data.length && data[I] != '$'){
                            word += data[I++];
                        }
                        if(I == data.length){
                            break;
                        }
                        I++;
                        while(I < data.length && data[I] == ' '){
                            I++;
                        }
                        if(I == data.length){
                            break;
                        }
                        let meaning = "";
                        while(I < data.length && data[I] != '$'){
                            meaning += data[I++];
                        }
                        if(I == data.length){
                            break;
                        }
                        I++;
                        while(I < data.length && data[I] == ' '){
                            I++;
                        }
                        currentWords.push(word);
                        currentMeanings.push(meaning);
                    }
                    if(decksData[i + 1] == '#'){
                        i += 2;
                        while(i < decksData.length){
                            numberOfQuestions = numberOfQuestions * 10 + parseInt(decksData[i++]);
                        }
                        prepareContest();
                    }
                }
            ).catch(Error => console.log(Error));
        }
    }
).catch(Error => console.log(Error));
function submitContest(){
    let correctItems = document.getElementsByClassName("correct-answer");
    for(let i = 0; i < correctItems.length; i++){
        correctItems[i].style.fontWeight = "bold";
    }
    let correctRadios = document.getElementsByClassName("correct-answer-radio");
    let correct = 0, incorrect = 0, incorrectQuestions = [];
    for(let i = 0; i < correctRadios.length; i++){
        if(correctRadios[i].checked){
            correct++;
        }
        else{
            incorrect++;
            incorrectQuestions.push(i + 1);
        }
    }
    document.getElementById("correct-display").innerHTML = "Correct: " + correct.toString();
    document.getElementById("incorrect-display").innerHTML = "Incorrect: " + incorrect.toString();
    if(incorrectQuestions.length > 0){
        document.getElementById("incorrect-display").innerHTML += " (";
        for(let i = 0; i + 1 < incorrectQuestions.length; i++){
            document.getElementById("incorrect-display").innerHTML += incorrectQuestions[i] + ", ";
        }
        document.getElementById("incorrect-display").innerHTML += incorrectQuestions[incorrectQuestions.length - 1] + ")";
    }
}