
// on met le trajet vers les # pages de peluches dans variables
let pageAlbert = "albert.html"
let pageErnesta = "ernesta.html"
let pageKokoro = "kokoro.html"
let pageKuma = "kuma.html"

// cette fonction envoie la page de peluche en fonction de la peluche demandée
function requete(page) {
    let xhr = new XMLHttpRequest();
    let peluche = document.getElementById('peluche');
    
    xhr.onreadystatechange = function() {
        console.log(this);
        if (this.readyState == 4 && this.status == 200) {
            peluche.innerHTML = this.response;
        } else if (this.readyState == 4 && this.status == 404) {
            alert('err 404');
        }
    };
    
    xhr.open("GET", page, true);
    xhr.send();
}

// On récupère les onglets de navigation
let peluchesLI = document.querySelectorAll("ul > li");
let albertLI = peluchesLI[0];
let ernestaLI = peluchesLI[1];
let kokoroLI = peluchesLI[2];
let kumaLI = peluchesLI[3];
// albertLI.style.border = "1px solid black";

// en fonction de l'onglet sur lequel on clique, on affiche la peluche choisie
albertLI.addEventListener('click', function() {
    requete(pageAlbert);
});
ernestaLI.addEventListener('click', function() {
    requete(pageErnesta);
});
kokoroLI.addEventListener('click', function() {
    requete(pageKokoro);
});
kumaLI.addEventListener('click', function() {
    requete(pageKuma);
});

// par defaut, on affiche la page de Albert
requete(pageAlbert);