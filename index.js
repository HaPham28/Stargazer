/********************************
*
*   Main JS file for landing page
*
*********************************/

// Caused error in autocomplete2 -> getLightPollution() not defined
//import {greet} from "client_side";

//greet()

/*********************************
 * 
 *   API Calls
 * 
*********************************/
// Aeris Weather info (moon phase)
const AccessID = 'cruQcmMBbu2IWxTzBpQxF';
const SecretKey = 'ZclnNemymt1nOKIUsB37ci2U5ydvua6e6OAla33f';
// request format: https://api.aerisapi.com//sunmoon/moonphases?limit={NUMDAYS}&client_id=cruQcmMBbu2IWxTzBpQxF&client_secret=ZclnNemymt1nOKIUsB37ci2U5ydvua6e6OAla33f
// replace {NUMDAYS} with number of days we want moon phases (should be 7 in our case..)
// more info: https://www.aerisweather.com/support/docs/api/reference/endpoints/sunmoon-moonphases/


// Aeris Weather Info (weather forecast)
// Same API ID & Key as above



//light polution info
function getLightPollution() {
    const apiKey = '45pZnF8eF3ak9ixj'
    let latitude = SearchLocation.latitude;
    let longtitude = SearchLocation.longitude;
    let url = 'https://www.lightpollutionmap.info/QueryRaster/?ql=viirs_2019&qt=point&qd=' + longtitude + ','+ latitude + '&key=' + apiKey;
    console.log(url);

    let request = new XMLHttpRequest();
    request.open('GET', url, true);    
    console.log("Request opened");
    request.onload = function() {
        console.log("Light level: " + this.response);
    }
    request.send();
}

/*********************************
 * 
 *   HTML template updates
 * 
*********************************/

/**
 * Clears all weather cards from the HTML
 */
function clearWeatherCards() {
    let cards = document.querySelector(".weather-container");
    cards.innerHTML = '';
}

/**
 * Adds weather cards to DOM based on data returned from weather query
 * @param {
 * 
 * 
 * } weatherData 
 */
function addWeatherCards(weatherData) {
    // Placeholders
    let date = new Date();
    let temperature = 77;
    let moonPhase = "New";
}