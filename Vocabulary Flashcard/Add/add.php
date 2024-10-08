<?php
    if(isset($_POST)){
        $word = $_COOKIE["word"];
        $meaning = $_COOKIE["meaning"];
        $deck = fopen("../Data/" . $_COOKIE["deck"] . ".deck", "w");
        for($i = 0, $j = 0; $i < strlen($word); $i++){
            $currentMeaning = "";
            $currentWord = "";
            while($word[$i] != '|'){
                $currentWord .= $word[$i];
                $i++;
            }
            while($meaning[$j] != '|'){
                if($meaning[$j] == '#'){
                    $currentMeaning .= ';';
                }
                else{
                    $currentMeaning .= $meaning[$j];
                }
                $j++;
            }
            $j++;
            fwrite($deck, $currentWord . "$\n" . $currentMeaning . "$\n\n");
        }
    }