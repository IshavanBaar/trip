<?php snippet('header') ?>
    <body>
        <div class="container" role="main">
            <div class="row">
                <div id="map"</div>
            </div>
        </div>
        
        <!-- MAPS scripts -->
        <?php echo js('https://maps.googleapis.com/maps/api/js?callback=initMap&key=AIzaSyBSRXd-KxP4MMM04uSk3kpO-72q380UBAc', true) ?>
        <?php echo js('assets/js/maps.js') ?>
    </body>
</html>