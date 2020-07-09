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
 * Adds a random greeting to the page.

*/

const KEY = "&key=AIzaSyAAHC0kzUB8IDwJlG0DaP2lLyc_haNkNWs;"
const URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=;"

async function generateQuery(longitude,latitude){ // function wont have parameters this is just for offline testing.

	//let longitude = document.getElementById("lon").value // from the dummy html made for testing purpouses
	//let latitude = document.getElementById("lat").value

    let geoCodeRequest = URL + latitude + "," + longitude + KEY // creating the search Key to get human readable location
	let location = ""
    console.log(geoCodeRequest) //Incase we want to look at the entire JSON in browser

	await fetch(geoCodeRequest).then(response => response.json())
	.then(data => {
		
			location = data.results[0].formatted_address; // get the common name of the coordinates
		
		})

    console.log(location) //For Debugging
	const params = new URLSearchParams()

	await fetch(`/data?location=${location}`) //sending location name to servelt
    .then(response => response.text())
    .then(data => console.log(data)) // Servlet sends ACK by sending back the location it recieved.



}

generateQuery(30.03,20.8998)
generateQuery(-100.3530337,31.31643)
