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
    for(let cntQuestions = 1, cntWords = 1; cntQuestions <= numberOfQuestions; cntQuestions++){
        document.getElementById("question-container").innerHTML += "<p class = \"h5\">" + cntQuestions.toString() + ". " + currentMeanings[cntQuestions - 1] + "</p>\n";
        document.getElementById("question-container").innerHTML += "<input id = \"" + cntQuestions.toString() + "\" type = \"text\"><p id = \"p" + cntQuestions.toString() + "\" class = \"after-input\"></p>";
    }
    for(let i = 1; i <= numberOfQuestions; i++){
        document.getElementById(i.toString()).addEventListener("keydown", function(keyPressed){
            if(keyPressed.code == "ArrowDown" && i < numberOfQuestions){
                document.getElementById((i + 1).toString()).focus();
            }
            else if(keyPressed.code == "ArrowUp" && i > 1){
                document.getElementById((i - 1).toString()).focus();
            }
        });
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
    let correct = 0, incorrect = 0, incorrectQuestions = [];
    for(let i = 1; i <= numberOfQuestions; i++){
        let S = document.getElementById(i.toString()).value.trim();
        if(S == currentWords[i - 1].trim()){
            correct++;
        }
        else{
            incorrect++;
            incorrectQuestions.push(i);
        }
        document.getElementById("p" + i.toString()).innerHTML = currentWords[i - 1].trim();
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