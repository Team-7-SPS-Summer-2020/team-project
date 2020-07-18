// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 To fetch & parse news articles from the NewsAPI
    @param location name of the place we are asking the NewsApi about.
 */

async function fetchNews(location) {
    return await fetch(`/fetchNews?location=${location}`)
        .then(response => response.json())
}

/**
 * Initializes the map with custom style in the styledMapType json. Adds
 * event listener to add a new marker on click
 */
function createMap() {
    var styledMapType = new google.maps.StyledMapType(
      [
        {
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#ebe3cd"
            }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#523735"
            }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
            {
                "color": "#f5f1e6"
            }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
            {
                "color": "#c9b2a6"
            }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "geometry.stroke",
            "stylers": [
            {
                "color": "#dcd2be"
            }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#ae9e90"
            }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#dfd2ae"
            }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#dfd2ae"
            }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#93817c"
            }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
            {
                "color": "#a5b076"
            }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#447530"
            }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#f5f1e6"
            }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#fdfcf8"
            }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#f8c967"
            }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
            {
                "color": "#e9bc62"
            }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#e98d58"
            }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
            {
                "color": "#db8555"
            }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#806b63"
            }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#dfd2ae"
            }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#8f7d77"
            }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.stroke",
            "stylers": [
            {
                "color": "#ebe3cd"
            }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#dfd2ae"
            }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
            {
                "color": "#b9d3c2"
            }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#92998d"
            }
            ]
        }
      ],
      {name: 'Map'}
    );

    const map = new google.maps.Map(
        document.getElementById('map'),{
            center: {lat: 35.578, lng: 9.0432}, 
            zoom: 3,
            mapTypeControlOptions: {
                mapTypeIds: ['satellite', 'styled_map']
            }
    });

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng, map);
    });
}

/*
* Creates marker at lat and long coordinates of the click. Adds event listener
* to markers to display info when clicked, and to delete the marker when double
* clicked. Retrieves list of articles from server, and uses it in call to 
* getInfoWindow(). 
*
* @param location - the latitude and longitude values at which to place the marker
* @param map - the map object that markers are being placed on
*/
async function placeMarker(location, map) {
    let marker = new google.maps.Marker({
        position: location, 
        map: map,
        animation: google.maps.Animation.DROP,
    });

    let locationName = await getCoordinatesName(marker.getPosition().lng(),marker.getPosition().lat());
    let info = await fetchNews(locationName);
    let infoWindow = new google.maps.InfoWindow({
        content: getArticleList(info['articles'], locationName),
        maxWidth:400,
        maxHeight:600
    });

    google.maps.event.addListener(marker, 'click', function(event) {
        infoWindow.open(map, marker);
    });
    google.maps.event.addListener(marker, 'dblclick', function(event) {
        removeMarker(marker, map);
    });
    
    map.panTo(location);
    infoWindow.open(map, marker);
}


function removeMarker(marker){
    marker.setMap(null);
    marker = null;
}

/*
* Returns HTML templated list of article links as a string
*
* @param articles - List of jsons representing articles
* @param place - Locations articles are about as a string
*/
function getArticleList(articles, place){
    var view = {
        place: place,
        articles: articles
    };
    var template = document.getElementById('template').innerHTML;
    var rendered = Mustache.render(template, view);
    document.getElementById('articleList').innerHTML = rendered;

    return document.getElementById('articleList').innerHTML;
}


/*
    A function that takes a long anf lat value and returns a human readable location
    @param longitude is the long value of the marker
    @param latitude is the lat value of the marker
    @returns location which is the human readable address of the longitude and latitude vals if no human readable address
    found it will return an empty string

 */

const KEY = "&key=AIzaSyAAHC0kzUB8IDwJlG0DaP2lLyc_haNkNWs";
const URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";

/**

    @todo Figure out how to go one tier more specific and include a city name (if applicable) along with the country name
    @todo Potentially figure out how to include unaddresses places like Moracco or Pacific Ocean
    
 */

async function getCoordinatesName(longitude,latitude){ // function wont have parameters this is just for offline testing.

    let location = ""
    let geoCodeRequest = URL + latitude + "," + longitude + KEY // creating the search Key to get human readable location
    console.log(geoCodeRequest) //Incase we want to look at the entire JSON in browser
    

	await fetch(geoCodeRequest).then(response => response.json())
	.then(data => {
		
            if(data.results.length != 0){ // Some countries and places dont have addresses. Like the Pacific Ocean or the Western Saharaa in Morocco

			addressPieces = data.results[0].formatted_address.split(','); // splits response into array. End of array is usually counntry name.
            index = addressPieces.length-1;

            while(!isNaN(addressPieces[index]) && index >= 0)
                index--;

            if(index > -1) // there is a human readable country name
                location = addressPieces[index];
            else // no human readable result. Better to return empty String
                console.log("Location only had a num address")
            
            }
		

    })
    console.log(location) //For Debugging

	results = await fetch(`/data?location=${location}`) //sending location name to servlet
    .then(response => response.text())
    .then(data => console.log(data)) // Servlet sends ACK by sending back the location it recieved.

    return location;

}
