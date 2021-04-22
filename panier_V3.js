// localStorage.clear();

//* ALERT BOOTSTRAP
$(document).ready(function(){
    $('.toast').toast('show');
});
let toasts = document.getElementsByClassName('toast');
let toast = toasts[0];
// toast.setAttribute('data-autohide', 'false');

//* round pill bootstrap (à ranger dans la page ensuite)
let badge = document.querySelector('.badge');

//* Utilisé aussi quand on clique sur l'icone cart
let popover = document.querySelector('#popover');
// popover.setAttribute('data-content', `0`);

let lienPanier = document.querySelector('#footerPeluche > .card-link');
lienPanier.style.opacity = '0';

//* NAVIGUER D'UNE PELUCHE A L'AUTRE
let DivImgNavPeluche = document.getElementById('imgNavPeluche');

//* On capture emplacements des img de peluche sous le bouton "voir une autre peluche"
//* et on remplit avec les images des peluches
let imgNavPeluche = document.querySelectorAll('#imgNavPeluche > div > img');
async function NavImg() {
    //* On attend d'avoir les infos nounours
    await GetNounours();
    for (let x = 0; x < data.length; x++) {
        imgNavPeluche[x].src = data[x].imageUrl;
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



//* AFFICHER LES INFOS DANS LA CARTE

//* Récupérer emplacement infos détails dans la card
let nom = document.querySelector('h3');
let details = document.querySelectorAll('.detail > p');
let codeProduitTag = details[1];
let prixTag = details[2];
let descriptionTag = details[3];
let circle = document.querySelector('.personnaliser > div > svg > circle');
let small = document.querySelector('.personnaliser > div > small');
// circle.style.fill = "#C3C3C3";
//* Par défaut on laisse le cercle de couleur caché
circle.style.opacity = "0";
small.style.opacity = "0";

//* récupérer emplacement image
let imgPeluche = document.getElementById('imgPeluche');
//* récupérer contenu des options
let options = document.querySelectorAll('#couleurSelect > option');

//* On remplit la page avec les infos des nounours
async function Affichage() {
    //* on attend d'avoir récupéré les infos nounours
    await GetNounours();

    //* On remplit les emplacements
    function Remplissage() {
        console.log(' On rentre dans Remplissage()');
        console.log(i);

        nom.textContent = data[i].name;
        imgPeluche.src = data[i].imageUrl
        codeProduitTag.innerHTML = `<p><em>Code produit : </em>${data[i]._id}</p>`;
        descriptionTag.innerHTML = `<p><em>Description : </em>${data[i].description}</p>`;

        //* On affiche le prix sans les 00 et avec €
        prixTag.innerHTML = `<p><em>Prix : </em>${data[i].price / 100}€</p>`;    
        
        //* On parcourt les couleurs, pour chaque couleur on remplit une option du select
        //! il y a max 4 couleurs différentes, on ne peut pas faire tab.length car certains tableaux + courts
        for (let y = 0; y < 4; y++) { 
            //* S'il y a moins de 4 couleurs, on met "A venir" et on désactive le choix dans le select
            if (data[i].colors[y] == null) {
                console.log('case vide');
                options[y].textContent = "A venir";
                options[y].setAttribute('disabled', 'disabled');
                //* Sinon on remplit par la couleur
            } else {
                options[y].textContent = data[i].colors[y];
                options[y].removeAttribute('disabled');
            }
        }  
        //* Par défaut on met le select sur la 1ère option
        options[0].setAttribute('selected', 'selected');
        console.log(options[0]);
        fillCircle('default');        
    }

    let i = 0;

    //* On parcourt les infos renvoyées par fetch
    for (let z = 0; z < data.length; z++) {
        //* On affiche les peluches en fonction du location hash
        //* Si location.hash = id de la peluche
        if (location.hash === `#${data[z]._id}`) {
            i = z;
            Remplissage();
        //* Si utilisateur a cliqué peluche dans nav, on affiche Norbert par défaut
        } else if (location.hash === '' || location.hash === '#popover') { //* si on actualise la page
            i = 0;
            Remplissage();
        } else {
            console.log('error hash');
        }
    }

    //* Si l'utilisateur clique sur une autre peluche, on l'affiche
    //? What the fuck is happening here 
    for (y = 0; y <= data.length; y++) {
        console.log(i);
        (function(arg) {
            imgNavPeluche[i].addEventListener('click', function() {
                console.log(arg);
                i = arg - 1;
                Remplissage();
                console.log(i);
            }, false);
            console.log(arg); // s'incrémente
            i = arg;
        })(y);
    }
}
Affichage();



//* AJOUTER AU PANIER

//* choix de quantité
let quantiteSelect = document.getElementById('quantiteSelect');
let quantite = 0;

quantiteSelect.addEventListener('change', function() {
    quantite = quantiteSelect.selectedIndex + 1; //* pour que index = quantite
    console.log(quantite);
    if (quantite == 4) {
        // alert("Vous allez acheter 10 nounours : 9 + 1 gratuit !");
        // toast.setAttribute('data-autohide', 'false'); //? why
        toast.setAttribute('class', 'toast show');
        toast.dataset.autohide = 'false';
        // console.log(toast);
    }
});

//* récupérer emplacement couleurs
let couleurSelect = document.getElementById('couleurSelect');
let couleur = 0; //* pour choix par défaut dans le select
let colorsOptions = document.querySelectorAll('#couleurSelect > option');
console.log(colorsOptions[couleur].textContent);


couleurSelect.addEventListener('change', function() {
    couleur = couleurSelect.selectedIndex;
    console.log(couleur);
    console.log(colorsOptions[couleur].textContent);

    fillCircle(colorsOptions[couleur].textContent);
    
});

// async function fillCircleDefault() {
//     await GetNounours();
//     circle.style.opacity = '0';
//     small.style.opacity = '1';
//     fillCircle();
// }
// fillCircleDefault();

function fillCircle(x) {
    console.log('FILL_CIRCLE');

    console.log(x);
    //* par défaut on affiche la 1ère couleur du sélect
    //* ça évite que l'utilisateur tombe sur l'option "à venir" du select et le small d'erreur "visualisation bientôt dispo"
    if (x == 'default') { 
        couleur = 0;
    }

    //* Par défaut on cache le cercle svg et on affiche le message small
    circle.style.opacity = '1';
    small.style.opacity = '0';

    console.log(colorsOptions[couleur].textContent);

    let circleColor = colorsOptions[couleur].textContent;
    console.log(circleColor.toLowerCase().replace(' ', ''));
    //* Si la couleur n'existe pas (cf colors.js)
    if (colourNameToHex(circleColor.toLowerCase().replace(' ', '')) == false) {
        
        //* Si la couleur dans la base de donnée commence par Pale ou Dark
        if (circleColor.startsWith('Pale')) {
            console.log(circleColor);
            //* On convertit le nom en code couleur (cf colors.js)
            circleColor = colourNameToHex(circleColor.replace('Pale ', '').toLowerCase());
            console.log(circleColor);
            //* On lighten/darken la couleur (cf colors.js)
            circleColor = LightenDarkenColor(circleColor.replace('#', ''), 30);
            console.log(circleColor);
            circleColor = `#${circleColor}`;
            circle.style.fill = circleColor;
            // circle.style.fill = `#${circleColor}`; //* non : la couleur doit être utilisable directement dans page form
            console.log(circle);
            
        } else if (circleColor.startsWith('Dark')) {
            console.log(circleColor);
            circleColor = colourNameToHex(circleColor.replace('Dark ', '').toLowerCase());
            console.log(circleColor);
            circleColor = LightenDarkenColor(circleColor.replace('#', ''), -20);
            console.log(circleColor);
            circleColor = `#${circleColor}`;
            circle.style.fill = circleColor;
            console.log(circle);
        }
    } else if (circleColor == undefined) { //? utile ?
        circle.style.opacity = '0';
        small.style.opacity = '1';
    } else {
        console.log(circleColor);
        circle.style.fill = circleColor.replace(' ', '').toLowerCase();
        console.log(circle);
    }
    console.log(circleColor);
    return circleColor.replace(' ', '').toLowerCase();
}

//* footer carte et icones du footer carte pour interaction utilisateur (eventListener)
let iconesPanier = document.querySelectorAll("#footerPeluche > svg");
let iconeLight = iconesPanier[0];
let iconeDark = iconesPanier[1]

// let footerPeluche = document.getElementById('footerPeluche');

//* On vérifie si l'utilisateur a déjà des nounours dans local storage,
//* Si non on initialise choixNounoursTab avec un tableau vide
let choixNounoursTab = JSON.parse(localStorage.getItem("choixNounoursTab")) || [];
console.log(choixNounoursTab)
// let choixNounoursTab = [];
localStorage.setItem("choixNounoursTab", JSON.stringify(choixNounoursTab));
// console.log(JSON.parse(localStorage.getItem("choixNounoursTab")));

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





function panier() {     

    //* Quand on clique sur l'icone panier de la card
    //? iconeLight.addEventListener('click', function() { //? pourquoi fonctionne pas ici ? //on s'en fout, ça fonctionne globalement
    popover.addEventListener('click', function() {
        //* on passe de icone light à icone dark
        //! finalement en css, supprimer tout le code lié

        //* On affiche un lien vers le panier dans le footer de la card
        lienPanier.style.opacity = '1';

        //* on ajoute le choix de l'utilisateur au panier :
        //* couleur
        let choixNounours = [];
        console.log(couleur);
        console.log(options);
        switch (couleur) {
            case 0:
                choixNounours.push(`${options[0].textContent}`); //choix par défaut
                break;
            case 1:
                choixNounours.push(`${options[1].textContent}`);
                break;
            case 2:
                choixNounours.push(`${options[2].textContent}`);
                break;
            case 3:
                choixNounours.push(`${options[3].textContent}`);
                break;
            default:
                console.log('error couleur')
                break;
            }
        console.log('couleur : ' + choixNounours);
        
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

        //* On indique au niveau de la nav qu'un truc a été ajouté au panier
        //! penser à vider le badge après la confirmation de commande
        let contentBadge = parseInt(badge.textContent);
        // console.log(contentBadge);
        console.log(quantite);
        if (quantite == 9) {
            quantite += 1;
            console.log(quantite);
        }

        if (isNaN(contentBadge)) {
            badge.innerHTML = `${quantite}`;
        } else {
            badge.innerHTML = `${(quantite + contentBadge)}`;
        }

        //* permet d'initialiser le popover
        $('[data-toggle="popover"]').popover(); // ici pour pas avoir inutilement un popover vide
        let contentPopover = parseInt(popover.dataset.content);
        console.log(contentPopover);
        // console.log(contentPopover);
        if (isNaN(contentPopover)) {
            popover.setAttribute('data-content', `${quantite}`);
            // popover.dataset.content = quantite;
            console.log(quantite);
        } else {
            // popover.setAttribute('data-content', `${(quantite + contentPopover)}`);
            popover.dataset.content = quantite + contentPopover;
            console.log(quantite);
        }
        $("[data-toggle='popover']").popover('show');
        setTimeout(function() {
            $("[data-toggle='popover']").popover('hide');
        }, 1000)
        
        //* on convertit quantité en number pour faire des calculs et on calcul prix
        quantite = parseInt(quantite);
        console.log(quantite);

        //* trouver une solution moins barbare
        console.log(prixTag.innerHTML);
        let prix = JSON.stringify(prixTag.innerHTML);
        prix = prix.replace(/<\/?[^>]+(>|$)/g, "");
        prix = prix.split(': ');
        prix = prix[1][0] + prix[1][1];
        prix = parseInt(prix);
        console.log(prix);
        
        total = prix * quantite + "€";
        console.log(total);

        //* On garde que la partie id
        let codeProduit = codeProduitTag.textContent;
        codeProduit = codeProduit.split(' : ');
        codeProduit = codeProduit[1];
        console.log(codeProduit);
        
        //* Idem pour la description
        let description = descriptionTag.textContent;
        description = description.split(' : ');
        description = description[1];
        console.log(description);
        
        //* on ajoute les autres infos au tableau
        let circleColor = fillCircle();
        console.log(circleColor);
        choixNounours.push(codeProduit, nom.textContent, total, description, imgPeluche.src, circleColor);
        console.log(choixNounours);

        // //* On envoie/récupère les infos nounours sur local storage
        // localStorage.setItem("choixNounours", JSON.stringify(choixNounours));
        // let retrievedChoixNounours= JSON.parse(localStorage.getItem("choixNounours"));
        // console.log(retrievedChoixNounours); // tes variables sont un peu longues, Alice // Au moins c'est parlant quoi

        //* Si l'utilisateur achète plusieurs nounours d'un coup
        console.log(JSON.parse(localStorage.getItem("choixNounoursTab")));
        //* on récupère tableau vide de commande
        choixNounoursTab = JSON.parse(localStorage.getItem("choixNounoursTab"));
        console.log(choixNounoursTab);
        // retrievedChoixNounoursTab.unshift('un nounours test');
        // console.log(retrievedChoixNounoursTab);
        //* on ajoute choixNounours
        choixNounoursTab.unshift(choixNounours);
        console.log(choixNounoursTab);
        // retrievedChoixNounoursTab.unshift('un 2e nounours test');
        //* On envoie le tableau de commande sur local storage qui contient un nouveau nounours
        //* A chaque tour, on ajoute un nounours
        localStorage.setItem("choixNounoursTab", JSON.stringify(choixNounoursTab));
        choixNounoursTab = JSON.parse(localStorage.getItem("choixNounoursTab"));
        console.log(choixNounoursTab);
    }); 

    //! truc à supprimer quand j'aurai une meilleure solution
    let buttonToast = document.querySelector('.buttonToast')
    buttonToast.addEventListener("click", function () {
        let choixNounours = [];
        console.log(couleur);
        console.log(options);
        switch (couleur) {
            case 0:
                choixNounours.push(`${options[0].textContent}`); //choix par défaut
                break;
            case 1:
                choixNounours.push(`${options[1].textContent}`);
                break;
            case 2:
                choixNounours.push(`${options[2].textContent}`);
                break;
            case 3:
                choixNounours.push(`${options[3].textContent}`);
                break;
            default:
                console.log("error couleur");
                break;
        }
        console.log("couleur : " + choixNounours);

        switch (
            quantite //*quantite = index du select + 1
        ) {
            case 0:
                choixNounours.push("1"); //* quantité par défaut
                quantite = 1;
                break;
            case 1:
                choixNounours.push("1");
                break;
            case 2:
                choixNounours.push("2");
                break;
            case 3:
                choixNounours.push("3");
                break;
            case 4:
                choixNounours.push("10");
                quantite = 9; //*car 1 gratuit
                break;
            default:
                console.log("error quantite");
                break;
        }

        console.log("couleur + quantite :" + choixNounours);

        //* On indique au niveau de la nav qu'un truc a été ajouté au panier
        //! penser à vider le badge après la confirmation de commande
        let contentBadge = parseInt(badge.textContent);
        // console.log(contentBadge);
        console.log(quantite);
        if (quantite == 9) {
            quantite += 1;
            console.log(quantite);
        }

        if (isNaN(contentBadge)) {
            badge.innerHTML = `${quantite}`;
        } else {
            badge.innerHTML = `${quantite + contentBadge}`;
        }

        //* permet d'initialiser le popover
        $('[data-toggle="popover"]').popover(); // ici pour pas avoir inutilement un popover vide
        let contentPopover = parseInt(popover.dataset.content);
        console.log(contentPopover);
        // console.log(contentPopover);
        if (isNaN(contentPopover)) {
            popover.setAttribute("data-content", `${quantite}`);
            // popover.dataset.content = quantite;
            console.log(quantite);
        } else {
            // popover.setAttribute('data-content', `${(quantite + contentPopover)}`);
            popover.dataset.content = quantite + contentPopover;
            console.log(quantite);
        }

        //* on convertit quantité en number pour faire des calculs et on calcul prix
        quantite = parseInt(quantite);
        console.log(quantite);

        //* trouver une solution moins barbare
        console.log(prixTag.innerHTML);
        let prix = JSON.stringify(prixTag.innerHTML);
        prix = prix.replace(/<\/?[^>]+(>|$)/g, "");
        prix = prix.split(": ");
        prix = prix[1][0] + prix[1][1];
        prix = parseInt(prix);
        console.log(prix);

        total = prix * quantite + "€";
        console.log(total);

        //* On garde que la partie id
        let codeProduit = codeProduitTag.textContent;
        codeProduit = codeProduit.split(" : ");
        codeProduit = codeProduit[1];
        console.log(codeProduit);

        //* Idem pour la description
        let description = descriptionTag.textContent;
        description = description.split(" : ");
        description = description[1];
        console.log(description);

        //* on ajoute les autres infos au tableau
        choixNounours.push(
            codeProduit,
            nom.textContent,
            total,
            description,
            imgPeluche.src
        );
        console.log(choixNounours);

        // //* On envoie/récupère les infos nounours sur local storage
        // localStorage.setItem("choixNounours", JSON.stringify(choixNounours));
        // let retrievedChoixNounours= JSON.parse(localStorage.getItem("choixNounours"));
        // console.log(retrievedChoixNounours); // tes variables sont un peu longues, Alice // Au moins c'est parlant quoi

        //* Si l'utilisateur achète plusieurs nounours d'un coup
        console.log(JSON.parse(localStorage.getItem("choixNounoursTab")));
        //* on récupère tableau vide de commande
        choixNounoursTab = JSON.parse(localStorage.getItem("choixNounoursTab"));
        console.log(choixNounoursTab);
        // retrievedChoixNounoursTab.unshift('un nounours test');
        // console.log(retrievedChoixNounoursTab);
        //* on ajoute choixNounours
        choixNounoursTab.unshift(choixNounours);
        console.log(choixNounoursTab);
        // retrievedChoixNounoursTab.unshift('un 2e nounours test');
        //* On envoie le tableau de commande sur local storage qui contient un nouveau nounours
        //* A chaque tour, on ajoute un nounours
        localStorage.setItem(
            "choixNounoursTab",
            JSON.stringify(choixNounoursTab)
        );
        choixNounoursTab = JSON.parse(localStorage.getItem("choixNounoursTab"));
        console.log(choixNounoursTab);
    }); 
    //! FIN truc à supprimer quand j'aurai une meilleure solution
}
panier();


// localStorage.clear();

