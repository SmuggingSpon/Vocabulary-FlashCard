<?php
    if(isset($_POST)){
        $decksList = fopen("../Data/decksList.txt", "a") or die("Unable to open file!");
        $deckName = $_COOKIE["deckName"];
        $newDeck = fopen("../Data/" . $deckName . ".deck", "w");
        for($i = 0; $i < strlen($deckName); $i++){
            if($deckName[$i] == ' '){
                $deckName[$i] = '_';
            }
        }
        fwrite($decksList, $deckName . "$\n");
    }