<?php 
 function path($path){
    $_tree = array();
 if(is_dir($path)){
    $opdir = opendir($path);
    while(($files = readdir($opdir)) !== false){
        if($files !== "." && $files !== ".." && $files !== ".DS_Store"){
            $chemin = $path."/".$files;
            if(is_dir($chemin)){
                array_push($_tree,array("name" => $files, "childrens" => path($chemin), "size" => filesize($chemin), "mod" => date("F d Y H:i:s.", fileatime($chemin)), "parent" => $chemin ));
            }else{
                $tr = substr($chemin, -3);
                if($tr == "png"){
                    $content = file_get_contents($chemin); 
                    $content = "";
                }else{
                    $content = file_get_contents($chemin); 
                }  
                array_push($_tree, ["name" => $files, "size" => filesize($chemin), "mod" => date("F d Y H:i:s.", fileatime($chemin)), "content" => $content, "parent" => $chemin]);
            }
        }
    }
 }elseif(!is_dir($path)){
    echo "Erreur ce n'est pas un dossier";
 }
 return $_tree;
    
 }
echo json_encode(path("/Users/rayan/Desktop/twitter"), JSON_PRETTY_PRINT);
 