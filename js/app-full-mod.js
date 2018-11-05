/* Zoom coords 
US:               39    -98   5
Central Apps:     38    -78   6
Mountain West:    42    -112  5
Amazon:           -9    -57   5
*/


L.mapbox.accessToken = 'pk.eyJ1IjoiZ2xhcm9jIiwiYSI6InJPQ0d5Nk0ifQ.LPiEFZJ_-jI33kmjqwvNqA';



function buildMapHome(){
  var baseMaps = {
    "Black": L.mapbox.styleLayer('mapbox://styles/glaroc/cjgs09n0f00022ro3f0944zq6'),
    "Satellite": L.mapbox.styleLayer('mapbox://styles/glaroc/cjgses2da000p2spetnqql9c9'),
    "Rainette": L.mapbox.styleLayer('mapbox://styles/glaroc/cjgsf0z3100072rmumv40axeq')
  };

  var map = L.map('map-home', {
    scrollWheelZoom: true, 
    touchZoom: true, 
    zoomControl: false, 
    center: [45.37, -73.55], 
    zoom: 12,
    maxZoom: 14,
    attributionControl: true
  }); 



  new L.Control.Zoom({ position: 'topright' }).addTo(map);
  var hash = L.hash(map);

  // add layers
  L.control.layers(baseMaps).addTo(map);
  baseMaps.Black.addTo(map);

  // This is a kludge. For some reason, attribution is not showing up when map is initially loaded, so I manually set it 
  // to the attribution of the black basemap. However, attribution *is* added once you switch basemaps, but you have to 
  // remove the manually added attribution; otherwise, there's duplicate copies of the attribution.
  // manually add attribution
  var attribution = 'Basemap data: <a href="https://www.mapbox.com/about/maps/" target="_blank">Â© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">Â© OpenStreetMap</a> <a class="mapbox-improve-map" href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a>';

  map.attributionControl.setPrefix('');
  map.attributionControl.addAttribution(attribution);
  map.on('baselayerchange', fixAttribution);

  function fixAttribution (e) {
    map.attributionControl.removeAttribution(attribution);
    map.attributionControl.setPrefix('Basemap data:');
  };

  
  // add flow maps
  buildFlowHome(map, 'map-home', amphibsConfig); 
  //setTimeout(function(){buildFlowHome(map, 'map-home', mammalsConfig);}, 200);
  //setTimeout(function(){buildFlowHome(map, 'map-home', birdsConfig);}, 500);


  function buildFlowHome(map, mapDiv, config){
    var bounds = map.getBounds();
    $.ajax({
      type: "POST",
      url: wind_tiles.php,
      data: {east:bounds._northEast.lng,
        west:bounds._southWest.lng,
        north:bounds._northEast.lat,
        south:bounds._southWest.lat,
      },
      success: process_json,
      dataType: dataType
    });
  }


  function process_json(result) {
      var timer = null;
      var canvasOverlay = L.canvasOverlay().drawing(redraw).addTo(map);
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
  }
}

// builds flow for variable map in map div using config
function buildFlow(map, mapDiv, config){
  $.getJSON(config.spData).done(function(result) {
    var timer = null;
    var canvasOverlay = L.canvasOverlay().drawing(redraw).addTo(map);
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
      console.log('flushing windy');
      windy.stop();
      context.clearRect(0,0,3000, 3000);
    }   

    map.scrollWheelZoom.disable();   
    map.on('zoomstart', function() {console.log('zoom start'); clearWind() });
    map.on('mouseup', function() {console.log('move start'); clearWind() });    
    map.on('resize', function() { clearWind() });   

  })
}

 /* INITIALIZE  ------- --------- -------- ------- ------ */
// build map stuff
buildMapHome();

// initialize slider
jQuery(document).ready(function($) {
      $('#content-carousel').unslider({
        arrows: true
      });
    });