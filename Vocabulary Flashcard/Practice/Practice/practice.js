let words = [""], meanings = [""];
let numberOfWords, currentQuestion = 1, countAllQuestions;
let questions = [""], correctAnswerIndex = [0, ], answers = [[""], [""], [""], [""]];
function setUpQuestion(){
    document.getElementById("meaning-ask-1").innerHTML = questions[currentQuestion];
    document.getElementById("text-word-1").innerHTML = answers[0][currentQuestion];
    document.getElementById("text-word-2").innerHTML = answers[1][currentQuestion];
    document.getElementById("text-word-3").innerHTML = answers[2][currentQuestion];
    document.getElementById("text-word-4").innerHTML = answers[3][currentQuestion];
    document.getElementById("word-1").style.boxShadow = "";
    document.getElementById("word-2").style.boxShadow = "";
    document.getElementById("word-3").style.boxShadow = "";
    document.getElementById("word-4").style.boxShadow = "";
    document.getElementById("question-count").innerHTML = currentQuestion.toString() + "/" + countAllQuestions.toString();
}
fetch("../../Data/currentDeck.txt").then(
    response => response.text()
).then(
    currentDeckName => {
        fetch("../../Data/" + currentDeckName + ".deck").then(
            response => response.text()
        ).then(
            data => {
                for(let i = 0; i < data.length; ){
                    let word = "";
                    while(i < data.length && data[i] != '$'){
                        word += data[i++];
                    }
                    if(i == data.length){
                        break;
                    }
                    i++;
                    while(i < data.length && data[i] == ' '){
                        i++;
                    }
                    if(i == data.length){
                        break;
                    }
                    let meaning = "";
                    while(i < data.length && data[i] != '$'){
                        meaning += data[i++];
                    }
                    if(i == data.length){
                        break;
                    }
                    i++;
                    while(i < data.length && data[i] == ' '){
                        i++;
                    }
                    words.push(word);
                    meanings.push(meaning);
                }
                numberOfWords = words.length - 1;
            }
        ).catch(Error => console.log(Error));
        fetch("../../Data/Number Of Questions.txt").then(
            response => response.text()
        ).then(
            numberOfQuestions => {
                numberOfQuestions = parseInt(numberOfQuestions);
                countAllQuestions = numberOfQuestions;
                while(words.length <= numberOfQuestions){
                    for(let i = 1; i <= numberOfWords; i++){
                        words.push(words[i]);
                        meanings.push(meanings[i]);
                    }
                }
                let fakeWords = [""], fakeMeanings = [""];
                for(let i = 1; i < words.length; i++){
                    fakeWords.push(words[i]);
                    fakeMeanings.push(meanings[i]);
                }
                for(let _ = 0; _ < 10; _++){
                    for(let i = 1; i < words.length; i++){
                        let index = Math.floor(Math.random() * (words.length - 1)) + 1;
                        [words[i], words[index]] = [words[index], words[i]];
                        [meanings[i], meanings[index]] = [meanings[index], meanings[i]];
                    }
                }
                for(let i = 1; i <= numberOfQuestions; i++){
                    questions.push(meanings[i]);
                    answers[Math.floor(Math.random() * 4)].push(words[i]);
                    for(let _ = 0; _ < 10; _++){
                        for(let j = 1; j < fakeWords.length; j++){
                            let index = Math.floor(Math.random() * (words.length - 1)) + 1;
                            [fakeWords[i], fakeWords[index]] = [fakeWords[index], fakeWords[i]];
                            [fakeMeanings[i], fakeMeanings[index]] = [fakeMeanings[index], fakeMeanings[i]];
                        }
                    }
                    for(let j = 0, index = 1; j < 4; j++, index++){
                        if(answers[j].length == i + 1){
                            correctAnswerIndex.push(j + 1);
                            continue;
                        }
                        while(true){
                            if(fakeWords[index] == words[i] || fakeMeanings[index] == meanings[i]){
                                index++;
                                continue;
                            }
                            let needAdd = false;
                            for(let k = j - 1; k > -1; k--){
                                if(answers[k][answers[k].length - 1] == fakeWords[index]){
                                    needAdd = true;
                                    index++;
                                    break;
                                }
                            }
                            if(!needAdd){
                                break;
                            }
                        }
                        answers[j].push(fakeWords[index]);
                    }
                }
                setUpQuestion();
            }
        ).catch(Error => console.log(Error));
    }
).catch(Error => console.log(Error)); 
let countCorrect = 0;
let haveAnswered = false, haveClicked = false;
function nextQuestion(){
    if(currentQuestion == countAllQuestions){
        document.getElementById("meaning-ask-1").innerHTML = "Correct: " + countCorrect.toString();
        let countIncorrect = countAllQuestions - countCorrect;
        document.getElementById("meaning-ask-2").innerHTML = "Incorrect: " + countIncorrect.toString();
        currentQuestion = -1;
        document.getElementById("next-question-button").innerHTML = "Reload";
    }
    else if(currentQuestion == -1){
        location.reload();
    }
    else{
        haveAnswered = false;
        haveClicked = false;
        currentQuestion++;
        setUpQuestion();
    }
}
function checkAnswer(id){
    if(!haveClicked){
        haveClicked = true;
        let correctIndex = correctAnswerIndex[currentQuestion];
        document.getElementById("word-" + correctIndex.toString()).style.boxShadow = "3px 3px 3px lightgreen";
        for(let i = 1; i < 5; i++){
            if(i != correctIndex){
                document.getElementById("word-" + i.toString()).style.boxShadow = "3px 3px 3px #f47575";
            }
        }
        if(id == correctIndex){
            countCorrect++;
        }
    }
}
