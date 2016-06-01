/* -------------------- INITIALIZING VARIABLES & STYLE ----------- */
var map;
var markers = [];
var prevPosition = {};
var curPosition = {};
var infowindow; 

// Style from https://snazzymaps.com/style/8409/white-and-black
var mapStyle = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"weight":"2.05"},{"color":"#ffffff"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"on"},{"color":"#6f6f6f"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"weight":"1"}]},{"featureType":"administrative.country","elementType":"labels.text.stroke","stylers":[{"weight":"0.01"}]},{"featureType":"administrative.province","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":17},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]}];
 

/* -------------------- INITIALIZING MAP ------------------------- */

function initMap() {
    
    // TODO select with jquery.
    var mapDiv = document.getElementById('map');

    // Map
    map = new google.maps.Map(mapDiv, {
      // TODO set center dynamically 
      center: {lat: -16.4472837, lng: 145.8173498}, // Great Barrier Reef
      zoom: 4,
      styles: mapStyle
    }); 
    

    // Sizes of infowindow.
    var width = $('#infowindow_measure').width();
    var height = $('#map').height() - 500; // TODO find better height
    
    // Info window
    infowindow = new google.maps.InfoWindow({
            width : width,    
            height: height,
            pixelOffset: new google.maps.Size(width/2, height/2),
            zIndex: 1
    });
    
    // Some delay before the map has been loaded.
    window.setTimeout(drop, 3000);
}

/* -------------------- ADDING MARKERS TO THE MAP ------------------ */

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
        
        // Add marker
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            icon : markerIcon, 
            animation: google.maps.Animation.DROP
        });
        
        // Add info window on click event
        marker.addListener('click', function() {
            infowindow.setContent(infowindowContent);
            infowindow.open(map, marker);
        });
  
        markers.push(marker);
        
        // Add line segment
        curPosition = position;
        
        // TODO make it also appear gradually
        if (!$.isEmptyObject(prevPosition)) {
            var lineSymbol = {
              path: 'M 0,-1 0,1',
              geodesic: true,
              strokeColor: '#FF0000',
              strokeOpacity: 1,
              scale: 4
            };
            
            var route = new google.maps.Polyline({
                path: [prevPosition, curPosition],
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 0,
                
                icons: [{
                    icon: lineSymbol,
                    offset: '0',
                    repeat: '20px'
                }]
            });
            route.setMap(map);
        }
        prevPosition = curPosition;

    }, timeout);
}
