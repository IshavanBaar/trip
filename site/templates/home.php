<?php snippet('header') ?>
    <body>
        <div class="container" role="main">
            <div class="row">
                <div id="map"</div>
            </div>
        </div>
        
        <!-- MAPS scripts -->
        <script src="https://maps.googleapis.com/maps/api/js?callback=initMap&key=AIzaSyBSRXd-KxP4MMM04uSk3kpO-72q380UBAc" 
                async defer>
        </script>

        <script>
            var map;
            
            function initMap(zoomLevel) {
                var mapDiv = document.getElementById('map');
                map = new google.maps.Map(mapDiv, {
                  center: {lat: 44.540, lng: -78.546},
                  zoom: 8
                });
            }
        </script>   
    </body>
</html>