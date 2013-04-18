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
    
		<div id="map">
		</div>
		
		
	    <div id="timeline">
			<?php
				for ($i = 0; $i < 8; $i++) {
				$alea = rand(0, 78);
				$alea2= rand(0, 78);
			?>
			
			<section class="personne">
				<div class="perso">Nom de la personne</div>
				<div class="line">
					
					<span class="circle" id="media-1" style="margin-left: <?php echo($alea) ?>%;"></span>
					<span class="circle" id="media-2" style="margin-left: <?php echo($alea2) ?>%;"></span>
				</div>
				
			</section>
			<?php
				}
			?>
	    </div>
		
		
		
		
	<script src="http://cdn.leafletjs.com/leaflet-0.5/leaflet.js"></script>
    <script src="js/main.js" type="text/javascript"></script>
	
    </body>
</html>          
