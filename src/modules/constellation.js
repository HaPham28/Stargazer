export async function getConstellationData(latitude, longitude) {
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
    let requestPromises = [];
    let index = 0;
    for(const constellation in constellationNames) {
        let url = 'https://www.strudel.org.uk/lookUP/json/?name=' + constellationNames[constellation].replace(' ', '+');
        let request = new XMLHttpRequest();
        request.open('GET', url, true);

        let resolvePromise = null;
        requestPromises.push(new Promise(resolve => resolvePromise = resolve));

        request.onload = function() {
            //console.log(this.response);
            if(constellationIsVisible(JSON.parse(this.response), latitude, longitude)) {
                visibleConstellations.push(JSON.parse(this.response));
                //console.log("Visible");
            } else {
                //console.log("Not visible");
            }
            console.log("Constellation resolved");
            resolvePromise(requestPromises[index]);
            console.log(requestPromises[index]);
        }
        request.send();
        index++;
    }

    //console.log("REQ");
    console.log(requestPromises);
    await Promise.all(requestPromises);
    console.log("All constellations finished");
    showConstellations(visibleConstellations);

}

/**
 * Determines if a constellation is visible from a given latitude and longitude
 * If declination > 90 - latitude, definitely visible; otherwise, not sure (but will return false)
 * http://www.dunlap.utoronto.ca/PMU199L0111/index.php/How_to_Figure_Out_Which_Objects_are_Visible_to_Which_Telescopes
 * @param {*} constellationData Data returned from API call
 * @param {*} latitude Latitude of location search
 * @param {*} longitude Longitude of location search
 */
export function constellationIsVisible(constellationData, latitude, longitude) {
    let declination = constellationData.dec.decimal;
    console.log(declination + " " + latitude);
    let latitudeThreshold = 90 - Math.abs(latitude);

    if(latitude < 0) {
        if(declination < latitudeThreshold)
            return true;
        else
            return false;
    } else {
        if(declination > latitudeThreshold)
            return true;
        else
            return false;
    }
}

//TODO: Show constellations in UI
export function showConstellations(visibleConstellations) {
    console.log("Visible constellations");
    console.log(visibleConstellations);
}