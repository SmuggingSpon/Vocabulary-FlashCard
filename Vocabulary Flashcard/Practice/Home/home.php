<?php
    if(isset($_POST)){
        $numberOfQuestionsFile = fopen("../../Data/Number Of Questions.txt", "w");
        fwrite($numberOfQuestionsFile, $_COOKIE["numberOfQuestions"]);
    }