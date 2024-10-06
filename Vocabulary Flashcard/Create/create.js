function createDeck(){
    document.cookie = "deckName = "+ document.getElementById("deck-name").value;
    const xhhtp = new XMLHttpRequest();
    xhhtp.open("POST", "create.php", true);
    xhhtp.send();
    location.reload();
}