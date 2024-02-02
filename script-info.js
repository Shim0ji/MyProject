fetch('apprenants.json')
.then(response => response.json())
.then(data => transferInfo(data))

function transferInfo(data){
    let infToInj = data.infos[0]//emplacement des infos à utiliser
    let title = document.getElementById("title")//titre page
    let dateDeb = document.getElementById("start")//date de début de formation
    let dateFin = document.getElementById("end")//date de fin de formation
    let nbrAppre = document.getElementById("numbSt")//nombre d'étudiants
    let description = document.getElementById("descr")//date de fin de formation

    //injection titrePromo
    title.innerHTML = infToInj.formation + " " + infToInj.promo
    //injection infos
    dateDeb.innerHTML = infToInj.dateDebut
    dateFin.innerHTML = infToInj.dateFin
    nbrAppre.innerText = data.apprenants.length
    description.innerHTML = infToInj.description
    
}







//rappel de la mémoire
if(localStorage.key('theme') != null){//choix tu thème
    document.body.className = localStorage.getItem('theme')
}
if(localStorage.key('color') != null){//choix couleur de fond
    document.body.style.backgroundColor = localStorage.getItem('color')
}