//var directionsDisplay;
//var directionsService = new google.maps.DirectionsService();
//var map;
//var x = document.getElementById("msg");
//var initialLocation;
//
//function initialize() {
//    directionsDisplay = new google.maps.DirectionsRenderer();
//    var auckland = new google.maps.LatLng(-36.860757, 174.762215);
//    var mapOptions = {
//        zoom:7,
//        center: auckland
//    };
//    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//    directionsDisplay.setMap(map);
//
//    if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(function(position) {
//            initialLocation = position.coords.latitude+","+position.coords.longitude;
//
//            //map.setCenter(initialLocation);
//            console.log(initialLocation);
//    }, showError);
//    } else {
//        x.innerHTML = "Geolocation is not supported by this browser.";
//    }
//}
//
//
////if geolocation exists, save current position as initialLocation DONE
////on click of location, run function calcRoute
////calcRoute calculates the start (initialLocation) DONE and the end (location thats been clicked)
//
//function showError(error) {
//    switch(error.code) {
//        case error.PERMISSION_DENIED:
//            x.innerHTML = "User denied the request for Geolocation."
//            break;
//        case error.POSITION_UNAVAILABLE:
//            x.innerHTML = "Location information is unavailable."
//            break;
//        case error.TIMEOUT:
//            x.innerHTML = "The request to get user location timed out."
//            break;
//        case error.UNKNOWN_ERROR:
//            x.innerHTML = "An unknown error occurred."
//            break;
//    }
//}
//
//function calcRoute() {
//
//   /* initialize();*/
//    var end = $("#geolocation").html(); //replace this with clicked property location
//console.log(end);
////var end = document.getElementById('end').value;
//    var request = {
//        origin:initialLocation,
//        destination:end,
//        travelMode: google.maps.TravelMode.DRIVING
//    };
//
//    directionsService.route(request, function(response, status) {
//        if (status == google.maps.DirectionsStatus.OK) {
//            directionsDisplay.setDirections(response);
//        }
//    });
//}
//
//
//$("#location").click(function(){
//
//
//    calcRoute();
//})
//
//
///*
//function calcRoute() {
//    var start = document.getElementById('start').value; //needs to be value of start above, accessing that var?
//    var end = document.getElementById('end').value; //
//
//    var request = {
//        origin:start,
//        destination:end,
//        travelMode: google.maps.TravelMode.DRIVING
//    };
//
//    directionsService.route(request, function(response, status) {
//        if (status == google.maps.DirectionsStatus.OK) {
//            directionsDisplay.setDirections(response);
//        }
//    });
//}*/
//
//google.maps.event.addDomListener(window, 'load', initialize);
//
//
//    $("#menu-toggle").click(function(){
//
//        var width = $("#sidebar-wrapper").css('width');
//        if(width == '250px') {
//
//            $("#menu-toggle").animate({left: '0px'}, 400);
//
//        }
//        else {
//            $("#menu-toggle").animate({left: '250px'}, 400);
//        }
//    })
//
//
//
//
