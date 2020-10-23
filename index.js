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
 
                // document.getElementById('location').innerHTML = formatPlaceName(placesResults);
                console.log(apiResults)
                // renderForecastDays(forecastsResults[0].periods);
            });

    // function formatPlaceName(obj) {
    //     const stateOrCountry = (obj.place.state) ? obj.place.state : obj.place.country;
    //     return `${obj.place.name}, ${stateOrCountry}`;
    // }
     
    function renderForecastDays(periods) {
        periods.reverse();

        const weekdayNames = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];

        periods.forEach(period => {
            const dayName = weekdayNames[new Date(period.dateTimeISO).getDay()];
            const iconSrc = `https://cdn.aerisapi.com/wxblox/icons/${period.icon || 'na.png'}`;
            const maxTempF = period.maxTempF || 'N/A';

            console.log("Temperature: " + maxTempF
            );
            const minTempF = period.minTempF || 'N/A';
            const weather = period.weatherPrimary || 'N/A';

            const template = (`
            <div class="card" style="width: 20%">
                <div class="card-body">
                    <h4 class="card-title text-center">${dayName}</h4>
                    <p><img class="card-img mx-auto d-block" style="max-width: 100px;" src="${iconSrc}"></p>
                    <h6 class="card-title text-center">${weather}</h6>
                    <p class="card-text text-center">High: ${maxTempF} Low: ${minTempF}</p>
                </div>
            </div>
        `);

            document.getElementById('forecast-items').insertAdjacentHTML('afterbegin', template);
        });
    }

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
function addWeatherCards(weatherData) {
    //Placeholder
}