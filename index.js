import {real_promise} from "./modules/real_promise";
import {init_google_maps} from "./modules/autocomplete";

/********************************
*
*   Main JS file for landing page
*
*********************************/

async function initMap(){
    return await init_google_maps(document);
}

real_promise(initMap)
    .then(
        () => console.log("Maps loaded")
    )
    .catch(e => {
        console.log("Error loading maps: " + e);
        console.error(e);
    });
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
