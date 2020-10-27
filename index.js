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
 
                //console.log(apiResults)
                addWeatherCards(forecastsResults, moonphaseResults);
            });
}

// Upcoming Astronomical events
var events = [{"date":"10/21/2020", "event_name":"Orionid Meteor Shower", "event_description":"The Orionids are the second meteor shower in October. The shower peaks on October 21-22 but usually remains active between October 2 and November 7. The best time to see these shooting stars is just after midnight and before the Sun rises.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/orionid.html"}, 
{"date":"10/31/2020", "event_name":"Blue Moon", "event_description":"October has two Full Moons, which makes this Full Moon a Blue Moon. This Blue Moon is also a Micro Full Moon.", "event_link":"https://www.timeanddate.com/astronomy/moon/blue-moon.html"},
{"date":"11/15/2020", "event_name":"Super New Moon", "event_description":"This New Moon takes place very close to its perigee—the point on its orbit closest to the Earth.", "event_link":"https://www.timeanddate.com/astronomy/moon/super-full-moon.html"},
{"date":"11/17/2020", "event_name":"Leonid Meteor Shower", "event_description":"The Leonids' shooting stars are visible between November 6 and 30, and peak on the night of November 17 and early morning of November 18, 2020 with up to 15 meteors per hour.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/leonids.html"},
{"date":"11/30/2020", "event_name":"Beaver Moon", "event_description":"November's Full Moon is called a Beaver Moon, after beavers that build their dams during this time of the year.", "event_link":"https://www.timeanddate.com/astronomy/moon/beaver.html"},
{"date":"12/13/2020", "event_name":"Geminid Meteors", "event_description":"One of the best meteor showers of the year, the Geminids peak on the night of December 13 and early morning hours of December 14, 2020, but will be visible from December 4-16.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/geminids.html"},
{"date":"12/14/2020", "event_name":"Total Solar Eclipse", "event_description":"This total solar eclipse will be visible from Chile and some parts of Argentina in the afternoon.", "event_link":"https://www.timeanddate.com/eclipse/solar/2020-december-14"},
{"date":"12/21/2020", "event_name":"December Solstice", "event_description":"The December solstice will take place at 10:02 UTC. Also known as the winter solstice, it is the shortest day of the year in the Northern Hemisphere. In the Southern Hemisphere, it is the longest day of the year and is called the summer solstice.", "event_link":"https://www.timeanddate.com/calendar/december-solstice.html"},
{"date":"12/22/2020", "event_name":"Ursid Meteors", "event_description":"Catch the shooting stars of the last major meteor shower of the year, the Ursids, when it peaks between the night of December 21 and 22, 2020.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/ursids.html"},
{"date":"12/30/2020", "event_name":"Cold Moon", "event_description":"The year's final Full Moon in December is called a Cold Moon because of low temperatures in most locations in the Northern Hemisphere.", "event_link":"https://www.timeanddate.com/astronomy/moon/cold.html"},
{"date":"01/02/2021", "event_name":"Earth's Perihelion", "event_description":"At 13:50 UTC, the Earth will reach its perihelion—the point on its orbit that is closest to the Sun.", "event_link":"https://www.timeanddate.com/astronomy/perihelion-aphelion-solstice.html"},
{"date":"01/03/2021", "event_name":"Quadrantids Meteors", "event_description":"The first major meteor shower of 2021, the Quadrantids, peaks on the night of January 3 and early morning hours of January 4.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/quadrantids.html"},
{"date":"01/13/2021", "event_name":"New Moon", "event_description":"The Moon will come between the Sun and the Earth, and the illuminated side of the Moon will face away from the Earth. A New Moon is almost impossible to see, even with a telescope.", "event_link":"https://www.timeanddate.com/astronomy/moon/new-moon.html"},
{"date":"01/28/2021", "event_name":"Wolf Moon", "event_description":"The first Full Moon of the year is colloquially known as Wolf Moon in many northern cultures. A Full Moon occurs when the Sun and the Moon are on opposite sides of the Earth.", "event_link":"https://www.timeanddate.com/astronomy/moon/wolf.html"},
{"date":"02/11/2021", "event_name":"New Moon", "event_description":"Take advantage of the New Moon to check out the night sky, weather permitting, of course.", "event_link":"https://www.timeanddate.com/astronomy/moon/new-moon.html"},
{"date":"02/27/2021", "event_name":"Snow Moon", "event_description":"February's Full Moon is also known as Snow Moon in many Northern Hemisphere cultures.", "event_link":"https://www.timeanddate.com/astronomy/moon/snow.html"},
{"date":"03/13/2021", "event_name":"New Moon", "event_description":"Dark nights a few days before and after the Moon reaches its New Moon phase at 10:21 UTC on March 13 are the best nights to do some night sky watching.", "event_link":"https://www.timeanddate.com/astronomy/moon/new-moon.html"},
{"date":"03/20/2021", "event_name":"March Equinox", "event_description":"The March equinox is the first day of spring in the Northern Hemisphere and the start of fall in the Southern Hemisphere by astronomical definitions.", "event_link":"https://www.timeanddate.com/calendar/march-equinox.html"},
{"date":"03/28/2021", "event_name":"Worm Moon", "event_description":"March 2021's Super Full Moon is also the Worm Moon, named after earthworms that tend to appear around in this time in many locations in the Northern Hemisphere.", "event_link":"https://www.timeanddate.com/astronomy/moon/worm.html"},
{"date":"04/12/2021", "event_name":"New Moon", "event_description":"Take advantage of a dark night sky to see the planets and Earthshine a few days before and after the New Moon.", "event_link":"https://www.timeanddate.com/astronomy/moon/new-moon.html"},
{"date":"04/22/2021", "event_name":"Lyrid Meteor Shower", "event_description":"The Lyrid meteor shower is expected to peak around April 22 and 23, depending on your location.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/lyrids.html"},
{"date":"04/27/2021", "event_name":"Pink Moon", "event_description":"The Full Moon in April is sometimes known as the Pink Moon because of phlox, a pink flower, that blooms around this time in the North.", "event_link":"https://www.timeanddate.com/astronomy/moon/pink.html"},
{"date":"04/27/2021", "event_name":"Super Full Moon", "event_description":"April's Pink Full Moon is also a Super Moon. Because the Full Moon takes place when the Moon is at its perigee, it will look a little larger than a usual Full Moon.", "event_link":"https://www.timeanddate.com/astronomy/moon/super-full-moon.html"},
{"date":"05/5/2021", "event_name":"Eta Aquarid Meteors", "event_description":"Use our handy Interactive Meteor Shower Sky Map to increase your chances of seeing shooting stars from the Eta Aquarids.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/eta-aquarids.html"}
];

function getNextAstronomicalEvent(){
    for (i = 0; i < events.length; i++){
        var curEvent = events[i];
        var curDate = new Date(curEvent["date"]);
        var todaysDate = new Date();
        if (curDate > todaysDate){
            return curEvent;
        }
    }
    return null;
}

//light pollution info
function getLightPollution(lat, long) {
    const apiKey = '45pZnF8eF3ak9ixj'
    let url = 'https://www.lightpollutionmap.info/QueryRaster/?ql=viirs_2019&qt=point&qd=' + long + ','+ lat + '&key=' + apiKey;
    // console.log(url);
    let request = new XMLHttpRequest();
    request.open('GET', url, true);    
    // console.log("Request opened");
    request.onload = function() {
         console.log("Light level: " + this.response);
    }
    request.send();
    document.querySelector(".animate").classList.toggle("rate-8");
    return this.response;
}

function getConstellationData() {
    const constellationNames = [
        "Aquarius",
        "Aquila",
        "Aries",
        "Canis Major",
        "Cassiopeia",
        "Cygnus",
        "Gemini",
        "Leo",
        "Lyra",
        "Orion",
        "Pisces",
        "Scorpius",
        "Taurus",
        "Ursa Major",
        "Ursa Minor"
    ];

    let visibleConstellations = [];
    for(constellation in constellationNames) {
        let url = 'https://www.strudel.org.uk/lookUP/json/?name=' + constellationNames[constellation].replace(' ', '+');
        let request = new XMLHttpRequest();
        request.open('GET', url, true);    
        request.onload = function() {
            //console.log(this.response);
            if(constellationIsVisible(this.response)) {
                visibleConstellations.push(this.response);
            }
        }
        request.send();
    }

    //TODO: Show constellations in UI
}

// TODO
function constellationIsVisible(constellationData) {
    return false;
}

// get 20 most relevant nearby parks (as ranked by google)
function getNearbyParks() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: SearchLocation.latitude, lng: SearchLocation.longitude },
        zoom: 15,
    });
    
    let request = {
        location: new google.maps.LatLng(SearchLocation.latitude, SearchLocation.longitude),
        radius: '50000',
        type: ['park']
    };
    console.log("long lat" + SearchLocation.latitude + ", " + SearchLocation.longitude);
    let service = new google.maps.places.PlacesService(map);
    let Parks = service.nearbySearch(request, function(results, status) {
        console.log(results);
    });

    // Get top 10 of parks (the first 10 parks in the list)
    let top10Parks = Parks.slice(0,10);

    // console.log("lpt " + a_LightPollution);
    

    // add light pollution element to each Park
    top10Parks.forEach( park => {
        let lightPollution = getLightPollution(park.geometry.location.lat() , park.geometry.location.lng() );
        park.myMap.put("Light_Polution" , lightPollution);
    });

    // sort the list of Parks by light pollution level
    top10Parks.sort(function(a,b) 
    {
        // let a_LightPollution = getLightPollution(a.geometry.location.lat() , a.geometry.location.lng() );
        // let b_LightPollution = getLightPollution(b.geometry.location.lat() , b.geometry.location.lng() );
        // console.log("lpt " +  a_LightPollution + " " + b_LightPollution);
        return a.Light_Pollution - b.Light_Pollution;
    });

    console.log(top10Parks);


}

/*********************************
 * 
 *   HTML template updates
 * 
*********************************/

const moonPhases = {
    'NEW_MOON': 0,
    'WAXING_CRESCENT': 1,
    'FIRST_QUARTER': 2,
    'WAXING_GIBBOUS': 3,
    'FULL_MOON': 4,
    'WANING_GIBBOUS': 5,
    'THIRD_QUARTER': 6,
    'WANING_CRESCENT': 7,
};

/**
 * Clears all weather cards from the HTML
 */
function clearWeatherCards() {
    let cards = document.querySelector(".weather-container");
    cards.innerHTML = '';
}

/**
 * Adds weather cards to DOM based on data returned from weather query
 */
function addWeatherCards(weatherData, moonData) {
    clearWeatherCards();
    weatherData[0].periods.reverse();
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
        const JSSunset = new Date(period.sunsetISO);
        const dayName = weekdayNames[JSDate.getDay()];
        const date = monthNames[JSDate.getMonth()] + " " + JSDate.getDate() + ", " + JSDate.getFullYear();
        const maxTempF = period.maxTempF || 'N/A';
        const sunset = (JSSunset.getHours()) % 12 + ":" + (JSSunset.getMinutes() >= 10 ? JSSunset.getMinutes() : '0' + JSSunset.getMinutes());
        const sunsetSuffix = JSSunset.getHours() > 12 ? 'PM' : 'AM'; // Probably safe to say always PM, but just to be sure
        const precip = period.pop || 'N/A';

        // Get moonphase picture/title
        const moonPhase = getMoonPhase(moonData, JSDate);
        let moonPhaseImage = './assets/';
        let moonPhaseTitle = 'N/A';
        switch(moonPhase) {
            case moonPhases.NEW_MOON:
                moonPhaseImage += 'new.png';
                moonPhaseTitle = "New Moon";
                break;
            case moonPhases.WAXING_CRESCENT:
                moonPhaseImage += 'crescent_waxing.png';
                moonPhaseTitle = "Waxing Crescent";
                break;
            case moonPhases.FIRST_QUARTER:
                moonPhaseImage += 'quarter_waxing.png';
                moonPhaseTitle = "First Quarter";
                break;
            case moonPhases.WAXING_GIBBOUS:
                moonPhaseImage += 'gibbous_waxing.png';
                moonPhaseTitle = "Waxing Gibbous";
                break;
            case moonPhases.FULL_MOON:
                moonPhaseImage += 'full.png';
                moonPhaseTitle = "Full Moon";
                break;
            case moonPhases.WANING_GIBBOUS:
                moonPhaseImage += 'gibbous_waning.png';
                moonPhaseTitle = "Waning Gibbous";
                break;
            case moonPhases.THIRD_QUARTER:
                moonPhaseImage += 'quarter_waning.png';
                moonPhaseTitle = "Third Quarter";
                break;
            case moonPhases.WANING_CRESCENT:
                moonPhaseImage += 'crescent_waning.png';
                moonPhaseTitle = "Waning Crescent";
                break;
        }

        // Get cloud and visibility rating
        // CL	Clear	            Cloud coverage is 0-7% of the sky.
        // FW	Fair/Mostly sunny	Cloud coverage is 7-32% of the sky.
        // SC	Partly cloudy	    Cloud coverage is 32-70% of the sky.
        // BK	Mostly Cloudy	    Cloud coverage is 70-95% of the sky.
        // OV	Cloudy/Overcast	    Cloud coverage is 95-100% of the sky.
        const cloudsCoded = period.cloudsCoded;
        let cloudRatingClass = 'marker-';
        switch(cloudsCoded) {
            case 'CL':
                cloudRatingClass += '10'
                break;
            case 'FW':
                cloudRatingClass += '8'
                break;
            case 'SC':
                cloudRatingClass += '6'
                break;
            case 'BK':
                cloudRatingClass += '4'
                break;
            case 'OV':
                cloudRatingClass += '1'
                break;
        }

        const visibilityKM = period.visibilityKM;
        let visibilityRatingClass = 'marker-';
        if(visibilityKM > 20)
            visibilityRatingClass += '10';
        else if(visibilityKM > 15)
            visibilityRatingClass += '9';
        else if(visibilityKM > 12)
            visibilityRatingClass += '7';
        else if(visibilityKM > 10)
            visibilityRatingClass += '6';
        else if(visibilityKM > 5)
            visibilityRatingClass += '4';
        else if(visibilityKM > 2)
            visibilityRatingClass += '3';
        else
            visibilityRatingClass += '1';
        
        // Get overall rating
        const overallRating = getOverallWeatherRating(moonPhase, cloudRatingClass, visibilityRatingClass);
        const overallRatingClass = 'rate-' + Math.max(1, overallRating);

        const template = (`
        <div class="weather-card">
            <div class="weather-top">
                <!-- Show moon phase icon, temperature -->
                <div class="weather-top-left">
                    <img title="${moonPhaseTitle}" class="weather-moon" src="${moonPhaseImage}"/>
                    <p class="weather-temperature">${maxTempF}&#176;F</p>
                </div>
                <!-- Show day/date, sunset time, precip chance -->
                <div class="weather-top-right">
                    <p class="weather-day">${dayName}</p>
                    <p class="weather-date">${date}</p>
                    <div title="Sunset time" class="weather-sunset"><i class="material-icons">brightness_7</i><p> ${sunset} ${sunsetSuffix}</p></div>
                    <div class="weather-precipitation"><i class="material-icons">opacity</i><p> ${precip}%</p></div>
                </div>
            </div>

            <!-- Show rating bars -->
            <div class="weather-bottom">
                <div class="weather-rating cloud-rating"><div class="material-icons weather-marker ${cloudRatingClass}" title="Cloud Cover">wb_cloudy</div></div>
                <div class="weather-rating visibility-rating"><div class="material-icons weather-marker ${visibilityRatingClass}" title="Visibility">visibility</div></div>

                <div class="weather-separator"></div>

                <!-- Overall weather rating -->
                <div class="weather-rating-title"><h3>Rating</h3><h3>${overallRating}/10</h3></div>
                <div style="width: 90%" class="rating-bar weather-rating-bar">
                    <div class="${overallRatingClass}">
                        <span class="animate blue"></span>
                    </div>
                </div>
            </div>
        </div>
        `);

        document.querySelector('.weather-container').insertAdjacentHTML('afterbegin', template);
    });
}

/**
 * 
 * Returned moon phase codes:
 *  0 - New moon
 *  1 - Waxing crescent
 *  2 - First Quarter
 *  3 - Waxing gibbous
 *  4 - Full moon
 *  5 - Waning gibbous
 *  6 - Third quarter
 *  7 - Waning crescent
 * 
 * @param {*} moonPhaseData 
 * @param {*} date 
 * @return {number} phaseCode
 */
function getMoonPhase(moonPhaseData, date) {
    /*
        Takes ~ 1 week for each quarter, so between 2 - 4 days after start of quarter, we use intermediate phases
    */
    const dayS = 60 * 60 * 24;

    let PassedDateMs = date.getTime() / 1000;
    for(let i = 0; i < moonPhaseData.length - 1; i++) {           
        let phaseDateMs = moonPhaseData[i].timestamp;
        let timeDifference = phaseDateMs - PassedDateMs;
        // About midway between current quarter and next quarter
        if(timeDifference >= 2 * dayS && timeDifference <= 4 * dayS) {
            switch(moonPhaseData[i].name) {
                case 'new moon':
                    return moonPhases.WANING_CRESCENT;
                case 'first quarter':
                    return moonPhases.WAXING_CRESCENT;
                case 'full moon':
                    return moonPhases.WAXING_GIBBOUS;
                case 'third quarter':
                    return moonPhases.WANING_GIBBOUS;
            }

        // Quarter has just started
        } else if(timeDifference >= 0 && timeDifference < 2 * dayS) {
            switch(moonPhaseData[i].name) {
                case 'new moon':
                    return moonPhases.NEW_MOON;
                case 'first quarter':
                    return moonPhases.FIRST_QUARTER;
                case 'full moon':
                    return moonPhases.FULL_MOON;
                case 'third quarter':
                    return moonPhases.THIRD_QUARTER;
            }

        // About to enter next quarter
        } else if(timeDifference < moonPhaseData[i + 1].timestamp && timeDifference > 4 * dayS) {
            switch(moonPhaseData[i].name) {
                case 'new moon':
                    return moonPhases.THIRD_QUARTER;
                case 'first quarter':
                    return moonPhases.NEW_MOON;
                case 'full moon':
                    return moonPhases.FIRST_QUARTER;
                case 'third quarter':
                    return moonPhases.FULL_MOON;
            }
        }
    }
}

function getOverallWeatherRating(moonPhase, cloudRatingClass, visibilityRatingClass, precipitationPercentage) {
    let score = 0;
    switch(moonPhase) {
        case moonPhases.NEW_MOON:
            score += 4;
            break;
        case moonPhases.WANING_CRESCENT || moonPhases.WAXING_CRESCENT:
            score += 3;
            break;
        case moonPhases.FIRST_QUARTER || moonPhases.THIRD_QUARTER:
            score += 2;
            break;
        case moonPhases.WAXING_GIBBOUS || moonPhases.WANING_GIBBOUS:
            score += 1;
            break;
    }

    switch(cloudRatingClass) {
        case 'marker-4':
            score += 1;
            break;
        case 'marker-5':
            score += 1;
            break;
        case 'marker-6':
            score += 2;
            break;
        case 'marker-7':
            score += 3;
            break;
        case 'marker-8':
            score += 3;
            break;
        case 'marker-9':
            score += 3.5;
            break;
        case 'marker-10':
            score += 4;
            break;
    }

    switch(visibilityRatingClass) {
        case 'marker-4' || 'marker-5' || 'marker-6':
            score += 1;
            break;
        case 'marker-7' || 'marker-8' || 'marker-9':
            score += 1.5;
            break;
        case 'marker-10':
            score += 2;
            break;
    }

    return Math.floor(score);
}