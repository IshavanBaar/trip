<?php snippet('header') ?>
    <body>
        <?php snippet('blogs') ?>
        
        <div id="map"></div>
        
        <!-- MAPS scripts -->
        <?php echo js('https://maps.googleapis.com/maps/api/js?callback=initMap&key=AIzaSyBSRXd-KxP4MMM04uSk3kpO-72q380UBAc&libraries=geometry', true) ?>   
    </body>
</html>