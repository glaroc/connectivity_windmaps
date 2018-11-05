/* Basemaps
Mapbox satellite            dmajka.map-mp6dlg4m     https://{s}.tiles.mapbox.com/v4/dmajka.map-mp6dlg4m/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZG1hamthIiwiYSI6IlNuSHVNb0UifQ.zIkArM4rtyvdtMZjZEesBA
Mapbox emerald              dmajka.m431fjbc         https://{s}.tiles.mapbox.com/v4/dmajka.m431fjbc/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZG1hamthIiwiYSI6IlNuSHVNb0UifQ.zIkArM4rtyvdtMZjZEesBA
Mapbox streets classic      dmajka.km66e1ni         https://{s}.tiles.mapbox.com/v4/dmajka.km66e1ni/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZG1hamthIiwiYSI6IlNuSHVNb0UifQ.zIkArM4rtyvdtMZjZEesBA
Mapbox outdoors             dmajka.m430agb5         https://{s}.tiles.mapbox.com/v4/dmajka.m430agb5/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZG1hamthIiwiYSI6IlNuSHVNb0UifQ.zIkArM4rtyvdtMZjZEesBA
Custom light
// Still possible to composite mapbox layers w/ vanilla leaflet (or cartodb) like this: http://a.tiles.mapbox.com/v3/dmajka.km66e1ni,dmajka.m430agb5,dmajka.9v3u9pb9/3/1/2.png

NOAA green tiles: http://www.nnvl.noaa.gov/Green_Tiles/${z}/${x}/${y}.png"  See http://www.nnvl.noaa.gov/Green.html
Stamen toner:               http://b.tile.stamen.com/toner/{Z}/{X}/{Y}.png
Stamen watercolor 					http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png
cartodb dark:               http://{s}.basemaps.cartocdn.com/dark_all/{Z}/{X}/{Y}.png
carodb dark no labels       http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png
cartodb light_all           http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png
cartodb light no labels     http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png
acetate terrain 						http://a{s}.acetate.geoiq.com/tiles/terrain/{z}/{x}/{y}.png
acetate hillshade 					http://a{s}.acetate.geoiq.com/tiles/hillshading/{z}/{x}/{y}.png
earth at night 							http://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}
picture book                https://{s}.tiles.mapbox.com/v4/saman.ed44282c/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2FtYW4iLCJhIjoiS1ptdnd0VSJ9.19qza-F_vXkgpnh80oZJww
*/

  //var map = L.mapbox.map('map-home', 'dmajka.m712cap8,dmajka.9v3u9pb9,dmajka.nl9v0a4i').setView([-9, -57], 5);

/* Zooms
US      center: [35, -97]   zoom: 5
NA-SA   center: [19, -85]   zoom: 4
SA      center: [-9, -57]   zoom: 5
Central Apps:     38    -78   6
Mountain West:    42    -112  5
*/


  // Movement Data 
// var allSpecies = 'data/hii_mag.json';
// var amphibs = 'data/amphibs_mag.json';
// var amphMamm = 'data/mamms_amphibs.json';
// var amphMammBirds = 'data/mamms_amphibs_birds.json';
// var birds = 'data/birds_direction.json';
// var mammals = 'data/mammals_mag.json';
// var flowdir = 'data/flowdir.json';
// var laNyLine = 'data/la_ny_line2.json';
// var nocost = 'data/nocost_mag.json';

// birdData = $.getJSON('data/birds_direction.json');
// amphibData = $.getJSON('data/amphibs_mag.json');
// mammalData = $.getJSON('data/mammals_mag.json');
// allSpeciesData = $.getJSON('data/hii_mag.json');

amphibsConfig = {
"VELOCITY_SCALE" : 0.00007,             // scale for wind velocity (completely arbitrary--this value looks nice)
"OVERLAY_ALPHA": Math.floor(0.9*255),  // overlay transparency (on scale [0, 255])
"INTENSITY_SCALE_STEP": 1,            // step size of particle intensity color scale
"MAX_WIND_INTENSITY": 5000,              // wind velocity at which particle intensity is maximum (m/s)
"MAX_PARTICLE_AGE": 100,                  // higher = flow things out and gets wirey.
"PARTICLE_LINE_WIDTH": 1.5,            // line width of a drawn particle
"PARTICLE_MULTIPLIER": 1/100,              // particle count scalar (completely arbitrary--this values looks nice)
"PARTICLE_REDUCTION": 0.75,            // reduce particle count to this much of normal for mobile devices
"FRAME_RATE": 30,                      // desired milliseconds per frame
"NULL_WIND_VECTOR": [0, 0, null],  // singleton for no wind in the form: [u, v, magnitude]
"TRANSPARENT_BLACK": [255, 0, 0, 0],   // 
"FADE_FILL_STYLE" : "rgba(0, 0, 0, 0.96)",   // sets trail transparency. orig = 0.97. Higher = trail; lower = particle
//"COLOR_RAMP" : ['#178be7','#8888bd','#b28499','#cc7e78','#de765b','#ec6c42','#f55f2c','#fb4f17','#fe3705','#ff0000'],
"COLOR_RAMP" : ['#fcfa47'], // yellow
"COLOR_ALPHA" : 0.8, 
"ACCOUNT_FOR_ZOOM" : 10000,  // set to false if the number of particle doesn't depend on zoom factor -- Guillaume
"spData": 'data/rfg_curmap4.json',
"spName": 'amphibs',
"EXPONENT" : 0.5, 
"THRESHOLD" : 0, 
};


BLBRConfig = {
"VELOCITY_SCALE" : 5e-06,             // scale for wind velocity (completely arbitrary--this value looks nice)
"OVERLAY_ALPHA": Math.floor(0.9*255),  // overlay transparency (on scale [0, 255])
"INTENSITY_SCALE_STEP": 5,            // step size of particle intensity color scale
"MAX_WIND_INTENSITY": 100,              // wind velocity at which particle intensity is maximum (m/s)
"MAX_PARTICLE_AGE": 10000,                  // higher = flow things out and gets wirey.
"PARTICLE_LINE_WIDTH": 2.5,            // line width of a drawn particle
"PARTICLE_MULTIPLIER": 1/1000,              // particle count scalar (completely arbitrary--this values looks nice)
"PARTICLE_REDUCTION": 0.75,            // reduce particle count to this much of normal for mobile devices
"FRAME_RATE": 30,                      // desired milliseconds per frame
"NULL_WIND_VECTOR": [0, 0, null],  // singleton for no wind in the form: [u, v, magnitude]
"TRANSPARENT_BLACK": [255, 0, 0, 0],   // 
"FADE_FILL_STYLE" : "rgba(0, 0, 0, 0.95)",   // sets trail transparency. orig = 0.97. Higher = trail; lower = particle
//"COLOR_RAMP" : ['#178be7','#8888bd','#b28499','#cc7e78','#de765b','#ec6c42','#f55f2c','#fb4f17','#fe3705','#ff0000'],
"COLOR_RAMP" : ['#ff2d3f'], // yellow
"COLOR_ALPHA" : 0.9, 
"ACCOUNT_FOR_ZOOM" : 10000,  // set to false if the number of particle doesn't depend on zoom factor -- Guillaume
"spData": 'data/BLBR_curmap_200.json',
"spName": 'blbr',
"EXPONENT" : 1, 
"THRESHOLD" : 250, 
};

PLCIConfig = {
"VELOCITY_SCALE" : 5e-07,             // scale for wind velocity (completely arbitrary--this value looks nice)
"OVERLAY_ALPHA": Math.floor(0.9*255),  // overlay transparency (on scale [0, 255])
"INTENSITY_SCALE_STEP": 1,            // step size of particle intensity color scale
"MAX_WIND_INTENSITY": 10000,              // wind velocity at which particle intensity is maximum (m/s)
"MAX_PARTICLE_AGE": 300,                  // higher = flow things out and gets wirey.
"PARTICLE_LINE_WIDTH": 3,            // line width of a drawn particle
"PARTICLE_MULTIPLIER": 1/500,              // particle count scalar (completely arbitrary--this values looks nice)
"PARTICLE_REDUCTION": 0.75,            // reduce particle count to this much of normal for mobile devices
"FRAME_RATE": 30,                      // desired milliseconds per frame
"NULL_WIND_VECTOR": [0, 0, null],  // singleton for no wind in the form: [u, v, magnitude]
"TRANSPARENT_BLACK": [255, 0, 0, 0],   // 
"FADE_FILL_STYLE" : "rgba(0, 0, 0, 0.96)",   // sets trail transparency. orig = 0.97. Higher = trail; lower = particle
//"COLOR_RAMP" : ['#178be7','#8888bd','#b28499','#cc7e78','#de765b','#ec6c42','#f55f2c','#fb4f17','#fe3705','#ff0000'],
"COLOR_RAMP" : ['#ffa640'], // orange
"COLOR_ALPHA" : 1, 
"ACCOUNT_FOR_ZOOM" : 10000,  // set to false if the number of particle doesn't depend on zoom factor -- Guillaume
"spData": 'data/PLCI_curmap_200.json',
"spName": 'plci',
"EXPONENT" : 1, 
"THRESHOLD" : 250, 
};

URAMConfig = {
"VELOCITY_SCALE" : 1e-05,             // scale for wind velocity (completely arbitrary--this value looks nice)
"OVERLAY_ALPHA": Math.floor(0.9*255),  // overlay transparency (on scale [0, 255])
"INTENSITY_SCALE_STEP": 10,            // step size of particle intensity color scale
"MAX_WIND_INTENSITY": 300,              // wind velocity at which particle intensity is maximum (m/s)
"MAX_PARTICLE_AGE": 50,                  // higher = flow things out and gets wirey.
"PARTICLE_LINE_WIDTH": 2.0,            // line width of a drawn particle
"PARTICLE_MULTIPLIER": 1/3000,              // particle count scalar (completely arbitrary--this values looks nice)
"PARTICLE_REDUCTION": 0.75,            // reduce particle count to this much of normal for mobile devices
"FRAME_RATE": 40,                      // desired milliseconds per frame
"NULL_WIND_VECTOR": [0, 0, null],  // singleton for no wind in the form: [u, v, magnitude]
"TRANSPARENT_BLACK": [0, 0, 0, 0],   // 
"FADE_FILL_STYLE" :  "rgba(0, 0, 0, 0.96)",    // sets trail transparency. orig = 0.97. Higher = trail; lower = particle
//"COLOR_RAMP" : ['#178be7','#8888bd','#b28499','#cc7e78','#de765b','#ec6c42','#f55f2c','#fb4f17','#fe3705','#ff0000'],
"COLOR_RAMP" : ['#fcfa47'], // yellow
"COLOR_ALPHA" : 1, 
"ACCOUNT_FOR_ZOOM" : 10000,  // set to false if the number of particle doesn't depend on zoom factor -- Guillaume
"spData": 'data/URAM_curmap_200.json',
"spName": 'uram',
"EXPONENT" : 1, 
"THRESHOLD" : 250, 
};

MAAMConfig = {
"VELOCITY_SCALE" : 1.5e-05,             // scale for wind velocity (completely arbitrary--this value looks nice)
"OVERLAY_ALPHA": Math.floor(0.9*255),  // overlay transparency (on scale [0, 255])
"INTENSITY_SCALE_STEP": 100,            // step size of particle intensity color scale
"MAX_WIND_INTENSITY": 1000,              // wind velocity at which particle intensity is maximum (m/s)
"MAX_PARTICLE_AGE": 1000,                  // higher = flow things out and gets wirey.
"PARTICLE_LINE_WIDTH": 2.0,            // line width of a drawn particle
"PARTICLE_MULTIPLIER": 1/3000,              // particle count scalar (completely arbitrary--this values looks nice)
"PARTICLE_REDUCTION": 0.75,            // reduce particle count to this much of normal for mobile devices
"FRAME_RATE": 40,                      // desired milliseconds per frame
"NULL_WIND_VECTOR": [0, 0, null],  // singleton for no wind in the form: [u, v, magnitude]
"TRANSPARENT_BLACK": [255, 0, 0, 0],   // 
"FADE_FILL_STYLE" : "rgba(0, 0, 0, 0.96)",   // sets trail transparency. orig = 0.97. Higher = trail; lower = particle
//"COLOR_RAMP" : ['#178be7','#8888bd','#b28499','#cc7e78','#de765b','#ec6c42','#f55f2c','#fb4f17','#fe3705','#ff0000'],
"COLOR_RAMP" : ['#ff2df5'], // orange
"COLOR_ALPHA" : 1, 
"ACCOUNT_FOR_ZOOM" : 10000,  // set to false if the number of particle doesn't depend on zoom factor -- Guillaume
"spData": 'data/MAAM_curmap_200.json',
"spName": 'maam',
"EXPONENT" : 1, 
"THRESHOLD" : 250, 
};

RASYConfig = {
"VELOCITY_SCALE" : 1e-06,             // scale for wind velocity (completely arbitrary--this value looks nice)
"OVERLAY_ALPHA": Math.floor(0.9*255),  // overlay transparency (on scale [0, 255])
"INTENSITY_SCALE_STEP": 1,            // step size of particle intensity color scale
"MAX_WIND_INTENSITY": 10000,              // wind velocity at which particle intensity is maximum (m/s)
"MAX_PARTICLE_AGE": 300,                  // higher = flow things out and gets wirey.
"PARTICLE_LINE_WIDTH": 2.5,            // line width of a drawn particle
"PARTICLE_MULTIPLIER": 1/1000,              // particle count scalar (completely arbitrary--this values looks nice)
"PARTICLE_REDUCTION": 0.75,            // reduce particle count to this much of normal for mobile devices
"FRAME_RATE": 30,                      // desired milliseconds per frame
"NULL_WIND_VECTOR": [0, 0, null],  // singleton for no wind in the form: [u, v, magnitude]
"TRANSPARENT_BLACK": [255, 0, 0, 0],   // 
"FADE_FILL_STYLE" : "rgba(0, 0, 0, 0.96)",   // sets trail transparency. orig = 0.97. Higher = trail; lower = particle
//"COLOR_RAMP" : ['#178be7','#8888bd','#b28499','#cc7e78','#de765b','#ec6c42','#f55f2c','#fb4f17','#fe3705','#ff0000'],
"COLOR_RAMP" : ['#88ff90'], // orange
"COLOR_ALPHA" : 1, 
"ACCOUNT_FOR_ZOOM" : 10000,  // set to false if the number of particle doesn't depend on zoom factor -- Guillaume
"spData": 'data/RASY_curmap_200.json',
"spName": 'rasy',
"EXPONENT" : 1, 
"THRESHOLD" : 350, 
};
