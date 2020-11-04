import { makeLocationTemplate } from "./location";

//light pollution info --- return a STRING
export function getLightPollution(lat , lng) {
    const apiKey = '45pZnF8eF3ak9ixj'
    let url = 'https://www.lightpollutionmap.info/QueryRaster/?ql=viirs_2019&qt=point&qd=' + lng + ','+ lat + '&key=' + apiKey;
    console.log(url);
    let request = new XMLHttpRequest();
    request.open('GET', url, false);
    console.log("Request opened");

    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            return request.response;
        }
    }

    request.send();
    console.log("light in request ", request.onload());
    document.querySelector(".animate").classList.toggle("rate-8");

    return request.onload();
}

export function updateAverageLightPollution(lat, lng) {
    const boundingBox = getBoundingBox(lat, lng, 50);
    console.log(boundingBox);

    let qd = 'LINESTRING(';
    qd += boundingBox.minLon + '%20' + boundingBox.maxLat + ',';
    qd += boundingBox.maxLon + '%20' + boundingBox.maxLat + ',';
    qd += boundingBox.maxLon + '%20' + boundingBox.minLat + ',';
    qd += boundingBox.minLon + '%20' + boundingBox.minLat + ',';
    qd += boundingBox.minLon + '%20' + boundingBox.maxLat + ")";

    const apiKey = '45pZnF8eF3ak9ixj'
    let url = 'https://www.lightpollutionmap.info/QueryRaster/?ql=viirs_2019&qt=area&qd=' + qd + '&key=' + apiKey;
    console.log(url);
    let request = new XMLHttpRequest();
    request.open('GET', url, false);
    console.log("Request opened");

    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            updateAverageLightPollutionTemplate(request.response.split(",")[2]);
            return request.response;
        }
    }

    request.send();
    console.log("light in request ", request.onload());
    document.querySelector(".animate").classList.toggle("rate-8");

    return request.onload();
}

/**
 * Get a bounding box with side length 2*dist centered on lat, lng
 * @param {*} lat 
 * @param {*} lng 
 * @param {*} dist in km
 */
function getBoundingBox(lat, lon, dist) {
    const MAX_LAT = Math.PI / 2;
    const MIN_LAT = -MAX_LAT;
    const MAX_LON = Math.PI;
    const MIN_LON = -MAX_LON;
    const FULL_CIRCLE_RAD = 2 * Math.PI;

    let rad = 6371.0; // Approximate radius of Earth
    console.log("Lat: " + lat);
    let radDist = dist / rad;
    let minLat = degToRad(lat) - radDist;
    let maxLat = degToRad(lat) + radDist;

    let minLon = 0
    let maxLon = 0;
    if(minLat > MIN_LAT && maxLat < MAX_LAT) {
        let deltaLon = Math.asin(Math.sin(radDist)/ Math.cos(degToRad(lat)));
        minLon = degToRad(lon) - deltaLon;
        if(minLon < MIN_LON)
            minLon += FULL_CIRCLE_RAD;
        
        maxLon = degToRad(lon) + deltaLon;
        if(maxLon > MAX_LON)
            maxLon -= FULL_CIRCLE_RAD;
    } else {
        // a pole is within the box
        minLat = Math.max(minLat, MIN_LAT);
        maxLat = Math.min(maxLat, MAX_LAT);
        minLon = MIN_LON;
        maxLon = MAX_LON;
    }

    const boundingBox = {
        minLat: radToDeg(minLat),
        maxLat: radToDeg(maxLat),
        minLon: radToDeg(minLon),
        maxLon: radToDeg(maxLon)
    }

    return boundingBox;
}

function updateAverageLightPollutionTemplate(avgLightPollution) {
    document.querySelector('.light-pollution-aggregate').innerHTML = Math.round(avgLightPollution) + " nW/cm<sup>2</sup>/sr";
    let fraction = avgLightPollution / 14.0;
    document.querySelector('.inner-light-pollution-bar').style.width = Math.min(100, (100 * fraction)) + "%";
}

function degToRad(deg) {
    return deg * (Math.PI / 180.0);
}

function radToDeg(rad) {
    return rad * (180.0 / Math.PI); 
}