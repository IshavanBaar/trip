var map;
var latlngBounds; 
var markers = new Array();
var prevPosition = {};
var curPosition = {};
var infoWindow; 

// Listeners
$( document ).ready(function() {
    $( "#closeBtn" ).click(function() { closeWindow(); });
});

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
    
    // Recenter
    map.fitBounds(latlngBounds);
}

// For each blog, gets required content and draws on map
function drawBlogs() {
    $('.infowindow-content').each(function(index, value) {
        // Get content 
        var markerUID = $(this).attr("uid");
        var markerIcon = $(this).attr("avatar");
        var latitude = $(this).attr("lat");
        var longitude = $(this).attr("lng");
        var markerPosition = new google.maps.LatLng(parseFloat(latitude),parseFloat(longitude));
        
        latlngBounds.extend(markerPosition);
        
        // Display
        var infoWindowHTML = $(this).css('display','inline-block');
        var infoWindowContent = $('<div/>').append(infoWindowHTML).html();

        // Draw marker and line on the map with a timeout
        window.setTimeout(function() {
            $.when(drawMarker(markerIcon, markerUID, markerPosition, infoWindowContent))
                .then(drawLine(markerPosition));
        }, 1500 + index * 1000);
    });
}

// Draws markers on map
function drawMarker(markerIcon, markerUID, markerPosition, infoWindowContent) {
    var image = {
        url: markerIcon,
        anchor: new google.maps.Point(20, 20)
    };
    
    // Add marker
    var marker = new google.maps.Marker({
        position: markerPosition,
        map: map,
        icon : image, 
        animation: google.maps.Animation.DROP,
        zIndex: 9
    });
    
    marker.uid = markerUID;
    marker.infoWindow = infoWindowContent;
    markers.push(marker);

    marker.addListener('click', function() {
        // Unselect all markers
        for (var i = 0; i < markers.length; i++) {
            selectIcon(markers[i], false); 
        }
        
        // Close infowindow if already open for this marker
        if(infoWindow.marker === marker && $('#iWindow').is(':visible')) {
		  $('#iWindow').toggle("fast");
		  $('#closeBtn').toggle("slow");
        } 
        else {
            openWindow(marker);
        }
    });
}

function openWindow(marker) {
    // Select this marker icon
    selectIcon(marker, true);

    // Adjust center (no overlap with infowindow)
    map.panTo(marker.getPosition());

    // Set infowindow marker
    infoWindow.marker = marker;
    $('#iContent').empty();
    $('#iContent').append(marker.infoWindow);
    $('#iWindow').show("fast");
    $('#closeBtn').show("slow");
}

function openPrevNextWindow(element) {
    closeWindow();
    
    var uid = element.getAttribute("uid");
    for (var i = 0; i < markers.length; i++) {
        if(markers[i].uid === uid) {
            openWindow(markers[i]);
        }
    }
}

// Close window and unselect markers
function closeWindow() {
    for (var i = 0; i < markers.length; i++) {
        selectIcon(markers[i], false); 
    }

    $('#iWindow').toggle("fast");
    $('#closeBtn').toggle("slow");
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
    controlText.id = 'controlText';
    controlText.style.color = '#ff0000';
    controlText.style.fontFamily = 'YourFontName';
    controlText.style.fontWeight = 'bold';
    controlText.style.fontSize = '30px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'WORLD TRIP';
    controlUI.appendChild(controlText);
    
    // For now, become red.
    /*controlUI.addEventListener('mouseover', function() {
        controlUI.firstElementChild.style.color = '#ff0000';
    });
    controlUI.addEventListener('mouseout', function() {
        controlUI.firstElementChild.style.color = '#000000';
    });*/
}
