//* RECUPERER INFOS NOUNOURS SUR BASE DE DONNEES

const GetNounours = async function() {

    const res = await fetch('https://projet-oc-5.herokuapp.com/api/teddies');

    //* Si réponse a un ok == true et header == 200
    if (res.ok && res.status == 200) {
        console.log('%c fetch ok ', DB);
        const data = await res.json();
        console.log(data);
        // LogData(data); //! à supprimer ensuite
        return data;
    } else {
        console.log('%c err DB ', pbDB)
    }
           
}

const GetOneNounours = async function(thisId) {

    console.log(thisId);
    const res = await fetch(`https://projet-oc-5.herokuapp.com/api/teddies/${thisId}`);
    if (res.ok && res.status == 200) {
        console.log('%c fetch ok ', DB);
        const data = await res.json();
        return data;
    } else {
        console.log('%c err DB ', pbDB)
    }
       
}
