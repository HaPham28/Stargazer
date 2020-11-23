import {init_google_map} from "./modules/autocomplete";
import './css/styles'
import {clearWeatherCards} from "./modules/weather";
import * as back_end from "./modules/back_end";

/********************************
*
*   Main JS file for landing page
*
*********************************/

function initMap(){
    // noinspection JSUnresolvedVariable
    init_google_map(google, document)
        .then(() => console.log("Maps loaded"))
        .catch(e => console.error(e));
}

window.init_index = function() {
    console.log("Index Loading...");
    document.getElementById("search-button").addEventListener("click", () => clearWeatherCards());
    initMap();
}

window.scroll_to_content = function() {
    $(".content-container").get(0).scrollIntoView({behavior: 'smooth'});
}

window.register_user = async function() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const confirm_password = document.getElementById("register-password-confirm").value;

    if(password != confirm_password) {
        alert("Make sure passwords match.");
        return;
    }

    await back_end.register_user(username, "testEmail@test.com", password);
    alert("Registered user " + username);
}

window.close_modals = function() {
    document.querySelector('.login-modal').style.display = "none";
    document.querySelector('.register-modal').style.display = "none";
}
