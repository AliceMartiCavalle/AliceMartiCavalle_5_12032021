// localStorage.clear();

//* AFFICHAGE PAGE D'ACCUEIL

let carousel = document.querySelector('#carouselControls > div');
let newTeddy = document.querySelector('.boxNews > a > img');

async function afficheNounours() {
    console.log('%c AFFICHE NOUNOURS ', fct);

    //* On attend le retour de fetch
    let data = await GetNounours();

    console.log(data);

    //* On remplit avec les img renvoyées par l'API
    // console.log(data[0].imageUrl);
    for (let i = 0; i < data.length; i++) {
        // imgs[i].src = data[i].imageUrl
        let newImg = document.createElement("div");
        if (i == 0) {
            newImg.setAttribute("class", "carousel-item active"); 
        } else if (i == 4) {
            newTeddy.setAttribute('src', `${data[i].imageUrl}`);
            newImg.setAttribute("class", "carousel-item"); 
        } else {
            newImg.setAttribute("class", "carousel-item"); 
        }
        newImg.innerHTML = `<a href="produit.html?id=${data[i]._id}"><img src="${data[i].imageUrl}" class="d-block w-100 my-auto" alt="Photo de ${data[i].name}, ours en peluche"></a>`
        carousel.appendChild(newImg)  
    }
    console.log(carousel);
}
afficheNounours();

//// Si l'utilisateur a déjà une commande en cours

//* On récupère la commande dans local storage
let choixNounoursTab = JSON.parse(localStorage.getItem("choixNounoursTab"));
console.log(choixNounoursTab);

if (choixNounoursTab != null) {
    
    //* calcul de la quantité totale
    let quantiteTotale = 0;
    for (let i = 0; i < choixNounoursTab.length; i++) {
        quantiteTotale += parseInt(choixNounoursTab[i][1]);
    }
    console.log(quantiteTotale);
    
    //* BOOTSTRAP_BADGE : On remet le badge sur le panier
    let badge = document.querySelector('.badge');
    if (quantiteTotale == 0) {
        badge.innerHTML = ``;
    } else {
        badge.innerHTML = `${quantiteTotale}`;
    }

}

