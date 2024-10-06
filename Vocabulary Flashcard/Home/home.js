let decksList = document.getElementById("decks-container");
const decksName = [""];
document.cookie = "currentDeck = None";
fetch("../Data/decksList.txt").then(
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
        for(let i = 0; i + 1 < decksName.length; i++){
            let currentDeck = document.createElement("li");
            currentDeck.innerHTML = decksName[i];
            currentDeck.className = "list-group-item list-group-item-info list-group-item-action";
            currentDeck.addEventListener("click", function() {
                document.getElementById("current-deck").innerHTML = "Current Deck: " + decksName[i];
                while(true){
                    let methodLinks = document.getElementsByClassName("btn btn-primary btn-lg disabled");
                    if(methodLinks.length == 0){
                        break;
                    }
                    for(let methodLink of methodLinks){
                        methodLink.className = "btn btn-primary btn-lg";
                    }
                }
                document.cookie = "currentDeck = " + decksName[i];
                const xhhtp = new XMLHttpRequest();
                xhhtp.open("POST", "home.php", true);
                xhhtp.send();
            });
            decksList.appendChild(currentDeck);
        }
    }
).catch(Error => console.log(Error));