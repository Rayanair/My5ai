const path = document.querySelector(".path")
fetch("h5ai.php")
.then(data => data.json())
.then(response => {

function rec(response){
    const path = document.querySelector(".path")
    const currentDiv = document.createElement("div");
    currentDiv.setAttribute("class","contentfichier")
    path.appendChild(currentDiv);
    
    for(let i = 0; i<response.length; i++){

            if(response[i].childrens?.length){
            const path = document.querySelector(".path")
            const newDiv = document.createElement("div");
            const newContent = document.createTextNode(response[i].name+"  Dernière modification: "+response[i].mod);
            newDiv.appendChild(newContent);
            newDiv.setAttribute("class","dossier")
            path.appendChild(newDiv);
            const  img = document.createElement("img");   
            newDiv.appendChild(img); 
            img.setAttribute("src","/media/dossier.png")
            img.setAttribute("class","imgdoss")

            newDiv.addEventListener("click", ()=>{
                const chemin = document.querySelector(".chemin")
                chemin.innerHTML = response[i].parent
                const retour = document.querySelector(".retour")
                retour.innerHTML = "<a href='javascript:history.go(0)'>Retour</a>"
                path.innerHTML = "";
                rec(response[i].childrens)
            })  

            }else{

            const newDiv = document.createElement("div");
            newDiv.setAttribute("class","fichier")
            const newContent = document.createTextNode(response[i].name+" Taille du fichier: "+response[i].size+" bytes Dernière modification: "+response[i].mod);
            newDiv.appendChild(newContent);
            currentDiv.appendChild(newDiv);
            let php = response[i].name.substr(-3)
            let js = response[i].name.substr(-2)
            let scss = response[i].name.substr(-4)
            newDiv.addEventListener("click", ()=>{
                const chemin = document.querySelector(".chemin")
                chemin.innerHTML = response[i].parent
                const retour = document.querySelector(".retour")
                retour.innerHTML = "<a href='javascript:history.go(0)'>Retour</a>"
                path.innerHTML = "";
                path.textContent = response[i].content;
            })  

            const  img = document.createElement("img");   
            newDiv.appendChild(img); 
            if(php == "php"){
                img.setAttribute("src","/media/php.png")
            }else if(js == "js"){
                img.setAttribute("src","/media/js.png")
            }else if(scss == "scss"){
                img.setAttribute("src","/media/scss.png")
            }else if(php == "css"){
                img.setAttribute("src","/media/css.png")
            }else if(scss == "html"){
                img.setAttribute("src","/media/html.png")
            }else {
                img.setAttribute("src","/media/fichier.png")
            }
            }       
    }
}

rec(response)

});
