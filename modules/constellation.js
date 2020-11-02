export function getConstellationData() {
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
    for(const constellation in constellationNames) {
        let url = 'https://www.strudel.org.uk/lookUP/json/?name=' + constellationNames[constellation].replace(' ', '+');
        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = function() {
            //console.log(this.response);
            if(constellationIsVisible(this.response)) {
                visibleConstellations.push(this.response);
            }
            showConstellations();
        }
        request.send();
    }

}

// TODO
export function constellationIsVisible(constellationData) {
    return false;
}

//TODO: Show constellations in UI
export function showConstellations() {

}
