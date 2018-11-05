
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
<!--   <meta name="viewport" content="width=device-width, initial-scale=1"> -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="description" content="Visualization of habitat connectivity in the St. Lawrence Lowlands of Quebec.">
  <link rel="icon" href="../../favicon.ico">

  <title>
    <?php 
    if(isset($_GET['lang']) && $_GET['lang']=='en') {
      $lang='en';
    }else{
      $lang='fr';
    }
    if(isset($_GET['sp']) && $_GET['sp'] == 'rfg'){
      echo 'Connectivité de la rainette faux-grillon en Montérégie';
    }else{
      echo 'Connectivité dans les basses-terres du Saint-Laurent';
    }

    ?>
  </title>

  <!-- CSS -->
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:800italic,400,700' rel='stylesheet' type='text/css'>
  <link href='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.css' rel='stylesheet' />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.2/dist/jquery.fancybox.min.css" />
  <link rel="stylesheet" href="css/connect-app.css" media="all">
</head>

<body id="ff-top" data-spy="scroll">
     <!-- Navigation -->
<input type="hidden" id="lang" value="<?php echo $lang;?>">

<section id="home">
    <div id="loading" style="display:none;"> 
        <div class="spinner huge">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>  
    </div>
    <div id="map-home"> 
    </div>
    <div id="map-menu">
     <label class="container">
      <input type="checkbox" class="check" id="URAM" checked>
      <?php if($lang=='en'){
          echo 'Black bear';
        }else{
          echo 'Ours noir';
        }
      ?>
      <span class="checkmark uram"></span>
<div class="spinner spinnershow">
  <div class="double-bounce1"></div>
  <div class="double-bounce2"></div>
</div>
     </label>

      <label class="container">
      <?php if($lang=='en'){
          echo 'Red-backed salamander';
        }else{
          echo 'Salamandre rayée';
        }
      ?>

      <input type="checkbox" class="check" id="PLCI">
      <span class="checkmark plci"></span>
<div class="spinner">
  <div class="double-bounce1"></div>
  <div class="double-bounce2"></div>
</div>   
      </label>
    <label class="container">
      <input type="checkbox" class="check" id="MAAM">
      <?php if($lang=='en'){
          echo 'American marten';
        }else{
          echo 'Martre d\'Amérique';
        }
      ?>
      <span class="checkmark maam"></span>
<div class="spinner">
  <div class="double-bounce1"></div>
  <div class="double-bounce2"></div>
</div>
     </label>

     <label class="container">
      <input type="checkbox" class="check" id="BLBR">
      <?php if($lang=='en'){
          echo 'Northern short-tailed shrew';
        }else{
          echo 'Grande musaraigne';
        }
      ?>
      <span class="checkmark blbr"></span>
<div class="spinner">
  <div class="double-bounce1"></div>
  <div class="double-bounce2"></div>
</div>
     </label>

     <label class="container">
      <input type="checkbox" class="check" id="RASY">
      <?php if($lang=='en'){
          echo 'Wood frog';
        }else{
          echo 'Grenouille des bois';
        }
      ?>

      <span class="checkmark rasy"></span>
<div class="spinner">
  <div class="double-bounce1"></div>
  <div class="double-bounce2"></div>
</div>
     </label>

    </div>
</section>


  <!-- JS Libraries -->
  <script src='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.js'></script>
  <script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-hash/v0.2.1/leaflet-hash.js'></script>
  <script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.2/dist/jquery.fancybox.min.js"></script>
  <script src="js/L.CanvasOverlay.js"></script>
  <script src="js/config.js"></script>
  <script src="js/app-full.js?rand=1245194"></script>
  <script src='js/windy-leaflet.js'></script>
</body>
</html>