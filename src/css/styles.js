import './styles.css'
import './modals.css'
import './parallaxStars.css'
import './weatherCards.css'
import './locationCards.css'
import './constellation.css'
import './astroTimeline.css'

export function color_expand () {
    var isChecked = document.getElementById("colorSwitch").checked;

    if(isChecked) {
        document.getElementById("light-pollution-map-iframe").addClass('iframe-expand');
        /* Applied to iframe when color blindness filter active */
        document.getElementById("light-pollution-map-iframe").css ({
            '-webkit-filter': 'grayscale(100%) contrast(1.75)',
            '-moz-filter': 'grayscale(100%) contrast(1.75)',
            '-ms-filter': 'grayscale(100%) contrast(1.75)',
            '-o-filter': 'grayscale(100%) contrast(1.75)',
            'filter': 'grayscale(100%) contrast(1.75)'
        });
        console.log("checked");

    }
    else {
        console.log("undcheckchecked");

    }
}