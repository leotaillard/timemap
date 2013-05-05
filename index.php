<!DOCTYPE html>
<html lang="fr">
    <head>
	<title>Time Map</title>        
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width">

	<link rel="stylesheet" href="css/reset.css" />
	<link rel="stylesheet" href="css/main.css" />
	<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.5/leaflet.css" />
	<link href='http://fonts.googleapis.com/css?family=Raleway:400,200' rel='stylesheet' type='text/css'>
  <!--[if lte IE 8]>
     <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.5/leaflet.ie.css" />
  <![endif]-->
	<script src="js/jquery.min.js" type="text/javascript"></script>	        
    
    <link rel="shortcut icon" href="ico/favicon.png">
<!--    <link rel="apple-touch-icon" href="ico/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="ico/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="ico/apple-touch-icon-114x114.png"> -->
    
	<!--[if lt IE 9]>
	  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
    </head>
    <body>
    	<div id="logo">
    		<img src="img/logo.png" alt="Les voisins d'à côté" />
    	</div>
    
		<div id="map">
		</div>
		<nav id="controls">
		                <span id="left">&lt; Gauche</span> |
		                <span id="right">Droite &gt;</span>
		                &nbsp;&nbsp; -- &nbsp;&nbsp;
		                <span id="end">STAHP</span>
		</nav>
		
		<div id="scroll">
		
	    <div id="timeline" class="hidden">
			<section class="personne {{prenom}}">
				<div class="perso">{{prenom}}</div>
				<div class="line">
					{{#medias}}
						<span lat="{{lat}}" long="{{long}}" class="circle" id="media-{{idm}}" style='margin-left: {{{temporalite}}}%;'><span class="tooltip">{{titre}}</span></span>
					{{/medias}}
				</div>
				
			</section>
	    </div>
	    </div>
		
		
	<script src='js/mustache.js'></script>
	<script src='js/jquery.kinetic.min.js'></script>
	<script src="http://cdn.leafletjs.com/leaflet-0.5/leaflet.js"></script>
    <script src="js/main.js" type="text/javascript"></script>
	<div id="markerTemplate" class="hidden">
	    <div class="popup">
	        <div class="media">{{{mediaUrl}}}</div>
	        <div class="info">
	            <div class="titrePopup">
	                {{title}}
	            </div>
	            <div class="descriptionPopup">
		            {{description}}
	            </div>
	            
	        </div>
	    </div>
	</div>
	
    </body>
</html>          
