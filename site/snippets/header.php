<!doctype html>
<html class="no-js" lang="<?php echo $site->language() ?>">
    <!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">

        <!-- CSS -->
        <?php echo css('assets/css/bootstrap.css') ?>
        <?php echo css('assets/css/main.css') ?>

        <!-- MODERNIZER FOR OLD BROWSERS -->	
        <?php echo js('assets/js/lib/modernizr-2.8.3-respond-1.4.2.min.js') ?>
        
        <!-- Jquery, bootstrap, and main js -->
        <?php echo js(array(
            'assets/js/lib/jquery-1.12.3.js',
            'assets/js/lib/bootstrap.min.js',
            'assets/js/mapstyles/gray-white-style.js',
            'assets/js/maps.js'
        ))?>
        
        <!-- FONTS -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:700" rel="stylesheet"> 
    </head>



