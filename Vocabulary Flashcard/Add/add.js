function addCard(){
    document.getElementById("words-container").innerHTML += "<div class = \"word-input-container\"><input class = \"word-input\" type = \"text\" placeholder = \"Word\">\n<input class = \"meaning-input\" type = \"text\" placeholder = \"Meaning\"></div>\n";
}
function removeCard(){
    const wordList = document.getElementsByClassName("word-input-container");
    wordList[wordList.length - 1].remove();
}
function saveCard(){
    let words = document.getElementsByClassName("word-input");
    let meanings = document.getElementsByClassName("meaning-input");
    let wordString = "", meaningString = "";
    if(words.length > 0){
        for(let word of words){
            wordString += word.value + "|";
        }
        for(let meaning of meanings){
            for(let i = 0; i < meaning.value.length; i++){
                if(meaning.value[i] == ';'){
                    meaningString += '#';
                }
                else{
                    meaningString += meaning.value[i];
                }
            }
            meaningString += "|";
        }
    }
    document.cookie = "word = " + wordString;
    document.cookie = "meaning = " + meaningString;
    fetch("../Data/currentDeck.txt").then(
        response => response.text()
    ).then(
        data => {
            document.cookie = "deck = " + data;
            const xhhtp = new XMLHttpRequest();
            xhhtp.open("Post", "add.php", true);
            xhhtp.send();
        }
    )
}
function resetCard(){
    document.getElementById("words-container").innerHTML = "";
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
                        document.getElementById("words-container").innerHTML += "<div class = \"word-input-container\"><input class = \"word-input\" type = \"text\" placeholder = \"Word\" value = \"" + word + "\">\n<input class = \"meaning-input\" type = \"text\" placeholder = \"Meaning\" value = \"" + meaning + "\"></div>\n";
                    }
                }
            ).catch(Error => console.log(Error));
        }
    ).catch(Error => console.log(Error)); 
}
resetCard();