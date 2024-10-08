let decksList = document.getElementById("decks-container");
const decksName = [""];
let maxNumberOfQuestions = 0;
let isChoose = [];
let words = [], meanings = [];
fetch("../../Data/decksList.txt").then(
    response => response.text()
).then(
    text => {
        for(let i = 0; i < text.length; i++){
            if(text[i] == '$'){
                decksName.push("");
                while(i < text.length){
                    let value = text.charCodeAt(i);
                    if((65 <= value && value <= 90) || (97 <= value && value <= 122) || (48 <= value && value <= 57) || text[i] == '_'){
                        break;
                    } 
                    i++;
                }
                i--;
                continue;
            }
            let value = text.charCodeAt(i);
            if((65 <= value && value <= 90) || (97 <= value && value <= 122) || (48 <= value && value <= 57) || text[i] == '_'){
                decksName[decksName.length - 1] += (text[i] == '_' ? ' ' : text[i]);
            }
        }
        for(let i = 1; i < decksName.length; i++){
            words.push([]);
            meanings.push([]);
        }
        for(let i = 0; i + 1 < decksName.length; i++){
            let currentDeck = document.createElement("li");
            currentDeck.innerHTML = decksName[i];
            currentDeck.className = "list-group-item list-group-item-info list-group-item-action";
            currentDeck.id = i.toString();
            currentDeck.addEventListener("click", function() {
                let x = parseInt(this.id);
                if(isChoose[x]){
                    this.className = "list-group-item list-group-item-info list-group-item-action";
                    maxNumberOfQuestions -= words[x].length;
                }
                else{
                    this.className = "list-group-item list-group-item-success list-group-item-action";
                    maxNumberOfQuestions += words[x].length;
                }
                isChoose[x] = !isChoose[x];
                document.getElementById("max-number-of-questions").innerHTML = "Maximum number of questions: " + maxNumberOfQuestions.toString();
            });
            decksList.appendChild(currentDeck);
            isChoose.push(false);
            fetch("../../Data/" + decksName[i] + ".deck").then(
                response => response.text()
            ).then(
                data => {
                    let currentWords = [], currentMeanings = [];
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
                        currentWords.push(word);
                        currentMeanings.push(meaning);
                    }
                    words[i] = currentWords;
                    meanings[i] = currentMeanings;
                }
            ).catch(Error => console.log(Error));
        }
    }
).catch(Error => console.log(Error));
function sendDataToContest(){
    let sendData = "";
    for(let i = 0; i < isChoose.length; i++){
        if(isChoose[i]){
            sendData += decksName[i] + "#";
        }
    }
    sendData += "#" + document.getElementById("number-of-questions").value.toString();
    document.cookie = "sendData = " + sendData;
    const xhhtp = new XMLHttpRequest();
    xhhtp.open("POST", "home.php", true);
    xhhtp.send();
}