/////////////////////////////////// PARTIE IMPORTATION DES DONNEES //////////
fetch('apprenants.json')
.then(response => response.json())
.then(data => transferParam(data))

function transferParam(data){
    let title = document.getElementById("title")
    //injection éléments uniques
    title.innerHTML = data.infos[0].formation + " " + data.infos[0].promo
}
//sélecteur du theme
let chooixTheme = document.getElementById("themeSelect")
let colorSelected
let dispoSelected

//réglage des curseurs sur les valeurs mémoire
if(localStorage.key('theme') != null){//choix tu thème
    //rappel de la mémoire
    document.body.className = localStorage.getItem('theme')
    if(localStorage.getItem('theme') == 'darkTheme'){
        document.getElementById("themeSelect").querySelector("option[value='clair']").selected = false
        document.getElementById("themeSelect").querySelector("option[value='sombre']").selected = true
    }else{
        document.getElementById("themeSelect").querySelector("option[value='clair']").selected = true
        document.getElementById("themeSelect").querySelector("option[value='sombre']").selected = false
    }
}
if(localStorage.key('students') != null){//choix d'affichage
    if(localStorage.getItem('students') == 'list'){
        document.getElementById("dispOptList").checked = true
        document.getElementById("dispOptCard").checked = false
    }else{
        document.getElementById("dispOptList").checked = false
        document.getElementById("dispOptCard").checked = true
    }
}

if(localStorage.getItem('color') != null){//choix couleur de fond
    //rappel de la mémoire
    document.body.style.backgroundColor = localStorage.getItem('color')
    document.getElementById("colorSelector").value = localStorage.getItem('color')
    document.getElementById('colorClear').style.display ="block"//bouton de suppression
    document.getElementById('colorClear').addEventListener("click", ()=>{
        document.getElementById('colorSelector').value = "#FFFFFF"
        localStorage.removeItem('color')
        document.getElementById('colorClear').style.display ="none"
    })
}else if(document.getElementById('colorSelector').value != "#FFFFFF"){
    document.getElementById('colorClear').style.display ="none"
    document.getElementById('colorSelector').value = "#FFFFFF"
    colorSelected = false
}
//////////////////////////////////// PARTIE MANIPULATION DES PREFS ////////////


//sélecteur des couleurs
document.getElementById('colorSelector').addEventListener("change", ()=>{
    if(document.getElementById('colorSelector').value != "#FFFFFF"){
        colorSelected = true
        document.getElementById('colorClear').style.display ="block"//bouton de suppression
        document.getElementById('colorClear').addEventListener("click", ()=>{
            colorSelected = false
            document.getElementById('colorSelector').value = "#FFFFFF"
            document.getElementById('colorClear').style.display ="none"
        })
    }else{
        colorSelected = false
        document.getElementById('colorSelector').value = "#FFFFFF"
        document.getElementById('colorClear').style.display ="none"
    }
})
//sélecteur de l'affichage liste ou cartes
document.getElementById("dispOptList").addEventListener("click", ()=>{
    dispoSelected = 1
})
document.getElementById("dispOptCard").addEventListener("click", ()=>{
    dispoSelected = 2
})

//procédure d'enregistrement
document.getElementById("prefsConf1").addEventListener("click", ()=>{
    let confirmMessage = confirm('Voulez-vous enregistrer vos préférences ?')
    if(confirmMessage){
        //le theme
        if(chooixTheme.value == "clair"){
            document.body.className = "clearTheme"
            localStorage.setItem('theme', 'clearTheme')
        }else if(chooixTheme.value == "sombre"){
            document.body.className = "darkTheme"
            localStorage.setItem('theme', 'darkTheme')
        }
        //la couleur
        if(colorSelected){
            localStorage.setItem('color', document.getElementById('colorSelector').value)
            document.body.style.backgroundColor = localStorage.getItem('color')
        }
        //la dispo
        if(dispoSelected == 1){
            localStorage.setItem('students', 'list')
            dispoSelected = 0
        }else if (dispoSelected == 2){
            localStorage.setItem('students', 'card')
            dispoSelected = 0
        }
    }
})

