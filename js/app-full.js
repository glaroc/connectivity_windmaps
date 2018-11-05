

L.mapbox.accessToken = 'pk.eyJ1IjoiZ2xhcm9jIiwiYSI6InJPQ0d5Nk0ifQ.LPiEFZJ_-jI33kmjqwvNqA';

var attribution = '<span id="about">About this map</span>. Basemap data: <a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a> <a class="mapbox-improve-map" href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a>';

var lang;
function buildMapHome(){
  var sp;
  var sp=getUrlParameter('sp');
  if (sp=='rfg'){
    baseMaps = {
      "Black": L.mapbox.styleLayer('mapbox://styles/glaroc/cjgs09n0f00022ro3f0944zq6',{attribution:attribution}),
      "Satellite": L.mapbox.styleLayer('mapbox://styles/glaroc/cjgses2da000p2spetnqql9c9',{attribution:attribution}),
      "Rainette": L.mapbox.styleLayer('mapbox://styles/glaroc/cji6atgji08n62rpao2mrpvg8',{attribution:attribution}),
    };
  }else if (sp=='cmm'){
    baseMaps = {
      "Black": L.mapbox.styleLayer('mapbox://styles/glaroc/cjju2izs13iz22rt5k7wajg4a',{attribution:attribution})
    };
  }else{
    baseMaps = {
      "Black": L.mapbox.styleLayer('mapbox://styles/glaroc/cjgs09n0f00022ro3f0944zq6',{attribution:attribution}),
      "Satellite": L.mapbox.styleLayer('mapbox://styles/glaroc/cjgses2da000p2spetnqql9c9',{attribution:attribution}),
    };
  }

  map = L.map('map-home', {
    scrollWheelZoom: true, 
    touchZoom: true, 
    zoomControl: false, 
    center: [45.8384, -72.6375],
    zoom: 9,
    maxZoom: 14,
  }); 



  new L.Control.Zoom({ position: 'topright' }).addTo(map);
  var hash = L.hash(map);

  // add layers
  L.control.layers(baseMaps).addTo(map);
  baseMaps.Black.addTo(map);

  // add flow maps

  if(sp=='rfg'){
    $('#loading').show();
    $('#loading').children('.spinner').toggleClass('spinnershow');
    $('#map-menu').hide();
    map.setZoom(11);
    map.panTo(new L.LatLng(45.4876, -73.4618));
    buildFlow(map, 'map-home', "amphibs");  
  }else if(sp=='cmm'){
    $('#loading').show();
    $('#loading').children('.spinner').toggleClass('spinnershow');
    map.setZoom(10);
    map.panTo(new L.LatLng(45.57319,-73.52943));
    buildFlow(map, 'map-home', "URAM");  
  }else {
    buildFlow(map, 'map-home', "URAM");     
  }


  //setTimeout(function(){buildFlowHome(map, 'map-home', mammalsConfig);}, 200);
  //setTimeout(function(){buildFlowHome(map, 'map-home', birdsConfig);}, 500);

}



function buildFlow(map, mapDiv, species){
  config=window[species+'Config'];
  $.getJSON(config.spData).done(function(result) {
    var timer = null;
    var canvasOverlay = L.canvasOverlay().drawing(redraw).addTo(map);
    canvasOverlay.species=species;
    var windy = new Windy({canvas: canvasOverlay.canvas(), data: result}, config);
    var context = canvasOverlay.canvas().getContext('2d');

    function redraw(overlay, params) {
      if( timer ) 
        window.clearTimeout( timer ); 

      timer = setTimeout(function() { //showing wind is delayed
        var bounds = map.getBounds();
        var size = map.getSize();

        windy.start( [[0,0],[size.x, size.y]], size.x, size.y, 
          [[bounds._southWest.lng, bounds._southWest.lat ],[bounds._northEast.lng, bounds._northEast.lat]] );
      },750)
    }

    //clear canvas and stop animation
    function clearWind() {
      //console.log('flushing windy');
      windy.stop();
      context.clearRect(0,0,3000, 3000);
    }   

    map.scrollWheelZoom.disable();
    map.on('dragstart', function() { clearWind() });
    map.on('zoomstart', function() { clearWind() });
    map.on('resize', function() { clearWind() }); 
    $('#'+species).parent().children('.spinner').toggleClass('spinnershow');
    $('#loading').hide();
  })
}

function removeLayer(species){
    map.eachLayer(function (layer) {
      if(layer.species == species){
        map.removeLayer(layer);
      }
      if(!$('#'+species).is(":checked") && typeof(layer.options.tiles) == 'undefined'){ //For some reason, remove layer that isn't checked but is still there
        map.removeLayer(layer);
      }
   });
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


function infobox(lang){
  if(lang=='en'){
    $.fancybox.open('<div class="message"><h2>Welcome</h2><p>This is an interactive visualisation of the habitat connectivity of target species in the St. Lawrence Lowlands of Québec. The vectors on the map represent simulated animals trying to move through the landscape and being restrained both by habitat availability and connectivity. Note that this is a simulation exercise and the vectors are not actual observations of these animals at these locations. </p><p>Based on connectivity analyses described in <a href="https://besjournals.onlinelibrary.wiley.com/doi/10.1111/2041-210X.12470">Rayfield <em>et al</em></a>, and <a href="https://onlinelibrary.wiley.com/doi/abs/10.1111/cobi.12943">Albert <em>et al</em></a>, and extended to the St.Lawrence Lowlands by <a href="https://quebio.ca/connect/files/Rapport Final_140518.pdf">Rayfield <em>et al</em>.</a> under the leadership of <a href="http://gonzalezlab.weebly.com/">Andrew Gonzalez, McGill University</a>. Supported in part by the Liber Ero Chair in Biodiversity Conservation. This tool is developed by <a href="https://qcbs.ca/research-professional-guillaume-larocque">Guillaume Larocque, QCBS</a>. Original inspiration and part of the code from this <a href="http://maps.tnc.org/migrations-in-motion/#4/19.00/-78.00">interactive visualisation of animal migrations.</a></p><p>You can select species in the bottom left menu, or zoom in and out and choose a different background layer from the top-right menu. </p><p><button class="closebut" autofocus>Explore!</button></p></div>');

  }else{
    $.fancybox.open("<div class='message'><h2>Bienvenue!</h2><p>Ceci est une visualisation interactive de la connectivité de l'habitat de certaines espèces cibles dans les Basses-Terres du Saint-Laurent. Les vecteurs représentent des animaux simulés qui essaient de se déplacer dans le paysage, et en sont restraints soit par la disponibilité ou la connectivité de l'habitat. Notez que ceci est un exercice de simulation et que les vecteurs ne représentent pas des animaux observés à ces endroits. </p><p>Basé sur les analyses de connectivité présentées dans <a href='https://besjournals.onlinelibrary.wiley.com/doi/10.1111/2041-210X.12470'>Rayfield <em>et al</em></a> et <a href='https://onlinelibrary.wiley.com/doi/abs/10.1111/cobi.12943'>Albert <em>et al</em></a> et étendu aux Basses-Terres du Saint-Laurent par <a href='https://quebio.ca/connect/files/Rapport Final_140518.pdf'>Rayfield <em>et al.</em></a>, sous la gouverne d'<a href='http://gonzalezlab.weebly.com/'>Andrew Gonzalez</a>, Université McGill. Ce travail est supporté en partie par la Chaire Liber Ero en conservation de la biodiversité. Cet outil est développé par <a href='https://qcbs.ca/fr/professionnel-de-recherche-guillaume-larocque/'>Guillaume Larocque, QCBS</a>. L'inspiration originale et une partie du code provient de <a href='http://maps.tnc.org/migrations-in-motion/#4/19.00/-78.00'> cette visualisation interactive des migrations animales.</a></p><p>Vous pouvez choisir les espèces dans le menu en bas à droite, et zoomer ou changer de couche de fond dans le menu en haut à droite.</p><p><button class='closebut' autofocus>Explore!</button></p></div>");
  }
}

jQuery(document).ready(function($) {
      // build map stuff
      lang=$('#lang').val();
      infobox(lang);
      buildMapHome();
      $(document).on('click','.closebut',function(){
        $.fancybox.close();
      })
      $('#about').click(function(){
        infobox(lang);
      })
      $('.check').click(function(){
        if($(this).is(":checked")){
          $(this).parent().children('.spinner').toggleClass('spinnershow');
          buildFlow(map, 'map-home',$(this).attr('id'));
        } else {
          removeLayer($(this).attr('id'));
        }
      });
});