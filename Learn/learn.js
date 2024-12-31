let currentIndex = 1, numberOfWords;
let words = [""], meanings = [""];
fetch("../Data/currentDeck.txt").then(
    response => response.text()
).then(
    currentDeckName => {
        fetch("../Data/" + currentDeckName + ".deck").then(
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
                document.getElementById("flashcard-count").innerHTML = "1/" + numberOfWords.toString();
                document.getElementById("flashcard-content").innerHTML = words[1];
            }
        ).catch(Error => console.log(Error));
    }
).catch(Error => console.log(Error)); 
let isWord = true;
function movePrevious(){
    if(currentIndex == 1){
        currentIndex = numberOfWords;
    }
    else{
        currentIndex--;
    }
    document.getElementById("flashcard-count").innerHTML = currentIndex.toString() + "/" + numberOfWords.toString();
    document.getElementById("flashcard-content").innerHTML = words[currentIndex];
    isWord = true;
}
function moveNext(){
    if(currentIndex == numberOfWords){
        currentIndex = 1;
    }
    else{
        currentIndex++;
    }
    document.getElementById("flashcard-count").innerHTML = currentIndex.toString() + "/" + numberOfWords.toString();
    document.getElementById("flashcard-content").innerHTML = words[currentIndex];
    isWord = true;
}
let id = null;
function flipCard(){
    let card = document.getElementById("word-container");
    clearInterval(id);
    id = setInterval(scaleUpFrame, 1);
    let countFrame = 0, width = 60.0, height = 40.0;
    function scaleUpFrame(){
        countFrame++;
        if(countFrame < 25){
            width += 1.5;
            height += 1.0;
            card.style.width = width.toString() + "%";
            card.style.height = height.toString() + "%"; 
        }
        else if(countFrame == 25){
            if(isWord){
                document.getElementById("flashcard-content").innerHTML = meanings[currentIndex];
            }
            else{
                document.getElementById("flashcard-content").innerHTML = words[currentIndex];
            }
            isWord = !isWord;
        }
        else if(countFrame < 50){
            width -= 1.5;
            height -= 1.0;
            card.style.width = width.toString() + "%";
            card.style.height = height.toString() + "%"; 
        }
        else{
            clearInterval(id);
        }
    }
}
function PronounceWord(){
    let speech = new SpeechSynthesisUtterance();
    speech.text = document.getElementById("flashcard-content").innerHTML;
    window.speechSynthesis.speak(speech);
}