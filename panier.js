//? Comment faire + DRY ?
//! revoir capture des éléments DOM pour que ça soit généralisable à tous les nounours
//* NAVIGUER DANS LA CARTE

let cardPerso = document.getElementById('cardPerso');
let cardBio = document.getElementById('cardBio');
let cardDetail = document.getElementById('cardDetail');

let contenuCard = document.querySelectorAll(".card-body > div");
let personnaliser = contenuCard[0];
let bio = contenuCard[1];
let detail = contenuCard[2];

// personnaliser.style.border = "1px solid green";
// bio.style.border = "1px solid blue";
// detail.style.border = "1px solid red";

//* quand on clique sur les onglets, afficher contenu onglet et masquer les autres
//* + passer onglet en active
cardPerso.addEventListener('click', function() {
    // personnaliser.style.opacity = "1";
    // bio.style.opacity = "0";
    // detail.style.opacity = "0";
    personnaliser.style.display = "block";
    bio.style.display = "none";
    detail.style.display = "none";
    cardPerso.setAttribute('class', 'nav-link active');
    cardBio.setAttribute('class', 'nav-link');
    cardDetail.setAttribute('class', 'nav-link');
});
cardBio.addEventListener('click', function() {
    // personnaliser.style.opacity = "0";
    // bio.style.opacity = "1";
    // detail.style.opacity = "0";
    personnaliser.style.display = "none";
    bio.style.display = "block";
    detail.style.display = "none";
    cardBio.setAttribute('class', 'nav-link active');
    cardPerso.setAttribute('class', 'nav-link');
    cardDetail.setAttribute('class', 'nav-link');
});
cardDetail.addEventListener('click', function() {
    // personnaliser.style.opacity = "0";
    // bio.style.opacity = "0";
    // detail.style.opacity = "1";
    personnaliser.style.display = "none";
    bio.style.display = "none";
    detail.style.display = "block";
    cardDetail.setAttribute('class', 'nav-link active');
    cardPerso.setAttribute('class', 'nav-link');
    cardBio.setAttribute('class', 'nav-link');
});

//* AJOUTER AU PANIER

//* choix de couleur
let iconesCouleur = document.querySelectorAll("#cardText > svg");

let noir = iconesCouleur[0];
let brun = iconesCouleur[1];
let dore = iconesCouleur[2];
let beige = iconesCouleur[3];

let choixCouleur = 0;

noir.addEventListener('click', function() {
    //* sélectionner couleur
    noir.style.outline = "1px solid black";
    noir.style.outlineOffset = "2px";
    //* annuler selection des autres couleurs
    brun.style.outline = "0";
    dore.style.outline = "0";
    beige.style.outline = "0";
    choixCouleur = 1;
});
brun.addEventListener('click', function() {
    brun.style.outline = "1px solid black";
    brun.style.outlineOffset = "2px";
    noir.style.outline = "0";
    dore.style.outline = "0";
    beige.style.outline = "0";
    choixCouleur = 2;
});
dore.addEventListener('click', function() {
    dore.style.outline = "1px solid black";
    dore.style.outlineOffset = "2px";
    brun.style.outline = "0";
    noir.style.outline = "0";
    beige.style.outline = "0";
    choixCouleur = 3;
});
beige.addEventListener('click', function() {
    beige.style.outline = "1px solid black";
    beige.style.outlineOffset = "2px";
    brun.style.outline = "0";
    dore.style.outline = "0";
    noir.style.outline = "0";
    choixCouleur = 4;
});

//* choix de quantité
let quantiteSelect = document.getElementById('quantiteSelect');
let quantite = 0;

quantiteSelect.addEventListener('change', function() {
    quantite = quantiteSelect.selectedIndex + 1; //* pour que index = quantite
    console.log(quantite);
    if (quantite == 4) {
        alert("Vous allez acheter 10 nounours : 9 + 1 gratuit !");
    }
});

//* Récupérer autres infos dans la card
let nom = document.querySelector('h3').textContent;
// console.log(nom);
let details = document.querySelectorAll('.detail > p');
let codeProduitTag = details[1];
let prixTag = details[2];
let descriptionTag = details[3];

//* selectionner que la partie importante 
let codeProduitReduit = codeProduitTag.textContent.split(': ');
let prixReduit = prixTag.textContent.split(': ');
let descriptionReduit = descriptionTag.textContent.split(': ');

//* renommer var pour lisibilité
let codeProduit = codeProduitReduit[1];
let prix = prixReduit[1];
let description = descriptionReduit[1];
// console.log(codeProduit);
// console.log(prix);
// console.log(description);

//* récupérer image
// thanks stackOverflow, I have no fucking idea what all that is but it works
//*fonction qui transforme l'img en data, apparemment
function getBase64Image(img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    let dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

let img = document.querySelector('.card > img');
let imgData = getBase64Image(img);

//*TEST A CONSERVER
// // on envoie l'img faire un petit tour dans local storage
// localStorage.setItem("imgData", imgData);
// let retrivedImg = localStorage.getItem("imgData");
// console.log(retrivedImg);

// // tester qu'on a bien l'image en l'intégrant à la page
// //!(mettre test en display block dans html)
// let testImg = document.getElementById('test');
// testImg.src = "data:image/png;base64," + retrivedImg;
//*JUSQUE ICI

let iconesPanier = document.querySelectorAll("#footerPeluche > svg");
let iconeLight = iconesPanier[0];
let iconeDark = iconesPanier[1]

let footerPeluche = document.getElementById('footerPeluche');
// footerPeluche.style.border = '1px solid green';

// Quand on clique sur footer
//? iconeLight.addEventListener('click', function() { //? pourquoi fonctionne pas ici ? //on s'en fout, ça fonctionne globalement
footerPeluche.addEventListener('click', function() {
    // on passe de icone light à icone dark
    iconeDark.style.opacity = '1';
    // on ajoute le choix de l'utilisateur au panier :
    // couleur
    let choixNounours = [];
    switch (choixCouleur) {
        case 0:
            choixNounours.push('couleur par défaut : en fonction de stock');
            break;
        case 1:
            choixNounours.push('noir');
            break;
        case 2:
            choixNounours.push('brun');
            break;
        case 3:
            choixNounours.push('dore');
            break;
        case 4:
            choixNounours.push('beige');
            break;
        default:
            console.log('error couleur')
            break;
        }
    console.log('couleur :' + choixNounours);
    
    switch (quantite) { //*quantite = index du select + 1
        case 0:
            choixNounours.push('1'); //* quantité par défaut
            quantite = 1;
            break;
        case 1:
            choixNounours.push('1');
            break;
        case 2:
            choixNounours.push('2');
            break;
        case 3:
            choixNounours.push('3');
            break;
        case 4:
            choixNounours.push('10'); 
            quantite = 9; //*car 1 gratuit
            break;
        default:
            console.log('error quantite')
            break;
    }

    console.log('couleur + quantite :' + choixNounours);

    //* on convertit quantité en number pour faire des calculs et on calcul prix
    quantite = parseInt(quantite);
    prix = parseInt(prix);
    console.log(quantite);
    console.log(prix);
    total = prix * quantite + "€";

    //* on ajoute les autres infos
    choixNounours.push(codeProduit, nom, total, description, imgData);
    console.log(choixNounours);

    //* On envoie/récupère les infos nounours sur local storage
    localStorage.setItem("choixNounours", JSON.stringify(choixNounours));
    let retrievedChoixNounours= JSON.parse(localStorage.getItem("choixNounours"));
    console.log(retrievedChoixNounours); // tes variables sont un peu longues, Alice // Au moins c'est parlant quoi
});

