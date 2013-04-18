/*
Auteur: Léo Taillard
*/
map = L.map('map').setView([46.523335, 6.615654], 15);

$(document).ready(function() {
	setHeight();
// Crée la map en définissant les coordonnées géographiques et le niveau de zoom
	$("span").click(clickOnMe);
// Ajoute un calque pour les tuiles (tile) Openstreetmap. Sans ça, vous n'aurez rien affiché. C'est le Web Map Service de votre carte, ici celui par défaut.
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  // Ajoute un copyright custom
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

// Ajoute un marqueur ainsi qu'une légende contenue dans une infobulle personnalisable.
	L.marker([46.523335, 6.615654]).addTo(map)
	    .bindPopup('<h2>COOLER</h2>'); // La légende
	L.marker([46.524433, 6.616744]).addTo(map)
	    .bindPopup('<h2>COOLER 2</h2>'); // La légende
	L.marker([46.522433, 6.614744]).addTo(map)
	    .bindPopup('<h2>COOLER 2</h2>'); // La légende
	
});

window.onresize = function() {
	setHeight();
};

function clickOnMe(e){
	switch ($(this).first().attr("id")) {
	case "media-1":
		map.setView([43, 3], 15);
		break;
	case "media-2":
		map.setView([46.523335, 6.615654], 15);
		break;
	}
}
function setHeight(){
	var heightWindow = $(window).height();
	var heightTL = $("#timeline").height();
	var diff = heightWindow - heightTL;
	$("#map").css('height', diff);
}