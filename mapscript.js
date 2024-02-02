fetch('apprenants.json')
.then(response => response.json())
.then(data => transferMap(data))

function transferMap(data){
    let studentPos = data.apprenants
    let title = document.getElementById("title")

    //injection éléments uniques
    title.innerHTML = data.infos[0].formation + " " + data.infos[0].promo
    //insertion de la map
    let map = L.map("map").setView([48.866667, 2.333333], 5);

    L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>', 
    }).addTo(map);
    
    for(let i = 0; i < studentPos.length; i++ ){//boucle pour les markers de chaque élève
        var marker = L.marker([studentPos[i].coordonnees.latitude, studentPos[i].coordonnees.longitude])
            .addTo(map)
            .bindPopup(studentPos[i].prenom + " " + studentPos[i].nom)
    }
}
//rappel de la mémoire pour le thème du site
if(localStorage.key('theme') != null){//choix tu thème
    document.body.className = localStorage.getItem('theme')
}
if(localStorage.key('color') != null){//choix couleur de fond
    document.body.style.backgroundColor = localStorage.getItem('color')
}