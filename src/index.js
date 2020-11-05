import {init_google_map} from "./modules/autocomplete";
import './styles'
import {clearWeatherCards} from "./modules/weather";

/********************************
*
*   Main JS file for landing page
*
*********************************/

function initMap(){
    init_google_map(google, document)
        .then(() => console.log("Maps loaded"))
        .catch(e => console.error(e));
}

window.init_index = () => {
    console.log("Index Loading...");
    document.getElementById("search-button").addEventListener("click", () => clearWeatherCards());
    initMap();
    console.log("Index Loaded");
}

window.scroll_to_content = () => {
    $(".content-container").get(0).scrollIntoView({behavior: 'smooth'});
}

// real_promise(initMap)
//     .then(
//         () => console.log("Maps loaded")
//     )
//     .catch(e => {
//         console.log("Error loading maps: " + e);
//         console.error(e);
//     });
// window.login = async function(user_name, password) {
//     console.log("LOGGING IN");
//
//     real_promise(async () => {
//         console.log("PRINT ME");
//         return await login(user_name, password);
//     }).then(() => {
//         console.log("DONE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//     }).catch(r => {
//         console.log(r);
//     });
// };
