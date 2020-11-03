// Aeris Weather info (moon phase)
import {latitude, longitude} from "./autocomplete";
import {
    crescent_waning,
    crescent_waxing,
    full_moon,
    gibbous_waning,
    gibbous_waxing,
    new_moon, quarter_waning,
    quarter_waxing
} from "../assets/assets";

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
export function getWeatherForecast(){
    const AccessID = 'cruQcmMBbu2IWxTzBpQxF';
    const SecretKey = 'ZclnNemymt1nOKIUsB37ci2U5ydvua6e6OAla33f';

    const aeris = new AerisWeather(AccessID, SecretKey)
    const loc = latitude + ',' + longitude

    const moonphaseRequest = aeris.api().endpoint('sunmoon/moonphases').place(loc).limit(7).from(new Date(new Date().getTime() - 2592000000)).get();
    const forecastRequest = aeris.api().endpoint('forecasts').place(loc).limit(7).get();
    const placesRequest = aeris.api().endpoint('places').place(loc).get();

    const aerisResults = Promise.all([moonphaseRequest, forecastRequest, placesRequest]);

    aerisResults
            .then((apiResults) => {
                const moonphaseResults = apiResults[0].data;
                const forecastsResults = apiResults[1].data;
                const placesResults = apiResults[2].data;

                //console.log(apiResults)
                console.log(moonphaseResults);
                addWeatherCards(forecastsResults, moonphaseResults);
            });
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
export function clearWeatherCards() {
    let cards = document.querySelector(".weather-container");
    cards.innerHTML = '';
}

/**
 * Adds weather cards to DOM based on data returned from weather query
 */
export async function addWeatherCards(weatherData, moonData) {
    clearWeatherCards();
    weatherData[0].periods.reverse();
    const weekdayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
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

    for (const period of weatherData[0].periods){
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
        let moonPhaseImage = null;
        let moonPhaseTitle = 'N/A';
        switch(moonPhase) {
            case moonPhases.NEW_MOON:
                moonPhaseImage = new_moon;
                moonPhaseTitle = "New Moon";
                break;
            case moonPhases.WAXING_CRESCENT:
                moonPhaseImage = crescent_waxing;
                moonPhaseTitle = "Waxing Crescent";
                break;
            case moonPhases.FIRST_QUARTER:
                moonPhaseImage = quarter_waxing;
                moonPhaseTitle = "First Quarter";
                break;
            case moonPhases.WAXING_GIBBOUS:
                moonPhaseImage = gibbous_waxing;
                moonPhaseTitle = "Waxing Gibbous";
                break;
            case moonPhases.FULL_MOON:
                moonPhaseImage = full_moon;
                moonPhaseTitle = "Full Moon";
                break;
            case moonPhases.WANING_GIBBOUS:
                moonPhaseImage = gibbous_waning;
                moonPhaseTitle = "Waning Gibbous";
                break;
            case moonPhases.THIRD_QUARTER:
                moonPhaseImage = quarter_waning;
                moonPhaseTitle = "Third Quarter";
                break;
            case moonPhases.WANING_CRESCENT:
                moonPhaseImage = crescent_waning;
                moonPhaseTitle = "Waning Crescent";
                break;
        }
        if (moonPhaseImage == null){
            throw "Unknown Moon phase " + moonPhase + "!";
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
                    <img title="${moonPhaseTitle}" class="weather-moon" src="${await moonPhaseImage}"/>
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
    }
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
export function getMoonPhase(moonPhaseData, date) {
    /*
        Takes ~ 1 week for each quarter, so between 2 - 4 days after start of quarter, we use intermediate phases
    */
    let flag = false;
    let res = null;
    const dayS = 60 * 60 * 24;
    let PassedDateMs = date.getTime() / 1000;
    for(let i = 0; i < moonPhaseData.length - 1; i++) {
        let phaseDateMs = moonPhaseData[i].timestamp;
        let timeDifference = phaseDateMs - PassedDateMs;
        console.log(date.toISOString() + " " + moonPhaseData[i].name + " " + (timeDifference / dayS));
        if(timeDifference < 0)
            continue;

        // Quarter has just started
        if(timeDifference >= 5 * dayS) {
            console.log("RETURN 1");
            flag = true;
            switch(String(moonPhaseData[i].name)) {
                case 'new moon':
                    res = moonPhases.THIRD_QUARTER;
                    break;
                case 'first quarter':
                    res = moonPhases.NEW_MOON;
                    break;
                case 'full moon':
                    res = moonPhases.FIRST_QUARTER;
                    break;
                case 'last quarter':
                    res = moonPhases.FULL_MOON;
                    break;
                default:
                    console.log(String(moonPhaseData[i].name));
            }

        // About midway between current quarter and next quarter
        } else if(timeDifference >= 3 * dayS) {
            flag = true;
            switch(String(moonPhaseData[i].name)) {
                case 'new moon':
                    res = moonPhases.WANING_CRESCENT;
                    break;
                case 'first quarter':
                    res = moonPhases.WAXING_CRESCENT;
                    break;
                case 'full moon':
                    res = moonPhases.WAXING_GIBBOUS;
                    break;
                case 'last quarter':
                    res = moonPhases.WANING_GIBBOUS;
                    break;
            } 
        
        // About to enter next quarter
        } else {
            flag = true;
            switch(String(moonPhaseData[i].name)) {
                case 'new moon':
                    res = moonPhases.NEW_MOON;
                    break;
                case 'first quarter':
                    res = moonPhases.FIRST_QUARTER;
                    break;
                case 'full moon':
                    res = moonPhases.FULL_MOON;
                    break;
                case 'last quarter':
                    res = moonPhases.THIRD_QUARTER;
                    break;
            }
        }

        if(flag)
            break;
    }
    
    return res;
}

export function getOverallWeatherRating(moonPhase, cloudRatingClass, visibilityRatingClass, precipitationPercentage) {
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
