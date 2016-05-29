var map;
var markers = [];

/* -------------------- INITIALIZING MAP ------------------------- */

function initMap() {
    
    // TODO select with jquery.
    var mapDiv = document.getElementById('map');

    // Map (center: Sumatra)
    map = new google.maps.Map(mapDiv, {
      // TODO set center dynamically 
      center: {lat: -6.226656, lng: 106.4285054},
      zoom: 3
    }); 
    
    // Some delay before the map has been loaded.
    window.setTimeout(drop, 3000);
}

/* -------------------- ADDING MARKERS TO THE MAP ------------------------- */

function drop() {
    $('.infowindow').each(function(index, value){
        // Get the HTML content with a clone
        var clone = $(this).clone().css('display','inline-block');
        var infowindowContent = $('<div/>').append(clone).html();
        
        // Search for user avatar
        var markerIcon = clone.find('.user_avatar').css('display','inline-block').attr('src');
        
        // Search for positions
        var latitude = clone.find('.lat').text();
        var longitude = clone.find('.lng').text();
        var position = new google.maps.LatLng(parseFloat(latitude),parseFloat(longitude));
        
        addMarkerWithTimeout(position, index * 1000, infowindowContent, markerIcon);
    });
}

function addMarkerWithTimeout(position, timeout, infowindowContent, markerIcon) {
    window.setTimeout(function() {
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            icon : markerIcon,
            animation: google.maps.Animation.DROP
        });
        
        // Adding info window
        var infowindow = new google.maps.InfoWindow({
            content: infowindowContent
        });
        
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
        
        markers.push(marker);
    }, timeout);
}
