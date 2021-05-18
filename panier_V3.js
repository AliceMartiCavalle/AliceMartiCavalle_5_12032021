// localStorage.clear();

//* BOOTSTRAP DECO

//* BOOTSTRAP_TOAST : initialisation & récupérer emplacement html
$(document).ready(function(){
    $('.toast').toast('show');
});
let toasts = document.getElementsByClassName('toast');
let toast = toasts[0];

//* BOOTSTRAP_PILL : on récupère l'emplacement html
let badge = document.querySelector('.badge');

//* BOOTSTRAP_POPOVER : (utilisé aussi quand on clique sur l'icone cart)
let popover = document.querySelector('#popover');



//* NAVIGUER D'UNE PELUCHE A L'AUTRE

let DivImgNavPeluche = document.querySelector('#imgNavPeluche > div');

//* Crée une nav sous le bouton voir une autre peluche
async function NavImg() {
    console.log('%c NAV IMG ', fct);

    //* On attend d'avoir les infos nounours
    let mesNours = await GetNounours();

    //* Pour chaque peluche, on crée une img dans la nav
    for (let x = 0; x < mesNours.length; x++) {

        let newImg = document.createElement('img');
        newImg.setAttribute('src', `${mesNours[x].imageUrl}`);
        newImg.setAttribute('alt', `${mesNours[x].name}`);
        newImg.setAttribute('class', `list-group-item`);

        DivImgNavPeluche.appendChild(newImg);

    }
    // console.log(DivImgNavPeluche);

    let imgNavPeluche = DivImgNavPeluche.querySelectorAll('img');
    // console.log(imgNavPeluche);
    // console.log(imgNavPeluche[0]);

    //* on crée un add event listener sur chaque img de peluche
    for (y = 0; y <= mesNours.length; y++) {
        // console.log(i);
        (function(arg) {
            //* Si l'utilisateur clique sur une autre peluche, on l'affiche
            imgNavPeluche[y].addEventListener('click', function() {
                console.log('%c btn img nav peluche', btn);
                // console.log(arg);

                Remplissage(mesNours[arg]);
            }, false);
            console.log(arg); // s'incrémente
        })(y);
    }

}
NavImg();



//* NAVIGUER DANS LA CARTE

let cardPerso = document.getElementById('cardPerso');
let cardBio = document.getElementById('cardBio');
let cardDetail = document.getElementById('cardDetail');

let contenuCard = document.querySelectorAll(".card-body > div");
let personnaliser = contenuCard[0];
let bio = contenuCard[1];
let detail = contenuCard[2];

//* quand on clique sur les onglets, afficher contenu onglet et masquer les autres
//* + passer onglet en active
//! Je fais pas de boucle parce que fuck it, ya que 3 onglets
cardPerso.addEventListener('click', function() {
    personnaliser.style.display = "block";
    bio.style.display = "none";
    detail.style.display = "none";
    cardPerso.setAttribute('class', 'nav-link active');
    cardBio.setAttribute('class', 'nav-link');
    cardDetail.setAttribute('class', 'nav-link');
});
cardBio.addEventListener('click', function() {
    personnaliser.style.display = "none";
    bio.style.display = "block";
    detail.style.display = "none";
    cardBio.setAttribute('class', 'nav-link active');
    cardPerso.setAttribute('class', 'nav-link');
    cardDetail.setAttribute('class', 'nav-link');
});
cardDetail.addEventListener('click', function() {
    personnaliser.style.display = "none";
    bio.style.display = "none";
    detail.style.display = "block";
    cardDetail.setAttribute('class', 'nav-link active');
    cardPerso.setAttribute('class', 'nav-link');
    cardBio.setAttribute('class', 'nav-link');
});



//* AFFICHER LES INFOS DANS LA CARTE

//* Récupérer emplacement html des infos dans la card
let nom = document.querySelector('h3');
let details = document.querySelectorAll('.detail > p');
let codeProduitTag = details[1];
let prixTag = details[2];
let descriptionTag = details[3];
let circle = document.querySelector('.personnaliser > div > svg > circle');
let small = document.querySelector('.personnaliser > div > small');
//* Par défaut on laisse le cercle de couleur caché
circle.style.opacity = "0";
small.style.opacity = "0";

//* récupérer emplacement image
let imgPeluche = document.getElementById('imgPeluche');
//* récupérer contenu des options
// let couleurSelect = document.querySelectorAll('#couleurSelect');
let options = document.querySelectorAll('#couleurSelect > option');

//* On remplit les emplacements
function Remplissage(data) {
    console.log('%c REMPLISSAGE ', fct);

    console.log(data);

    nom.textContent = data.name;
    imgPeluche.src = data.imageUrl
    codeProduitTag.innerHTML = `<p><em>Code produit : </em>${data._id}</p>`;
    descriptionTag.innerHTML = `<p><em>Description : </em>${data.description}</p>`;

    //* On affiche le prix sans les 00 et avec €
    prixTag.innerHTML = `<p><em>Prix : </em>${data.price / 100}€</p>`;    
    
    //* On parcourt les couleurs, pour chaque couleur on remplit une option du select
    // console.log(data.colors.length);
    let couleurSelect = document.querySelector('#couleurSelect');
    couleurSelect.innerHTML = '';
    // console.log(couleurSelect);
    for (let y = 0; y < data.colors.length; y++) { 
        let newOption = document.createElement("option");
        // <option value="1" selected>c1</option>
        newOption.innerHTML = data.colors[y];
        newOption.setAttribute("value", `${(y+1)}`)
        couleurSelect.appendChild(newOption);
    }
    
    //* Par défaut on met le select sur la 1ère option
    couleurSelect.selectedIndex = 0;
    quantiteSelect.selectedIndex = 0;

    fillCircle();        
}

function fillCircle(x) {
    console.log('%c FILL CIRCLE ', fct);

    //* Par défaut on cache le cercle svg et on affiche le message small
    circle.style.opacity = '1';
    small.style.opacity = '0';

    let colorsOptions = document.querySelectorAll('#couleurSelect > option');

    let circleColor = colorsOptions[couleurSelect.selectedIndex].textContent;
    //* Si la couleur n'existe pas (cf colors.js)
    if (colourNameToHex(circleColor.toLowerCase().replace(' ', '')) == false) {
        
        //* Si la couleur dans la base de donnée commence par Pale ou Dark
        if (circleColor.startsWith('Pale')) {
            //* On convertit le nom en code couleur (cf colors.js)
            circleColor = colourNameToHex(circleColor.replace('Pale ', '').toLowerCase());
            //* On lighten/darken la couleur (cf colors.js)
            circleColor = LightenDarkenColor(circleColor.replace('#', ''), 30);
            circleColor = `#${circleColor}`;
            circle.style.fill = circleColor;
            // circle.style.fill = `#${circleColor}`; //? non : la couleur doit être utilisable directement dans page form
            
        } else if (circleColor.startsWith('Dark')) {
            circleColor = colourNameToHex(circleColor.replace('Dark ', '').toLowerCase());
            circleColor = LightenDarkenColor(circleColor.replace('#', ''), -20);
            circleColor = `#${circleColor}`;
            circle.style.fill = circleColor;
        }
    } else if (circleColor == undefined) { //? utile ?
        circle.style.opacity = '0';
        small.style.opacity = '1';
    } else {
        circle.style.fill = circleColor.replace(' ', '').toLowerCase();
    }
    console.log(circleColor);
    return circleColor.replace(' ', '').toLowerCase();
}

//* On remplit la page avec les infos des nounours
async function Affichage() {
    console.log('%c AFFICHAGE ', fct)
    console.log(location.search.replace('?id=', ''));

    //* Si l'utilisateur a cliqué sur peluches dans nav
    if (location.search == '') {
        //* On affiche norbert par défaut
        Remplissage(await GetOneNounours('5be9c8541c9d440000665243'))
    } else {
        //* On affiche la peluche en fonction de l'id
        Remplissage(await GetOneNounours(location.search.replace('?id=', '')))
    } 

}
Affichage();



//* AJOUTER AU PANIER

//* choix de quantité
let quantiteSelect = document.getElementById('quantiteSelect');
let quantite = 0;

//* Quand l'utilisateur choisi une quantité dans le select
quantiteSelect.addEventListener('change', function() {
    quantite = quantiteSelect.selectedIndex + 1; //* pour que index = quantite
    console.log('%cquantité', vrb, quantite);
    //* S'il choisit l'option 4, on affiche le toast
    if (quantite == 4) {
        // toast.setAttribute('data-autohide', 'false'); //? why
        toast.setAttribute('class', 'toast show');
        toast.dataset.autohide = 'false';
    }
});

//* récupérer emplacement couleurs
let couleurSelect = document.getElementById('couleurSelect');
let couleur = 0; //* pour choix par défaut dans le select

//* Quand l'utilisateur choisit une couleur dans le select
couleurSelect.addEventListener('change', function(e) {

    console.log('%ce.target.value', vrb, e.target.value); // +1 car dans html va de 1 à 4 // why ? I fucking forgot, just leave it
    let colorsOptions = document.querySelectorAll('#couleurSelect > option');

    // console.log(colorsOptions[e.target.value -1].textContent);

    //* On remplit le cercle svg en fonction de la couleur
    fillCircle(colorsOptions[e.target.value -1].textContent);
    
});


//* footer carte et icones du footer carte pour interaction utilisateur (eventListener)
let iconesPanier = document.querySelectorAll("#footerPeluche > svg");
let iconeLight = iconesPanier[0];
let iconeDark = iconesPanier[1]


//* On vérifie si l'utilisateur a déjà des nounours dans local storage,
//* Si non on initialise choixNounoursTab avec un tableau vide
let choixNounoursTab = JSON.parse(localStorage.getItem("choixNounoursTab")) || [];
console.log(choixNounoursTab)
localStorage.setItem("choixNounoursTab", JSON.stringify(choixNounoursTab));

//// Si l'utilisateur a déjà une commande en cours
let quantitePanier = 0;
//* On calcule le nombre de nounours actuellement dans le panier
for (let i = 0; i < choixNounoursTab.length; i++) {
    quantitePanier += parseInt(choixNounoursTab[i][1]);
    console.log(quantitePanier);
}
//* On indique cette info dans le popover et le badge
if (quantitePanier > 0) {
    badge.innerHTML = `${quantitePanier}`;
}
popover.dataset.content = quantitePanier;


//* Par défaut on cache le lien d'accès au panier
let lienPanier = document.querySelector('#footerPeluche > .card-link');
lienPanier.style.opacity = '0';

//* Met le badge à jour dans la nav
function UpdateBadge(quantite) {
    console.log('%c UPDATE BADGE', fct)
    let contentBadge = parseInt(badge.textContent);

    // console.log(quantite);
    if (quantite == 9) {
        quantite += 1;
        // console.log(quantite);
    }

    if (isNaN(contentBadge)) {
        badge.innerHTML = `${quantite}`;
    } else {
        badge.innerHTML = `${(quantite + contentBadge)}`;
    }
}

//* Met à jour le popover au-dessus de l'icône cart dans le footer de la card
function UpdatePopover(quantite) {
    console.log('%c UPDATE POPOVER ', fct);

    //* permet d'initialiser le popover
    $('[data-toggle="popover"]').popover(); //* ici pour pas avoir inutilement un popover vide
    let contentPopover = parseInt(popover.dataset.content);
    console.log(contentPopover);

    //* Si le popover est vide parce que c'est la première peluche
    if (isNaN(contentPopover)) {
        popover.setAttribute('data-content', `${quantite}`);
        console.log(quantite);
    //* Si l'utilisateur a déjà ajouté des peluches au panier
    } else if (quantite == 9) {
        
        popover.dataset.content = (quantite + 1) + contentPopover;
        console.log(quantite);
    } else {
        popover.dataset.content = quantite + contentPopover;
        console.log(quantite);
    }
    //* On montre le popover que 1 seconde, sinon le contenu s'actualise pas
    $("[data-toggle='popover']").popover('show');
    setTimeout(function() {
        $("[data-toggle='popover']").popover('hide');
    }, 1000)
}

let numLigneCommande = JSON.parse(localStorage.getItem("numLigneCommande")) || 0;
console.log(numLigneCommande);
//* Récupère les choix de l'utilisateur et les stock dans local storage
async function Panier() {
    console.log('%c PANIER ', fct)
    //* on ajoute le choix de l'utilisateur au panier :

    let choixNounours = [];

    //* couleur
    console.log(couleur);
    let options = document.querySelectorAll('#couleurSelect > option');
    console.log(options[couleurSelect.selectedIndex].textContent);

    choixNounours.push(options[couleurSelect.selectedIndex].textContent)

    console.log('couleur : ' + choixNounours);
    
    //* quantite
    console.log(quantite)
    console.log(quantiteSelect);
    console.log(quantiteSelect.selectedIndex);
    if (quantiteSelect.selectedIndex == 3) {
        choixNounours.push(parseInt('10')); 
        quantite = 9; //*car 1 gratuit
    } else {
        choixNounours.push(quantiteSelect.selectedIndex + 1);
        quantite = quantiteSelect.selectedIndex + 1;
        console.log(quantite)
    }
    console.log(quantite)

    console.log('couleur + quantite :' + choixNounours);

    //* On indique au niveau de la nav qu'un truc a été ajouté au panier
    //! penser à vider le badge après la confirmation de commande
    UpdateBadge(quantite);

    UpdatePopover(quantite);
    
    //* On rentabilise fetch en cherchant le nours par son nom
    console.log(nom);
    let data = await GetNounours();
    console.log(data);
    
    let prix;
    let codeProduit;
    let description;
    for (let i = 0; i < data.length; i++) {
        if (nom.textContent == data[i].name) {
            prix = data[i].price / 100;
            codeProduit = data[i]._id;
            description = data[i].description;
        }
    }
    console.log(prix, codeProduit, description);
    
    if (quantite == 9) {
        total = prix * (parseInt(quantite) + 1) + "€";
    } else {
        total = prix * parseInt(quantite) + "€";
    }
    console.log(total);

    //* On garde que la partie id
    // let codeProduit = codeProduitTag.textContent;
    // codeProduit = codeProduit.split(' : ');
    // codeProduit = codeProduit[1];
    // console.log(codeProduit);
    
    //* on ajoute les autres infos au tableau
    let circleColor = fillCircle();
    console.log(circleColor);

    numLigneCommande += 1
    localStorage.setItem("numLigneCommande", JSON.stringify(numLigneCommande));
    choixNounours.push(codeProduit, nom.textContent, total, description, imgPeluche.src, circleColor, numLigneCommande);
    
    console.log(choixNounours);

    //* Si l'utilisateur achète plusieurs nounours d'un coup
    console.log(JSON.parse(localStorage.getItem("choixNounoursTab")));

    //* on récupère tableau vide de commande
    choixNounoursTab = JSON.parse(localStorage.getItem("choixNounoursTab"));
    console.log(choixNounoursTab);

    //* on ajoute choixNounours
    choixNounoursTab.unshift(choixNounours);
    console.log(choixNounoursTab);

    //* On envoie le tableau de commande sur local storage qui contient un nouveau nounours
    //* A chaque tour, on ajoute un nounours
    localStorage.setItem("choixNounoursTab", JSON.stringify(choixNounoursTab));

    // On vérifie que ça fonctionne //? utile
    choixNounoursTab = JSON.parse(localStorage.getItem("choixNounoursTab"));
    console.log(choixNounoursTab);
}

async function AddToPanier() {    
    console.log('%c ADD TO PANIER ', fct);

    await Affichage();

    //* Quand on clique sur l'icone panier de la card
    popover.addEventListener('click', function() { //popover, c'est le <a></a> autour des icones
        
        //* On affiche un lien vers le panier dans le footer de la card
        lienPanier.style.opacity = '1';

        Panier();
        
    }); 

    let buttonToast = document.querySelector('.buttonToast')

    //* Si l'utilisateur clique ok sur toast, on ajoute direct au panier
    buttonToast.addEventListener('click', function() {
        
        //* On affiche un lien vers le panier dans le footer de la card
        lienPanier.style.opacity = '1';

        Panier();
        
    }); 
}
AddToPanier();

