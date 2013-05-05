/*
Auteur: Léo Taillard
*/
map = null;
serverUrl = "http://localhost:8888/timemap";
array = [];
markerTemplate = null;

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

	markerTemplate = $("#markerTemplate").html();
	console.log(markerTemplate);
	addRealPeopleSample();
	
	var templateTimeline = $("#timeline").html();
	$("#timeline").empty();
	$.getJSON(serverUrl+"/json/personne.json",
		function(data) {
				$(data.personne).each(function(index, e) {
					$("#timeline").append(Mustache.render(templateTimeline, data.personne[index]));
					
				});
		$("#timeline").removeClass('hidden');
		$("span.circle").click(function() {
			var lat = $(this).attr("lat");
			var long = $(this).attr("long");
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
function newMarker(info){
	/* console.log(content) */
	//randomLat = (Math.random() * 0.037336) + 6.619655;
	//randomLong = (Math.random() * 0.027156) + 46.766006;
	//var marker = L.marker([randomLong, randomLat]);

	var date = info.media.date;
	
	var icon = switchPerson(info);
	var mediaUrl = switchType(info.media);

	var marker = L.marker([info.media.lat, info.media.long], {icon: icon});
	
	var jsonTemplate = {
		"title": info.media.titre,
		"description": info.media.description,
		"mediaUrl": mediaUrl
	}
	
	var output = Mustache.render(markerTemplate, jsonTemplate);

	var options = {
		'minWidth':800
	}
	marker.bindPopup(output, options);
	marker.addTo(map);
	array.push(marker);
}

function addRealPeopleSample(){
	$.getJSON('json/personne.json', function(data) {
		 $.each(data.personne, function(key, person) {
		 	var name = {
			 	"firstName": person.prenom,
			 	"lastName": person.nom
		 	}
		 	$.each(person.medias, function(key, media) {
		 	var info = {
			 	"name": name,
			 	"media": media
		 	}
		 		newMarker(info);
		 	});
		});
	});
}

function switchPerson(info){
		var LeafIcon = L.Icon.extend({
    options: {
        iconSize:[45, 46],
        popupAnchor:  [0, -25]
    }
    });
    
    var iconPath = "css/img/icones/";
    
    switch (info.name.firstName){
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

function switchType(media){
	var htmlReturn;
	switch (media.type) {
	    case "youtube":
	    	htmlReturn = $("<iframe/>");
	    	htmlReturn.attr({
		    	width: 420,
		    	height: 315,
		    	src: "http://www.youtube.com/embed/"+ media.url,
		    	frameborder: 0,
		    	allowfullscreen: " "});
			break;
		case "photo":
			htmlReturn = $("<img/>");
	    	htmlReturn.attr({
		    	width: 420,
		    	height: 315,
		    	src: media.url
		    	});
			break;
		case "texte":
			htmlReturn = $("<p/>");
	    	htmlReturn.attr({
		    	width: 420,
		    	height: 315
		    	});
		    	htmlReturn.html(media.description);
			break;
		default:
			htmlReturn = $("<iframe/>");
	    	htmlReturn.attr({
		    	width: 420,
		    	height: 315,
		    	src: "http://www.youtube.com/embed/"+ media.url,
		    	frameborder: 0,
		    	allowfullscreen: " "});
		break;
	}
	htmlReturn = ($('<div>').append(htmlReturn.clone()).remove().html());
	return htmlReturn;
}