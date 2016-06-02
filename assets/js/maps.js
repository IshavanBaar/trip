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
    
    // Info window
    infowindow = new google.maps.InfoWindow();
    changeInfoWindowStyle();
    
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
            infowindow.open(map);
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

function changeInfoWindowStyle() {
    /*
     * The google.maps.event.addListener() event waits for
     * the creation of the infowindow HTML structure 'domready'
     * and before the opening of the infowindow defined styles
     * are applied.
     */
    google.maps.event.addListener(infowindow, 'domready', function() {
        var iwOuter = $('.gm-style-iw');
        var iwBackground = iwOuter.prev();

        // Remove the background shadow DIV
        iwBackground.children(':nth-child(2)').css({'display' : 'none'});

        // Remove the white background DIV
        iwBackground.children(':nth-child(4)').css({'display' : 'none'});
        
        // Removes the shadow of the arrow
        iwBackground.children(':nth-child(1)').css({'display' : 'none'});

        // Removes the arrow 
        iwBackground.children(':nth-child(3)').css({'display' : 'none'});
        
        // Reposition and style close button
        var iwCloseBtn = iwOuter.next();
        iwCloseBtn.css({
          //opacity: '1', // by default the close button has an opacity of 0.7
          right: '80px', top: '3px', // button repositioning
          //border: '7px solid #48b5e9', // increasing button border and new color
          //'border-radius': '13px', // circular effect
          //'box-shadow': '0 0 5px #3990B9' // 3D effect to highlight the button
          });

        // The API automatically applies 0.7 opacity to the button after the mouseout event.
        // This function reverses this event to the desired value.
        iwCloseBtn.mouseout(function(){
          //$(this).css({opacity: '1'});
        });

    });
}
