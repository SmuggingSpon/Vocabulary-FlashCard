<?php
    if(isset($_POST)){
        $currentDeckFile = fopen("../Data/currentDeck.txt", "w") or die("Unable to open file!");
        fwrite($currentDeckFile, $_COOKIE["currentDeck"]);
    }