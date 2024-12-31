<?php
    if(isset($_POST)){
        $currentContestFile = fopen("../../Data/currentContest.txt", "w") or die("Unable to open file!");
        fwrite($currentContestFile, $_COOKIE["sendData"]);
    }