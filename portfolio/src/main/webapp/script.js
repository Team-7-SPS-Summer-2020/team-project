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
    await fetch(`/fetchNews?location=${location}`)
        .then(response => response.json())
        .then(articles => {
            
            const newsContainer = document.getElementById('news-container');
            if(articles.status !== 'ok'){
                newsContainer.innerText = "We were unable to find anything on this";
            }else{   
                console.log(articles.articles);
                newsContainer.innerText = articles.articles[0].title;
            }
        })
    
}

/**
    A function that takes a long anf lat value and returns a human readable location
    @param longitude is the long value of the marker
    @param latitude is the lat value of the marker
    @returns location which is the human readable address of the longitude and latitude vals

 */
const KEY = "&key=AIzaSyAAHC0kzUB8IDwJlG0DaP2lLyc_haNkNWs";
const URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";

async function getCoordinatesName(longitude,latitude){ // function wont have parameters this is just for offline testing.

    let location = ""
    let geoCodeRequest = URL + latitude + "," + longitude + KEY // creating the search Key to get human readable location
    console.log(geoCodeRequest) //Incase we want to look at the entire JSON in browser
    

	await fetch(geoCodeRequest).then(response => response.json())
	.then(data => {
		
			location = data.results[0].formatted_address; // get the common name of the coordinates
		

    })
    console.log(location) //For Debugging

	results = await fetch(`/data?location=${location}`) //sending location name to servlet
    .then(response => response.text())
    .then(data => console.log(data)) // Servlet sends ACK by sending back the location it recieved.

    return location;

}
