function createDeck(){
    document.cookie = "deckName = "+ document.getElementById("deck-name").value;
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "create.php", true);
    xhttp.send();
    location.reload();
}