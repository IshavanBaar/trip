var map;
var latlngBounds; 
var markers = new Array();
var markersImages = new Array();
var prevPosition = {};
var curPosition = {};
var infoWindow; 
var numberOfBlogs;

// Listeners
$( document ).ready(function() {
    $( "#closeBtn" ).click(function() { closeWindow(); });
    initializeImageFullscreen();
    
   
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
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DEFAULT,
            position: google.maps.ControlPosition.BOTTOM_LEFT
        },
        scaleControl: false,
        streetViewControl: false,
        fullscreenControl: false
    }); 
    
    // Add controls and geolocations of photos.
    addControls();
    addPhotoGeos();

    infoWindow = new google.maps.InfoWindow();
    latlngBounds = new google.maps.LatLngBounds();
    numberOfBlogs = $('.infowindow-content').length;
    
    // Drop markers
    drawBlogs();
    
    // Recenter, if more than 1 blog.
    if (numberOfBlogs > 1) {
        map.fitBounds(latlngBounds);
    } else {
        map.center = markers[0].getPosition();
        map.zoom = 3;
    }
}

function addControls() {
    // Add logo
    var logoControlDiv = document.createElement('div');
    logoControlDiv.index = 1;
    var logoControl = new LogoControl(logoControlDiv, map);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(logoControlDiv);
    
    // Add blog list
    var blogListControlDiv = document.createElement('div');
    var blogListControl = new BlogListControl(blogListControlDiv, map);
    blogListControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(blogListControlDiv);
}

function addPhotoGeos() {
    // Fill it
    $('.geolocation-content').each(function(index, value) {
        var listItem = $(this).children(":first");
        var imageURL = listItem.attr("imgloc");
        var imageLat = listItem.children(":first")[0].innerHTML;
        var imageLoc = listItem.children(":first").next()[0].innerHTML;
        var markerPosition = new google.maps.LatLng(parseFloat(imageLat),parseFloat(imageLoc));
        
        var image = {
            url: "../images/cross-red.png",
            anchor: new google.maps.Point(10, 10)
        };

        // Add marker
        var marker = new google.maps.Marker({
            position: markerPosition,
            map: map,
            icon : image, 
            animation: google.maps.Animation.BOUNCE,
            zIndex: 9
        });

        marker.imageURL = imageURL;
        marker.setVisible(false);
        
        markersImages.push(marker);
    });
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
        
        if (numberOfBlogs === 1) {
            drawMarker(markerIcon, markerUID, markerPosition, infoWindowContent);
        }  else {
            // Draw marker and line on the map with a timeout
            window.setTimeout(function() {
                $.when(drawMarker(markerIcon, markerUID, markerPosition, infoWindowContent))
                    .then(drawLine(markerPosition));
            }, 1500 + index * 1000);
        }
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
    
    $.when($('#iWindow').show("fast")).then(initializeImageFullscreen());
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
function LogoControl(controlDiv, map) {
    var controlUI = document.createElement('div');
    controlUI.className += 'controlUI';
    controlDiv.appendChild(controlUI);
    
    var logo = document.createElement('div');
    logo.id = 'logo';
    logo.innerHTML = 'WORLD TRIP';
    
    controlUI.appendChild(logo);
}

// Creates pulldown list of blogs
function BlogListControl(controlDiv, map) {
    var controlUI = document.createElement('div');
    controlUI.className += 'controlUI';
    controlDiv.appendChild(controlUI);

    var pullDown = document.createElement('div');
    pullDown.id = 'pullDown';
    pullDown.innerHTML = '\u25B6 See all blogs';
    controlUI.appendChild(pullDown);
    
    var list = createBlogList();
    controlUI.appendChild(list);
    
    // On click, toggle list
    pullDown.addEventListener('click', function() {
        if (pullDown.innerHTML === '\u25B6 See all blogs') {
            pullDown.innerHTML = '\u25BC Hide all blogs';
            list.style.display = 'block';
        } else {
            pullDown.innerHTML = '\u25B6 See all blogs';
            list.style.display = 'none';
        }
    });
}

function createBlogList() {
    // Create list
    var list = document.createElement('ul');
    list.id = 'bloglist';
    
    // Fill it
    $('.bloglist-content').each(function(index, value) {
        var blogListItem = $(this).html();
        list.insertAdjacentHTML('afterbegin', blogListItem);
    });
    return list;
}

function initializeImageFullscreen() {
    $("img[src*='trip/content/blogs']").each(function(index, value) {
        var image =  $(this);

        if (!$(this).parent().is("a")) {
            var source = image.attr('src');

            var anchor = document.createElement('a');
            anchor.href = source;
            anchor.dataLightbox = "example-1"; 
            
            // Create data lightbox full image view.
            var dataLightbox = document.createAttribute("data-lightbox");       
            dataLightbox.value = index; 
            anchor.setAttributeNode(dataLightbox); 
            
            // Include caption if there.
            if ($(this).next().is("figcaption")) {  
                var dataTitle = document.createAttribute("data-title");
                dataTitle.value = $(this).next()[0].innerHTML; 
                anchor.setAttributeNode(dataTitle); 
            }
            
            $(this).wrap(anchor.outerHTML);
            
            // TODO on hover, show right marker.
            $(this).on("hover", function(e){
                console.log("here");
                /*var url = $(this).attr('src');

                for (var i = 0; i < markersImages.length; i++) {
                    if(markersImages[i].imageURL == url) {
                        markersImages[i].setVisible(true);
                    }
                }*/
            });
        }
    });
}
