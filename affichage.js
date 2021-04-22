// localStorage.clear();

let imgs = document.querySelectorAll('img');

async function afficheNounours() {
    //* On attend le retour de fetch
    await GetNounours();

    //* On remplit avec les img renvoyées par l'API
    console.log(data[0].imageUrl);
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].src = data[i].imageUrl
    }
}
afficheNounours();

//// Si l'utilisateur a déjà une commande en cours

let choixNounoursTab = JSON.parse(localStorage.getItem("choixNounoursTab"));
console.log(choixNounoursTab);

if (choixNounoursTab != null) {
    
    //* calcul de la quantité totale pour page de confirmation
    let quantiteTotale = 0;
    for (let i = 0; i < choixNounoursTab.length; i++) {
        quantiteTotale += parseInt(choixNounoursTab[i][1]);
        console.log(quantiteTotale);
    }
    
    //* On remet le badge sur le panier
    let badge = document.querySelector('.badge');
    if (quantiteTotale == 0) {
        badge.innerHTML = ``;
    } else {
        badge.innerHTML = `${quantiteTotale}`;
    }

}

