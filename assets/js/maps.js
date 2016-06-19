var map;
var latlngBounds; 
var markers = new Array();
var prevPosition = {};
var curPosition = {};
var infoWindow; 

// Initialize map
function initMap() {
    // Initialize elements
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
        center: {lat: 0, lng: 0},
        zoom: 0,
        styles: mapStyle,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DEFAULT,
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        scaleControl: false,
        streetViewControl: false,
        fullscreenControl: false
    }); 
    
    // Add logo
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);
    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv);

    infoWindow = new google.maps.InfoWindow();
    latlngBounds = new google.maps.LatLngBounds();
    
    // Drop markers
    drawBlogs();
    
    // Change default style of infowindow
    changeInfoWindowStyle();
    
    // Recenter
    map.fitBounds(latlngBounds);
}

// For each blog, gets required content and draws on map
function drawBlogs() {
    $('.infowindow-content').each(function(index, value) {
        // Display 
        var infoWindowHTML = $(this).css('display','inline-block');
        
        // Get content
        var markerIcon = infoWindowHTML.find('.blog-avatar').text();
        var latitude = infoWindowHTML.find('.blog-lat').text();
        var longitude = infoWindowHTML.find('.blog-lng').text();
        
        // Extract window content and position.
        var infoWindowContent = $('<div/>').append(infoWindowHTML).html();
        var position = new google.maps.LatLng(parseFloat(latitude),parseFloat(longitude));
        latlngBounds.extend(position);
        
        // Draw marker and line on the map with a timeout
        window.setTimeout(function() {
            drawMarker(markerIcon, position, infoWindowContent);
            drawLine(position);
        }, 1500 + index * 1000);
    });
}

// Draws markers on map
function drawMarker(markerIcon, position, infowindowContent) {
    var image = {
        url: markerIcon,
        anchor: new google.maps.Point(20, 20)
    };
    
    // Add marker
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        icon : image, 
        animation: google.maps.Animation.DROP,
        zIndex: 9
    });
    
    
    markers.push(marker);

    marker.addListener('click', function() {
        // Unselect all markers
        for (var i = 0; i < markers.length; i++) {
            selectIcon(markers[i], false); 
        }
        
        // Close infowindow if already open for this marker
        if(infoWindow.marker === marker && infoWindow.getMap() !== null && typeof infoWindow.getMap() !== "undefined") {
            infoWindow.close();
        } 
        else {
            // Select this marker icon
            selectIcon(marker, true);
            
            // Adjust center (no overlap with infowindow)
            map.setCenter(marker.getPosition());

            // Set infowindow content.
            infoWindow.marker = marker;
            infoWindow.setContent(infowindowContent);
            infoWindow.open(map);
        }
    });
}

// Draws lines on map from current position position.
function drawLine(position) {
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
            }],
            map: map
        });
    }
    prevPosition = curPosition;
}

function changeInfoWindowStyle() {
    google.maps.event.addListener(infoWindow, 'domready', function() {
        // Change height TODO does not work in chrome
        changeToScreenHeight();
        
        var iwOuter = $('.gm-style-iw');
        var iwBackground = iwOuter.prev();

        // Remove the background shadow and white background
        iwBackground.children(':nth-child(2)').css({'display' : 'none'});
        iwBackground.children(':nth-child(4)').css({'display' : 'none'});
        
        // Removes the arrow and its shadow
        iwBackground.children(':nth-child(1)').css({'display' : 'none'});
        iwBackground.children(':nth-child(3)').css({'display' : 'none'});
        
        // Reposition and style close button
        var iwCloseBtn = iwOuter.next();
        iwCloseBtn.find('img').remove();
        iwCloseBtn.append("<span>CLOSE</span>");
        iwCloseBtn.css({
            width: '40px',
            right: '25px', 
            top: '13px',
            position: 'fixed',
        });
    });
    
    // On close, change marker.
    google.maps.event.addListener(infoWindow, 'closeclick', function() {
        selectIcon(infoWindow.marker, "false");
    });
}

function changeToScreenHeight() {
    var height = $(window).height(); 
    $('.infowindow-content').css({'height': '' + height + 'px'});
    
    var width = $(window).width() / 12 * 5;
    $('.infowindow-content').css({'width': '' + width + 'px'});
}

function selectIcon(marker, select) {
    var oldURL = marker.getIcon().url;
    var newURL = oldURL.replace("-selected","");
    var anchor = new google.maps.Point(20,20);
    
    if (select === true) {
        newURL = oldURL.replace(".png","") + "-selected.png";
        anchor = new google.maps.Point(30,30);
    }
    
    var newIcon = {url: newURL, anchor: anchor};
    marker.setIcon(newIcon);
}

$(window).resize(function() {
    changeToScreenHeight();
});

// Creates logo
function CenterControl(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.marginTop = '10px';
    controlUI.style.marginLeft = '10px';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'YourFontName';
    controlText.style.fontWeight = 'bold';
    controlText.style.fontSize = '30px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'WORLD TRIP';
    controlUI.appendChild(controlText);

    controlUI.addEventListener('hover', function() {
        //nothing
    });
}
