var map;

var locations = [
    {lat: 52.511, lng: 13.447},
    {lat: 52.497, lng: 13.396},
    {lat: 52.517, lng: 13.394},
    {lat: 52.549, lng: 13.422},
];
var markers = [];

// Initializes map.
function initMap() {
    //console.log($("#map"));
    
    // TODO select by jquery.
    var mapDiv = document.getElementById('map');

    // Map
    map = new google.maps.Map(mapDiv, {
      center: {lat: 52.497, lng: 13.396},
      zoom: 12
    }); 
    
    // Some delay before the map has been loaded.
    window.setTimeout(drop,3000);
}

// Drop with one second in between.
function drop() {
    for (var i = 0; i < locations.length; i++) {
        addMarkerWithTimeout(locations[i], i * 1000);
    }
}

// Add marker to the array and map at the same time.
function addMarkerWithTimeout(position, timeout) {
    window.setTimeout(function() {
        markers.push(new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP
        }));
    }, timeout);
}
