var map;

var locations = [
    {lat: 52.511, lng: 13.447},
    {lat: 52.497, lng: 13.396},
    {lat: 52.517, lng: 13.394},
    {lat: 52.549, lng: 13.422},
];

var markers = [];

var contentString = 
    '<div id="content">'+
        '<div id="siteNotice">'+'</div>'+
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
        '<div id="bodyContent">'+
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
            
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
        '</div>'+
    '</div>';


/* -------------------- INITIALIZING MAP ------------------------- */

function initMap() {
    // TODO select with jquery.
    var mapDiv = document.getElementById('map');

    // Map
    map = new google.maps.Map(mapDiv, {
      center: {lat: 52.497, lng: 13.396},
      zoom: 12
    }); 
    
    // Some delay before the map has been loaded.
    window.setTimeout(drop, 3000);
}

/* -------------------- ADDING MARKERS TO THE MAP ------------------------- */

function drop() {
    for (var i = 0; i < locations.length; i++) {
        addMarkerWithTimeout(locations[i], i * 1000);
    }
}

function addMarkerWithTimeout(position, timeout) {
    window.setTimeout(function() {
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP
        });
        
        // Adding info window
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
        
        markers.push(marker);
    }, timeout);
}

