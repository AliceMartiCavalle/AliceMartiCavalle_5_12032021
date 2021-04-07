async function stockVariables() {
    //* On attend d'avoir les infos nounours
    await PostNounours();
    
    //* On liste les variables dont on aura besoin dans confirmation.js
    // total, response_contact, response_orderId, choixNounoursTab
    console(total);
    console.log(choixNounoursTab);
}