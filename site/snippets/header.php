<!doctype html>
<html class="no-js" lang="<?php echo $site->language() ?>">
    <!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">

        <!-- CSS -->
        <?php echo css(array(
            'assets/css/bootstrap.css',
            'assets/css/main.css',
            'assets/css/lightbox.css'
        ))?>
        
        <!-- Modernizer, Jquery, bootstrap, maps style, and main js -->
        <?php echo js(array(
            'assets/js/lib/modernizr-2.8.3-respond-1.4.2.min.js',
            'assets/js/lib/jquery-1.12.3.js',
            'assets/js/lib/lightbox.js',
            'assets/js/lib/bootstrap.min.js',
            'assets/js/mapstyles/gray-blue-style.js',
            'assets/js/maps.js'
        ))?>
        
        <!-- FONT -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:700" rel="stylesheet"> 
    </head>



