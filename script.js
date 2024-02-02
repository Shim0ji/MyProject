fetch('apprenants.json')
.then(response => response.json())
.then(data => transfert(data))

function transfert(data){
    //0. création des variables
    let eniData = data.apprenants
    let conteneurList = document.getElementById("displTable")
    let conteneurCard = document.getElementById("blockDispCard")
    let title = document.getElementById("title")

    //injection éléments uniques
    title.innerHTML = data.infos[0].formation + " " + data.infos[0].promo

    for(let i = 0; i< eniData.length; i++){
        //1. injection des datas dans le tableau 
        let newBalise = document.createElement("tr")//variable de création de la nouvelle balise
        //construction de chaque colonne de la ligne
        newBalise.innerHTML = `<td id="tblName` + i + `"></td>
                                <td id="tblFstName` + i + `"></td>
                                <td id="tblCity` + i + `">ville</td>
                                <td><button id="tblButt` + i + `">détail</button></td>
                                `     
        conteneurList.appendChild(newBalise)//ajout de la nouvelle ligne parmi les enfants
        
        //injection des datas spécifiques à chaque balise
        document.getElementById("tblName"+i).innerText = eniData[i].nom
        document.getElementById("tblFstName"+i).innerText = eniData[i].prenom
        document.getElementById("tblCity"+i).innerText = eniData[i].ville

        //détection du click sur détail pour apparition de la popup et injection des infos relatives
        document.getElementById("tblButt" + i).addEventListener("click", ()=>{
            document.getElementById("cdName").innerText = eniData[i].nom
            document.getElementById("cdFName").innerText = eniData[i].prenom
            document.getElementById("cdCity").innerText = eniData[i].ville
            document.getElementById("cdNote").innerText = eniData[i].anecdotes
            document.getElementById("blockBigData").style.display = "block"
        })

        //2. injection des datas dans les cartes de visite
        let newBalise2 = document.createElement("div")
         
        newBalise2.innerHTML = `<h1 id="crdName` + i + `"></h1>
                                <h2 id="crdCity` + i + `">ville</h2>
                                <span class="buttIns">
                                <button id="crdButt` + i + `">détail</button>
                                </span>
                                `     
        conteneurCard.appendChild(newBalise2)
    
        document.getElementById("crdName"+i).innerText = eniData[i].nom + " " +eniData[i].prenom
        document.getElementById("crdCity"+i).innerText = eniData[i].ville

        //détection du click sur détail pour apparition de la popup et injection des infos relatives
        document.getElementById("crdButt" + i).addEventListener("click", ()=>{
            document.getElementById("cdName").innerText = eniData[i].nom
            document.getElementById("cdFName").innerText = eniData[i].prenom
            document.getElementById("cdCity").innerText = eniData[i].ville
            document.getElementById("cdNote").innerText = eniData[i].anecdotes
            document.getElementById("blockBigData").style.display = "block"
        })
    }
}

//ACCUEIL
let blockList = document.getElementById("blockDispList")
let blockCards = document.getElementById("blockDispCard")
let blockDetails = document.getElementById("blockBigData")

//rappel de la mémoire du thème

// 1.le thème choisi
if(localStorage.key('theme') != null){//choix tu thème
    document.body.className = localStorage.getItem('theme')
}
// 2.l'affichage choisi
if(localStorage.key('students') != null){
    if(localStorage.getItem('students') == 'list'){
        blockList.style.display ="block"
        blockCards.style.display ="none"
        document.getElementById("dispOptList").checked = true
        document.getElementById("dispOptCard").checked = false
    }else{
        blockList.style.display ="none"
        blockCards.style.display ="inline-flex"
        document.getElementById("dispOptList").checked = false
        document.getElementById("dispOptCard").checked = true
    }
}else{
    blockList.style.display ="block"
    blockCards.style.display ="none"
    document.getElementById("dispOptList").checked = true
    document.getElementById("dispOptCard").checked = false
}
// 3. la couleur de fond choisie
if(localStorage.key('color') != null){
    document.body.style.backgroundColor = localStorage.getItem('color')
}


//modification affichage ponctuel
document.getElementById("crdClose").addEventListener("click", ()=>{//pour fermer le block détail
    blockDetails.style.display = "none"
})

document.getElementById("dispOptList").addEventListener("click", ()=>{
    blockList.style.display ="block"
    blockCards.style.display ="none"
    console.log("on veut changer en list")
})
document.getElementById("dispOptCard").addEventListener("click", ()=>{
    blockList.style.display ="none"
    blockCards.style.display ="inline-flex"
})
