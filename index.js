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
// Example request: https://api.aerisapi.com/forecasts/42.25,-95.25?limit=14&client_id=cruQcmMBbu2IWxTzBpQxF&client_secret=ZclnNemymt1nOKIUsB37ci2U5ydvua6e6OAla33f
// more info: https://www.aerisweather.com/support/docs/api/reference/endpoints/forecasts/

// Aeris Weather Info (weather forecast)
// Same API ID & Key as above

/*
CL	Clear	            Cloud coverage is 0-7% of the sky.
FW	Fair/Mostly sunny	Cloud coverage is 7-32% of the sky.
SC	Partly cloudy	    Cloud coverage is 32-70% of the sky.
BK	Mostly Cloudy	    Cloud coverage is 70-95% of the sky.
OV	Cloudy/Overcast	    Cloud coverage is 95-100% of the sky.
*/
function getWeatherForecast(){
    const AccessID = 'cruQcmMBbu2IWxTzBpQxF';
    const SecretKey = 'ZclnNemymt1nOKIUsB37ci2U5ydvua6e6OAla33f';

    const aeris = new AerisWeather(AccessID, SecretKey)
    const loc = SearchLocation.latitude + ',' + SearchLocation.longitude

    const moonphaseRequest = aeris.api().endpoint('sunmoon/moonphases').place(loc).limit(7).get();
    const forecastRequest = aeris.api().endpoint('forecasts').place(loc).limit(7).get();
    const placesRequest = aeris.api().endpoint('places').place(loc).get();

    const aerisResults = Promise.all([moonphaseRequest, forecastRequest, placesRequest]);

    aerisResults
            .then((apiResults) => {
                const moonphaseResults = apiResults[0].data;
                const forecastsResults = apiResults[1].data;
                const placesResults = apiResults[2].data;
 
                console.log(apiResults)
                addWeatherCards(forecastsResults, moonphaseResults);
            });
}



//light pollution info
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
    document.querySelector(".animate").classList.toggle("rate-8");
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
function addWeatherCards(weatherData, moonData) {
    clearWeatherCards();
    weatherData[0].periods.reverse();
    console.log(weatherData);
    console.log(moonData);
    const weekdayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednes...',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    weatherData[0].periods.forEach(period => {
        const JSDate = new Date(period.dateTimeISO);
        const dayName = weekdayNames[JSDate.getDay()];
        const date = monthNames[JSDate.getMonth()] + " " + JSDate.getDate() + ", " + JSDate.getFullYear();
        const maxTempF = period.maxTempF || 'N/A';
        const moonPhase = getMoonPhase(moonData, JSDate);


        const template = (`
        <div class="weather-card">
            <div class="weather-top">
                <!-- Show moon phase icon, temperature -->
                <div class="weather-top-left">
                    <img title="Waxing Gibbous" class="weather-moon" src="./assets/gibbous_waxing.png"/>
                    <p class="weather-temperature">${maxTempF}&#176;F</p>
                </div>
                <!-- Show day/date, sunset time, precip chance -->
                <div class="weather-top-right">
                    <p class="weather-day">${dayName}</p>
                    <p class="weather-date">${date}</p>
                    <div title="Sunset time" class="weather-sunset"><i class="material-icons">brightness_7</i><p> 6:45 PM</p></div>
                    <div class="weather-precipitation"><i class="material-icons">opacity</i><p> 65%</p></div>
                </div>
            </div>

            <!-- Show rating bars -->
            <div class="weather-bottom">
                <div class="weather-rating cloud-rating"><div class="material-icons weather-marker marker-8" title="Cloud Cover">wb_cloudy</div></div>
                <div class="weather-rating visibility-rating"><div class="material-icons weather-marker marker-6" title="Visibility">visibility</div></div>

                <div class="weather-separator"></div>

                <!-- Overall weather rating -->
                <div class="weather-rating-title"><h3>Rating</h3><h3>8/10</h3></div>
                <div style="width: 90%" class="rating-bar weather-rating-bar">
                    <div class="rate-8">
                        <span class="animate blue"></span>
                    </div>
                </div>
            </div>
        </div>
        `);

        document.querySelector('.weather-container').insertAdjacentHTML('afterbegin', template);
    });
}

function getMoonPhase(moonPhaseData, date) {
    // TODO
}