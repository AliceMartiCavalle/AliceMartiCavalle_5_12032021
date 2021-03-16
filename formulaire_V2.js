// localStorage.clear();

// formulaire de contact
//! annuler comportement par défaut pour que la page se recharge pas
$("#valider").click(function(e) { 
    e.preventDefault();
    // creation.style.border = '1px solid #000';
});

// ajouter tableau avec données utilisateur
let lastNameInput = document.getElementById('lastName');
let firstNameInput = document.getElementById('firstName');
let addressInput = document.getElementById('address');
let cityInput = document.getElementById('city');
let emailInput = document.getElementById('email');
// bouton
let valider = document.getElementById('valider');
//form
let formUser = document.getElementById('formUser');
let contact = new FormData();
//* si je fais new FormData(formUser) ça ne capture pas le contenu des input

valider.addEventListener('click', function() {

    contact.append('lastName', lastNameInput.value);
    contact.append('firstName', firstNameInput.value);
    contact.append('address', addressInput.value);
    contact.append('city', cityInput.value);
    contact.append('email', emailInput.value);
    
    //parcourt l'objet
    for (let pair of contact.entries()) {
        console.log(pair[0] + ' _ ' + pair[1]);
    }
    //parcourt l'objet et transforme le contenu en texte
    for (let pair of contact.entries()) {
        console.log(JSON.stringify(pair[0] + ' _ ' + pair[1]));
    }

    // tableau produits test
    let products = ["id", "name", "25€", "description", "img"];

    //poster une commande : XML request (tentative 1)
    let requestPOST = new XMLHttpRequest();
    requestPOST.open("POST", "http://localhost:3000/api/teddies/order");
    requestPOST.setRequestHeader("Content-Type", "application/json");
    requestPOST.send(JSON.stringify(contact), JSON.stringify(products));
    
    //poster une commande : fetch (tentative 2)
    fetch('http://localhost:3000/api/teddies/order', {
    method: "POST",
    headers : {
        'Content-type': 'application/json'
    },
    //du coup c'est un tableau, qu'est-ce qu'on doit envoyer exactement ?
    //la consigne dit : "Requête JSON contenant un objet de contact et un tableau de produits"
    //donc on le met dans quoi ? un {} ? un [] ??
    body: [JSON.stringify(contact), JSON.stringify(products)] 
    })
    .then(response => response.json())
    .then(json => console.log(json));

    ////dans les deux cas, message d'erreur : net::ERR_CONNECTION_REFUSED

});











// let products = ["id", "name", "25€", "description", "img"];

// truc à poster

//?ici j'ai un objet avec les infos utilisateurs, ensuite je fais quoi ???
// let requestPOST = new XMLHttpRequest();
// requestPOST.open("POST", "http://localhost:3000/api/teddies/formulaire.html");
// requestPOST.setRequestHeader("Content-Type", "application/json");
// requestPOST.send(JSON.stringify(formData, products));


// var formData = new FormData();
// formData.append('key1', 'value1');
// formData.append('key2', 'value2');

// // Display the key/value pairs
// for (var pair of formData.entries()) {
//     console.log(pair[0]+ ', ' + pair[1]); 
// }




// ANCIENNE VERSION
// let utilisateur = [];
// let tabUtilisateurs = [];

// //? POST tableau vide
// //! Est-ce que ça va pas écraser les données ?
// let requestPOST = new XMLHttpRequest();
// requestPOST.open("POST", "http://localhost:3000/api/teddies/formulaire.html");
// requestPOST.setRequestHeader("Content-Type", "application/json");
// requestPOST.send(JSON.stringify(tabUtilisateurs));

// function setUtilisateur() {
//     // concaténation des # parties du mail
//     mailEntier = `${mail1.value}@${mail2.value}`;
//     console.log(mailEntier);
//     //! verif pattern mail ou set pattern dans form (mieux)
    
//     // Les infos rentrées dans input sont ajoutées à [utilisateur]
//     utilisateur.push(nomInput.value, prenomInput.value, adresseInput.value,
//         adresse2Input.value, villeInput.value, codePostalInput.value);

//     // capturer valeur du select pays et pusher dans le tableau
//     inputPays.addEventListener('change', function() {
//         index = inputPays.selectedIndex;
//         console.log(index);
//         switch (index) {
//             case 0 :
//                 utilisateur.push('France');
//                 break;
//             case 1 :
//                 utilisateur.push('Allemagne');
//                 break;
//             case 2 :
//                 utilisateur.push('Belgique');
//                 break;
//             case 3 :
//                 utilisateur.push('Italie');
//                 break;
//             case 4 :
//                 utilisateur.push('Espagne');
//                 break;
//             default:
//                 console.log("erreur");
//                 break;
//         }
//     });
    
//     if (index == -1) { // utilisateur pas rentré dans la boucle
//         utilisateur.push('France, par défaut');
//     }

//     // ajouter infos restantes 
//     utilisateur.push(mailEntier, mdpInput.value, enregistrerIDInput.value);
//     console.log('utilisateur : ' + utilisateur);
// }

// // Quand on clique sur valider
// valider.addEventListener("click", function() {
//     //? GET tableau utilisateurs 
//     let requestGET = new XMLHttpRequest();
//     requestGET.onreadystatechange = function() {
//         if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//             let response = JSON.parse(this.responseText);
//         console.log(response.current_condition.condition);
//         }
//     };
//     requestGET.open("GET", "http://localhost:3000/api/teddies/users");
//     requestGET.send(JSON.parse(tabUtilisateurs));
//     console.log(tabUtilisateurs);

//     // tester tableau des utilisateurs pour voir si l'utilisateur existe déjà
//     if (tabUtilisateurs.includes(nomInput.value) || tabUtilisateurs.includes(mailEntier.value)) { //tester avec nom & mail
//         alert('vous avez déjà un compte n\ Merci de vous connecter avec vos identifiants');
//     } else {
//         setUtilisateur();
//         console.log(utilisateur);
//         tabUtilisateurs.unshift(utilisateur); //comme ça on se fait pas chier à parcourir tout le tableau
//         console.log(tabUtilisateurs)
//         // classer tabUtilisateurs par order alpha par 1ère valeur qui est nom ?
//     }

//     //? POST tabUtilisateurs
//     let requestPOST = new XMLHttpRequest();
//     requestPOST.open("POST", "http://localhost:3000/api/teddies/users");
//     requestPOST.setRequestHeader("Content-Type", "application/json");
//     requestPOST.send(JSON.stringify(tabUtilisateurs));

// });





// BROUILLON

    // // On envoie [utilisateur] sur la base de données
    // localStorage.setItem("utilisateur", JSON.stringify(utilisateur));
    // let retrivedUtilisateur = localStorage.getItem("utilisateur");
    // console.log("retrievedUtilisateur: ", retrivedUtilisateur);

    //// Si on veut mettre des index aux utilisateur
    //// On parcourt le tableau des utilisateurs
    // for (let i = 0; i < tabUtilisateurs.length; i++) {
    //     // Si la case est remplie, on avance dans le tableau
    //     if (tabUtilisateurs[i] != null) {
    //         i++;
    //     // A la fin du tableau, on ajoute une case avec l'index directement supérieur
    //     // et on la remplie avec le nouvel utilisateur
    //     } else {
    //         i++;
    //         tabUtilisateurs.push([i, utilisateur]);
    //     }
    // }

    // //On envoie [tabUtilisateurs] sur la base de données
    // localStorage.setItem("tabUtilisateurs", JSON.stringify(tabUtilisateurs));
    // let retrivedTabUtilisateurs = localStorage.getItem("tabUtilisateurs");
    // console.log("retrievedTabUtilisateurs" + retrivedTabUtilisateurs);

    // console.log('tabUtilisateurs' + tabUtilisateurs);
    



// AjouteContenu(num, titleInput.value);


// function AjouteUtilisateur(key, texte) {
//     // console.log("clé=" + key + " ,titre=" + title);
//     //ajoute un objet avec titre + index dans le tableau des titres
//     let obj = {};
//     obj[key] = texte;
//     tabContenu.unshift(obj); //*anciennement push
//     // stock l'objet dans local storage
//     localStorage.setItem("newObject", JSON.stringify(tabContenu));
//     // récupère l'objet depuis local storage
//     let retrievedObject = localStorage.getItem("newObject");
//     console.log("retrievedObject: ", retrievedObject);
//         //affiche tous les titres et leur index
//         for (let [key, value] of Object.entries(obj)) {
//             // console.log(`${key}: ${value}`);
//             //cible juste l'index
//             let justKey = `${key}`;
//             // let justValue = `${value}`;
//             // console.log(justKey);
//             //numérote le nouveau titre avec l'index disponible directement supérieur
//             num = parseInt(justKey) + 1;
//         }
//         //ici on a tabContenu qui contient (index + input) * 4  
//         console.log('index + input :' + retrievedObject); //= tabContenu dans storage
//     }

    // Ex de request POST :
    // var request = new XMLHttpRequest();
    // request.open("POST", "http://url-service-web.com/api/users");
    // request.setRequestHeader("Content-Type", "application/json");
    // request.send(JSON.stringify(jsonBody));
    
    // N'oubliez pas d'annuler le comportement par défaut de la soumission du formulaire, sinon votre page va se recharger

//     //? ne fonctionne pas au 2e click, si on clique d'abord sur bio puis détails
// $("#albertCardBio").click(function() {
//     //changer d'onglet
//     $('#albertCardPerso').attr('class', 'nav-link');
//     $('#albertCardBio').attr('class', 'nav-link active');
//     $('#albertCardDetail').attr('class', 'nav-link');
//     //changer le contenu de l'onglet
//     $('#albertCardTitre').replaceWith("<p><strong>Biographie : </strong></p>");
//     $('#albertCardText').replaceWith("<p>Je suis un texte biographique</p>");  
// });

// $("#albertCardPerso").click(function() {
//     $('#albertCardPerso').attr('class', 'nav-link active');
//     $('#albertCardBio').attr('class', 'nav-link');
//     $('#albertCardDetail').attr('class', 'nav-link');
//      //changer le contenu de l'onglet
//      $('#albertCardTitre').replaceWith("<p><strong>Biographie : </strong></p>");
//      $('#albertCardText').replaceWith("<p>Comment revenir au truc de base ?</p>");
// });
// $("#albertCardDetail").click(function() {
//     // $('albertCardPerso').replaceWith("<div id='choix'>Durée choisie : </div>")
//     $('#albertCardPerso').attr('class', 'nav-link');
//     $('#albertCardBio').attr('class', 'nav-link');
//     $('#albertCardDetail').attr('class', 'nav-link active');
//      //changer le contenu de l'onglet
//      $('#albertCardTitre').replaceWith("<p><strong>Détails : </strong></p>");
//      $('#albertCardText').replaceWith("<p>Je suis un texte de détails produits</p>");
// });

