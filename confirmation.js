//? comment passer les variables ici depuis formulaires_V2.js ?

//* TEMPORAIRE
let choixNounoursTab = JSON.parse(localStorage.getItem("choixNounoursTab"));
let total = "143€";
let response_contact = {}
response_contact.firstName = "Jeanne";
response_contact.lastName = "Doe";
response_contact.address = "-25 rue de l'au-delà";
response_contact.city = "Ailleurs"
let response_orderId = 98714684268714;
//* TEMPORAIRE FIN


let messageDiv = document.getElementById('message');

let p = messageDiv.querySelectorAll('p');
let resume = p[1];
let prix = p[2];
let adresse = p[4];

let span = messageDiv.querySelectorAll('span');
let nom = span[0];
let numCommande = span[1];

let NumNom = [];
for (let i = 0; i < choixNounoursTab.length; i++) {
    NumNom.push(' ' + choixNounoursTab[i][1] + ' ' + choixNounoursTab[i][3]); // 1 Garfunkel
}
if (NumNom.length > 1) {
    resume.innerHTML = `${NumNom} feront bientôt partie de votre famille !`; 
} else {
    resume.innerHTML = `${NumNom} fera bientôt partie de votre famille !`;
}

prix.innerHTML = `Pour seulement ${total} !`;

nom.innerHTML = `Cher/Chère client·e ${response_contact.firstName} ${response_contact.lastName}`;
numCommande.innerHTML = `${response_orderId}`; 
adresse.innerHTML = `${response_contact.address}, ${response_contact.city}`;


