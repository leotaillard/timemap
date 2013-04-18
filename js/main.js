/*
Auteur: Léo Taillard
*/
$(document).ready(function() {

// Crée la map en définissant les coordonnées géographiques et le niveau de zoom
var map = L.map('map').setView([46.523335, 6.615654], 15);

// Ajoute un calque pour les tuiles (tile) Openstreetmap. Sans ça, vous n'aurez rien affiché. C'est le Web Map Service de votre carte, ici celui par défaut.
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  // Ajoute un copyright custom
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Ajoute un marqueur ainsi qu'une légende contenue dans une infobulle personnalisable.
L.marker([46.523335, 6.615654]).addTo(map)
    .bindPopup('Yo, mega test. ') // La légende
    .openPopup();
    
});