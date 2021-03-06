/*
Auteur: Léo Taillard
*/
map = null;
serverUrl = "http://localhost:8888/timemap";
array = [];
markerTemplate = null;

templateYoutube = "<div class='popup'><div class='media'><div class='video-container'><iframe src='http://www.youtube.com/embed/dFVxGRekRSg' frameborder='0' width='560' height='315'></iframe></div></div><div class='infos'><h2>Titre du média</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod. Donec ullamcorper nulla non metus auctor fringilla.</p></div></div>";


$(document).ready(function() {
	
    $('#scroll').kinetic();
	setHeight();
	
	map = L.map('map').setView([46.79, 6.65], 12);

// Crée la map en définissant les coordonnées géographiques et le niveau de zoom
	$("#controls span").click(clickOnMe);
// Ajoute un calque pour les tuiles (tile) Openstreetmap. Sans ça, vous n'aurez rien affiché. C'est le Web Map Service de votre carte, ici celui par défaut.
	L.tileLayer('http://{s}.tile.cloudmade.com/b9941117432e4e63bb0e5a410de8e6eb/93138/256/{z}/{x}/{y}.png', {
  // Ajoute un copyright custom
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	var markerTemplate = $("#markerTemplate").html();
	$("#markerTemplate").remove();


// Ajoute un marqueur ainsi qu'une légende contenue dans une infobulle personnalisable.
$.getJSON(serverUrl+"/json/personne.json",
	function(data) {
			$(data.personne).each(function(index, e) {
			
				var info = {
					"name": e.prenom
				}
				var icon = switchPerson(info);
					
				$(e.medias).each(function(index,e) {
				
					if(e.type == "youtube"){
					
						var youtubeUrl = "http://www.youtube.com/embed/"+e.url;
						
						var output = "<div class='popup'><div class='media'><div class='video-container'><iframe src='"+youtubeUrl+"' frameborder='0' width='560' height='315'></iframe></div></div><div class='infos'><h2>"+e.titre+"</h2><p>"+e.description+"</p></div><div class='clear'></div></div>";
						var options = {
							'minWidth':500
						}
					} else if (e.type == "photo") {
					
						var output = "<div class='popup'><div class='media'><div class='img-container'><img src='"+e.url+"' alt='"+e.titre+"' /></div></div><div class='infos'><h2>"+e.titre+"</h2><p>"+e.description+"</p></div><div class='clear'></div></div>";
						var options = {
							'minWidth':500
						}
					}
					if (e.type =="texte") {
						
						var output = "<div class='popup'><div class='text'><h2>"+e.titre+"</h2><p>"+e.description+"</p></div></div>";
						var options = {
							'minWidth':500
						}
					}
				
					var marker = L.marker([e.lat, e.long], {icon: icon}).addTo(map)
					    .bindPopup(output,options); // La légende
					    array.push(marker);
					
				});
			});
			
		}
		
	);
	
	
	var templateTimeline = $("#timeline").html();
	$("#timeline").empty();
	$.getJSON(serverUrl+"/json/personne.json",
		function(data) {
				$(data.personne).each(function(index, e) {
					$("#timeline").append(Mustache.render(templateTimeline, data.personne[index]));
					
					var nameClasse = e.prenom.toLowerCase();
					$('.personne:eq('+index+')').addClass(nameClasse);
				});
		$("#timeline").removeClass('hidden');
		$("span.circle").click(function() {
			
			var lat = $(this).attr("lat");
			var long = $(this).attr("long")
			console.log(lat);
			
			lat = parseFloat(lat) + parseFloat(0.005);
			console.log(lat);
			map.setView([lat, long], 13);
			
			var id = $(this).first().attr("id");
			var toRemove = 'media-';
			var index = id.replace(toRemove,'');
			
			var marker = array[index-1];
			marker.openPopup();
		});
			}
		
		);
		
});

window.onresize = function() {
	setHeight();
};

function clickOnMe(e){

	switch ($(this).first().attr("id")) {
	case "left":
	    $('#scroll').kinetic('start', { velocity: -2 });
		break;
	case "right":
	    $('#scroll').kinetic('start', { velocity: 2 });
		break;
	case "end":
	    $('#scroll').kinetic('end');
		break;
	case "stop":
	    $('#scroll').kinetic('stop');
		break;
	}
}
function setHeight(){
	var heightWindow = $(window).height();
	var heightTL = $("#timeline").height();
	var heightTL = heightTL + $("#controls").height();
	var diff = heightWindow - heightTL;
	$("#map").css('height', diff);
}
function switchPerson(info){
	
	var LeafIcon = L.Icon.extend({
    options: {
        iconSize:[45, 46],
        popupAnchor:  [0, -25]
	    }
    });
    
    var iconPath = "css/img/icones/";
    
    switch (info.name){
    case "Philip":
    	var icon = new LeafIcon({iconUrl: iconPath+'olivier.png'});
    break;
    case "Mirjam":
    	var icon = new LeafIcon({iconUrl: iconPath+'melanie.png'});
    break;
    case "Claudette":
    	var icon = new LeafIcon({iconUrl: iconPath+'michael.png'});
    break;
    case "Alice":
    	var icon = new LeafIcon({iconUrl: iconPath+'xay.png'});
    break;
    case "Dorothée":
    	var icon = new LeafIcon({iconUrl: iconPath+'face-marker.png'});
    break;
    default:
    	var icon = new LeafIcon({iconUrl: iconPath+'melanie.png'});
    break;
    }
	
	return icon;
}