// localStorage.clear();

//// RESUME COMMANDE

//!clear local storage une fois que tout est fait

let choixNounoursTab = JSON.parse(localStorage.getItem("choixNounoursTab"));
console.log(choixNounoursTab);

let quantiteTotale;

let total;

function GetPrixPerUnite() {
    console.log('%c GET PRIX PER UNITE ', fct);
    let prixUniteTab = [];
    //* On parcourt le tableau avec les nounours
    for (let i = 0; i < choixNounoursTab.length; i++) {
        //* On récupère le prix, la quantité de chaque nounours
        let prix = choixNounoursTab[i][4];
        console.log(prix);
        let quantite = choixNounoursTab[i][1];
        console.log(quantite);
        //* On calcule le prix unitaire de chaque nounours et on le stock dans prixUniteTab
        let prixUnite = parseInt(prix) / parseInt(quantite);
        // console.log(prixUnite);
        prixUniteTab.push(prixUnite);
    }
    console.log(prixUniteTab);
    return prixUniteTab;
}

function CreateCommandeLines(prixUniteTab) {
    console.log('%c CREATE COMMANDE LINE ', fct)
    let commandeTab = [];
    let commandeAll = document.getElementById('commandeAll');
    //* On ajoute des lignes de commandes en fonction du nombre de nounours
    for (let i = 0; i < choixNounoursTab.length; i++) {
        //* nouvelle ligne de commande
        let newCommande = document.createElement("div");
        newCommande.innerHTML = "<div><img /></div><div>nom</div><div>prix</div><div>couleur</div><div>svg</div><div>supr</div>";
        newCommande.setAttribute("class", "commande row border-bottom border-primary d-flex justify-content-center flex-column flex-lg-row")
        
        //* On sélectionne tous les éléments de la ligne et on remplit un par un
        let newCommandeDiv = newCommande.querySelectorAll('div');
        
        //* img
        let newCommandeImgDiv = newCommandeDiv[0];
        newCommandeImgDiv.setAttribute("class", "col-8 mx-auto col-lg-2 d-flex justify-content-center");
        let newCommandeImg = newCommandeImgDiv.querySelector("img");
        newCommandeImg.setAttribute("src", choixNounoursTab[i][6]);
        newCommandeImg.setAttribute("class", "imgCommande");
        // console.log(newCommandeImgDiv);
        
        //* nom
        let newCommandeNom = newCommandeDiv[1];
        newCommandeNom.setAttribute("class", "col-8 mx-auto col-lg-3 d-flex align-items-center justify-content-center");
        newCommandeNom.innerHTML = `<strong>Nom : &nbsp;</strong>${choixNounoursTab[i][3]}`;
        // console.log(newCommandeNom);
        
        //* prix
        console.log(prixUniteTab);
        let newCommandePrix = newCommandeDiv[2];
        newCommandePrix.setAttribute("class", "col-8 mx-auto col-lg-3 d-flex align-items-center justify-content-center");
        newCommandePrix.innerHTML = `<strong>Prix : &nbsp;</strong>${choixNounoursTab[i][1]} x ${prixUniteTab[i]}€ = ${choixNounoursTab[i][4]}`;
        // console.log(newCommandePrix);
       
        //* couleur
        let newCommandeCouleur = newCommandeDiv[3];
        newCommandeCouleur.setAttribute("class", "col-8 mx-auto col-lg-2 d-flex align-items-center justify-content-center");
        newCommandeCouleur.innerHTML = `<strong>Couleur : &nbsp;</strong>${choixNounoursTab[i][0]}`;
        // console.log(newCommandeCouleur);
        
        //* svg couleur
        let newCommandeSvg = newCommandeDiv[4];
        newCommandeSvg.setAttribute("class", "col-8 mx-auto col-lg-1 d-flex align-items-center circle justify-content-center");
        newCommandeSvg.innerHTML = `<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="5" r="4" stroke="black" stroke-width="3%" fill="${choixNounoursTab[i][7]}"/></svg>`;
        // console.log(newCommandeSvg);
       
        //* icone poubelle
        let newCommandeIcon = newCommandeDiv[5];
        newCommandeIcon.setAttribute("class", "col-8 mx-auto col-lg-1 my-2 my-lg-0 d-flex justify-content-center align-items-center bin");
        newCommandeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg>`;
        
        commandeAll.appendChild(newCommande);

        // let numDeLigne = choixNounoursTab[i][8];
    
        commandeTab.push({newCommande : newCommande, numDeLigne : choixNounoursTab[i][8]}); // pour bin
        // numDeLigne.push(choixNounoursTab[i][8]); // pour bin
    }
    console.log(commandeTab);
    return commandeTab;
}

function CreateDeleteEventBin(commandeTab, badge, totalDiv) {
    console.log('%c CREATE DELETE EVENT BIN', fct);

    //* On repère les bins dans html
    let binAll = document.querySelectorAll(".bin")
    console.log(binAll);
    for (let i = 0; i < binAll.length; i++) {
        // console.log(i);
        (function(arg) {
            binAll[i].addEventListener('click', function(e) {

                //* efface la ligne de commande qui contient le svg qui a été cliqué
                //* pas possible d'utiliser ça, pas précis. Impossible de savoir si on clique sur le svg ou la div qui contient le svg
                //! si on clique sur la div, ça efface le body !
                // let thisCommandeLine = e.target.parentNode.parentNode.parentNode
                // console.log(thisCommandeLine)
                // thisCommandeLine.remove()

                console.log(arg);
                console.log(i);
                
                console.log('%c BIN', btn);
                console.log(binAll[i]);
                console.log(choixNounoursTab);
                //? il faut chercher dans choixNounoursTab le nounours par nom
                // console.log(commandeTab[i]);
                // console.log(commandeTab[i].numDeLigne);
                // let thisNours = commandeTab[i].querySelector('')

                // tab.filter(item => {return item})
                let noursDelete = choixNounoursTab.filter(nours => {
                    console.log(nours[8]);
                    return nours[8] == commandeTab[i].numDeLigne;
                    // return nours == nom+quantite
                })
                console.log(noursDelete);


                commandeTab[i].newCommande.remove();


                //* On décrémente le badge dans la nav
                //* S'il restait un nounours ou aucun : badge est à 0 après le click
                if (choixNounoursTab.length == 0 || choixNounoursTab.length == 1) {
                    console.log('badge 0')
                    badge.innerHTML = ``;
                    localStorage.removeItem('numLigneCommande');
                    // } else if (choixNounoursTab.length == 1) {
                        //     console.log('badge 1')
                        //     badge.innerHTML = `${choixNounoursTab[0][1]}`;
                    } else {
                    console.log('badge else')
                    //? pourquoi noursDelete est un tableau dans un tableau ?
                    badge.innerHTML = `${(quantiteTotale - noursDelete[0][1])}`;
                }
                
                //* On ajuste le calcul du total et on l'affiche à l'utilisateur
                let prix;
                //! revoir si il reste plus que 1 nours, condition pour 1 ?
                if (choixNounoursTab.length > 0) {
                    console.log(noursDelete[0][4])
                    prix = parseInt(noursDelete[0][4]);
                    console.log(prix)
                    console.log(total)
                    total -= parseInt(prix);
                    console.log(total)
                } else {
                    prix = 0;
                    total = 0;
                }
                console.log(parseInt(prix));
                console.log(parseInt(total));
                totalDiv.innerHTML = `<strong>Total : </strong>${total}€`;
            
                //// On vide le local storage
                console.log(choixNounoursTab);
                console.log(noursDelete);
                //  tab.filter(item => {return item})
                choixNounoursTab.filter(nours => {
                    // console.log(nours[8]);
                    // console.log(choixNounoursTab.indexOf(nours));
                    
                    if (nours == noursDelete[0]) {
                        console.log(choixNounoursTab.indexOf(nours));
                        choixNounoursTab.splice(choixNounoursTab.indexOf(nours), 1);
                    }
                    
                })
                console.log(choixNounoursTab);

                // console.log(IndexNoursDelete);
                    // console.log(choixNounoursTab.indexOf(IndexNoursDelete))
                    // choixNounoursTab.splice(i, 1); //début + nb de truc à supprimer
                    // console.log(choixNounoursTab);
                    localStorage.setItem("choixNounoursTab", JSON.stringify(choixNounoursTab));
                    choixNounoursTab = JSON.parse(localStorage.getItem("choixNounoursTab"));
                    console.log(choixNounoursTab);
                    // // console.log(choixNounoursTab[i][4]);


            }, false);
            console.log(arg); // s'incrémente
            // i = arg;
        })(i);

    }
    // let bin = [];
    // console.log(binAll);
    // console.log(binAll[0]);
    // console.log(binAll[1]);
    // //* On parcourt les lignes de commandes (1 commande / case du tableau choixNounoursTab)
    // for (let i = 0; i < choixNounoursTab.length; i++) {
    //     //* on capture toutes les bins dans un tableau
    //     // bin.push(newCommandeIconAll[i]); 
    //     // console.log(bin[i]);
    //     console.log(binAll[i]);
    //     // console.log(total);
    //     // console.log(prixUniteTab);
    //     //* Pour chaque bin, on efface la ligne qui lui correspond au click
    //     binAll[i].addEventListener('click', function() {

    //         console.log('BIN');
    //         console.log(binAll[i]);
    //         console.log(commandeTab[i]);
    //         commandeTab[i].remove();

    //         //* On décrémente le badge dans la nav
    //         //! revoir si il reste plus que 1 nours, condition pour 1 ?
    //         if (choixNounoursTab.length > 0) {
    //             badge.innerHTML = `${(quantiteTotale - choixNounoursTab[i][1])}`;
    //         } else {
    //             badge.innerHTML = ``;
    //         }
            
    //         //* On ajuste le calcul du total et on l'affiche à l'utilisateur
    //         let prix;
    //         //! revoir si il reste plus que 1 nours, condition pour 1 ?
    //         if (choixNounoursTab.length > 0) {
    //             prix = parseInt(choixNounoursTab[i][4]);
    //             total -= parseInt(prix);
    //         } else {
    //             prix = 0;
    //             total = 0;
    //         }
    //         console.log(parseInt(prix));
    //         console.log(parseInt(total));
    //         totalDiv.innerHTML = `<strong>Total : </strong>${total}€`; //wow, ça fonctionne, ce truc de ouf
        
    //         //// On vide le local storage
    //         choixNounoursTab.splice(i, 1);
    //         console.log(choixNounoursTab);
    //         localStorage.setItem("choixNounoursTab", JSON.stringify(choixNounoursTab));
    //         choixNounoursTab = JSON.parse(localStorage.getItem("choixNounoursTab"));
    //         console.log(choixNounoursTab);
    //         // console.log(choixNounoursTab[i][4]);
    //     });
    // }
}

function CreateCommande () {
    //* On change le titre en fonction de si une commande a été passée ou pas
    let h2 = document.querySelector('h2');
    h2.innerHTML = `Résumé de votre commande`;
    
    //* calcul de la quantité totale pour page de confirmation
    quantiteTotale = 0;
    for (let i = 0; i < choixNounoursTab.length; i++) {
        quantiteTotale += parseInt(choixNounoursTab[i][1]);
        console.log(quantiteTotale);
    }
    
    //* On remet le badge sur le panier
    let badge = document.querySelector('.badge');
    if (quantiteTotale == 0) {
        console.log("quantité totale = 0");
    } else {
        badge.innerHTML = `${quantiteTotale}`;
    }
    
    let prixUniteTab = GetPrixPerUnite();
    
    // let commandeTab = []; //* pour delete qd click bin
    
    let commandeTab = CreateCommandeLines(prixUniteTab); //* pour delete qd click bin
    
    //* On calcule le prix
    let totalDiv = document.getElementById('total');
    total = 0;
    //* on parcourt le tableau de nounours pour récup prix / quantité de chaque nounours
    for (let i = 0; i < choixNounoursTab.length; i++) {
        let prix = choixNounoursTab[i][4];
        console.log(prix);
        // let quantite = choixNounoursTab[i][1];
        // console.log(quantite);
        //* on multiplie et on ajoute à chaque tour
        total += parseInt(prix);
        console.log(total);
    }
    console.log(total);
    //* Et on affiche pour utilisateur
    totalDiv.innerHTML = `<strong>Total : </strong>${total}€`;
    
    //* On retarde cette partie jusqu'à ce que les lignes de commande existent
    setTimeout(() => {

        console.log('set timeout delete bin')
        CreateDeleteEventBin(commandeTab, badge, totalDiv);
       
        // console.log(bin);
    }, 1000);
}

if (choixNounoursTab != null) {

    CreateCommande();

}

//// FORMULAIRE DE CONTACT

//* toast
$(document).ready(function(){
    $('.toast').toast('show');
});
let toasts = document.getElementsByClassName('toast');
let toast = toasts[0];

/**
 * !Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 */

//* annuler comportement par défaut pour que la page se recharge pas
//! temporaire
$("#valider").click(function(e) { 
    e.preventDefault();

    postForm();
    // creation.style.border = '1px solid #000';
});

//* ajouter tableau avec données utilisateur
let lastNameInput = document.getElementById('nom');
let firstNameInput = document.getElementById('prenom');
let addressInput = document.getElementById('adresse');
let cityInput = document.getElementById('ville');
let emailInput = document.getElementById('mail');
//* bouton
let valider = document.getElementById('valider');
let btnLoading = document.getElementById('loading')
btnLoading.style.display = 'none'
//* form
let formUser = document.getElementById('formUser');
// let contact = new FormData();
//? si je fais new FormData(formUser) ça ne capture pas le contenu des input

//! nécessaire à version 1 de POST
// let contact = {}; 
// let commande;
//!

let errMsgDiv = document.querySelector('#errMsgDiv');
errMsgDiv.style.opacity = '0';

let errMsg = errMsgDiv.querySelector('p');

//* vérifie les champs du formulaire
function verifForm() {
    console.log('%c FONCTION VERIFFORM ', fct);
    
    let inputs = document.querySelectorAll('input');
    // console.log(inputs[0]);
    // const style = getComputedStyle(inputs[0])
    // console.log(style.backgroundColor);
    
    console.log(Array.from([1, 2, 3], x => x + x));

    let checkForm = Array.from(inputs, input => {
        console.log(input.value);
        const style = getComputedStyle(input)
        if (input.value == '') {
            errMsg.textContent = 'Il manque une information dans le formulaire'
            errMsgDiv.style.opacity = '1';
            return false;
        } else if (style.backgroundColor == 'rgba(212, 3, 3, 0.3)') {
            console.log(input.id);
            errMsg.textContent = `Merci de bien vouloir vérifier votre ${input.id} (et toute autre information surlignée en rouge)`
            errMsgDiv.style.opacity = '1';
            return false;
        } else {
            return true;
        }
    })

    console.log(checkForm);
    console.log(checkForm.includes(false));
    
    if (!checkForm.includes(false)) {
        console.log('ok')
        let contact = {}; 

        contact.firstName = firstNameInput.value;
        console.log(contact.firstName);
        contact.lastName = lastNameInput.value;
        console.log(contact.lastName);
        contact.address = addressInput.value;
        console.log(contact.address);
        contact.email = emailInput.value;
        console.log(contact.email);
        contact.city = cityInput.value;
        console.log(contact.city);

        postApi(contact);
    } else {
        console.log('not ok')
        return false; //?
    }
    
};

//* envoie les infos à l'API via fetch : POST
function postApi(contact)  {
    console.log('%c FONCTION POST API', fct)

    // let contact = verifForm();
    // console.log(contact);

    let products = [];
    for (let i = 0; i < choixNounoursTab.length; i++) {
        products.push(choixNounoursTab[i][2]);
        console.log(products);
    }

    let commande = {contact, products};

    // POST
    const PostNounours = async function() {
        // fetch('http://localhost:3000/api/teddies/order', {
        fetch('https://projet-oc-5.herokuapp.com/api/teddies/order', {
            method: "POST",
            headers : {
                'Accept' : 'application/json',
                'Content-type': 'application/json'
            },
            // body: JSON.stringify(commande) //* => 500 : internal server error
            // body: JSON.stringify(contact, products) //* => 400 : bad request
            // body: JSON.stringify({contact: contact, products: products}) //* => 500 : internal server error
            // body: JSON.stringify({contact: contact, products: products}) //* OK 
            body: JSON.stringify(commande) //* OK 
        })
        .then(response => response.json())
        // .then(json => console.log(json));
        .then(function (response) {
            console.log(response.orderId);
            console.log(response.contact);
            console.log(response.products);

            //* infos nécessaires pour la page de confirmation
            let infosConfirmation = [];
            infosConfirmation.push(quantiteTotale, total, response.orderId, response.contact);
            console.log(infosConfirmation);
            localStorage.setItem("infosConfirmation", JSON.stringify(infosConfirmation));
        
            valider.style.display = 'none';
            btnLoading.style.display = 'block';
            //* On envoie vers la page de confirmation
            //* avec un délai sinon ya rien dans local storage
            // NB : on n'a pas besoin d'un TEL delai, mais maintenant j'ai un super bouton qui tourne ^^
            setTimeout(function() {
                document.location.href="confirmation.html"; 
            }, 2000);
        });
    }
    PostNounours();  

}

//* fonction activée par l'utilisateur avec bouton valider 
function postForm() {
    
    console.log('%c FONCTION POSTFORM ', fct);

    //* Si le panier est vide, on affiche un toast
    if (choixNounoursTab === null || choixNounoursTab.length == 0) {
        toast.setAttribute('class', 'toast toast--form show');
        toast.dataset.autohide = 'false';
        console.log('toast', toast);
    }

    verifForm();

    return false; // pour éviter que la page se recharge
}
