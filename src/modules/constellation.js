import { aquarius, aries, cancer, capricorn, gemini, leo, libra, pisces, sagittarius, taurus, virgo } from '../assets/assets';

let constellationDescriptions = {
    "Aquarius": "The Water Bearer.",
    "Aries": "The Ram.",
    "Cancer": "The Crab.",
    "Capricorn": "The Sea Goat",
    "Gemini": "The Twins.",
    "Leo": "The Lion.",
    "Libra": "The Scales.",
    "Pisces": "The Fishes.",
    "Sagittarius": "The Archer.",
    "Taurus": "The Bull.",
    "Virgo": "The Virgin."
};

let constellationImages = {
    "Aquarius": aquarius,
    "Aries": aries,
    "Cancer": cancer,
    "Capricorn": capricorn,
    "Gemini": gemini,
    "Leo": leo,
    "Libra": libra,
    "Pisces": pisces,
    "Sagittarius": sagittarius,
    "Taurus": taurus,
    "Virgo": virgo
};

export async function getConstellationData(latitude, longitude) {
    const constellationNames = [
        "Aquarius",
        "Aries",
        "Cancer",
        "Capricorn",
        "Gemini",
        "Leo",
        "Libra",
        "Pisces",
        "Sagittarius",
        "Taurus",
        "Virgo",
    ];

    let visibleConstellations = [];
    let constellations = [];
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
            constellations.push(JSON.parse(this.response));
            if(constellationIsVisible(JSON.parse(this.response), latitude, longitude)) {
                visibleConstellations.push(JSON.parse(this.response).target.name);
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
    showConstellations(constellations, visibleConstellations);

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
export function showConstellations(constellations, visibleConstellations) {
    console.log("Visible constellations");
    console.log(constellations);
    console.log(visibleConstellations);
    document.querySelector('.constellation-container').innerHTML = '';
    for(let i = 0; i < constellations.length; i++) {
        let constellation = constellations[i];
        console.log(constellation);
        let visible = "Maybe";
        if(constellation.target.name in visibleConstellations)
            visible = "Visible";

        const constellationName = constellation.target.name;
        const description = constellationDescriptions[constellationName];
        const declination = constellation.dec.decimal;
        const rightAscension = constellation.ra.decimal;
        const image = constellationImages[constellationName];

        const constellationTemplate = (`<div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="${image}" alt="Avatar" style="width:300px;height:350px;">
                </div>
                <div class="flip-card-back">
                    <div class="constellation-name">
                        <h10>${constellationName}</h10>
                    </div>
                    <div class="line">

                    </div>
                    <div class="about">
                        <p>

                        </p>
                        <h11>${description}</h11>
                        <p>

                        </p>
                    </div>
                    <div class="coordinates">
                        <p>

                        </p>
                        <h11>Declination: ${declination}</h11><br>
                        <h11>Right Ascension: ${rightAscension}</h11>
                    </div>
                </div>
            </div>
        </div>`);

        if(visible == "Visible") {
            document.querySelector('.constellation-container').insertAdjacentHTML('afterbegin', constellationTemplate);
        } else {
            document.querySelector('.constellation-container').insertAdjacentHTML('beforeend', constellationTemplate);
        }
    }
}