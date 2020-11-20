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
    const username = "cool";
    const password = "password";
    back_end.register_user(username, "dude@dude.com", password).then(async () => {
        await back_end.delete_user(username, password);
    }).then(() => {
        console.log("Index Loaded");
    }).catch(r => {
        throw r;
    });
}

window.scroll_to_content = function() {
    $(".content-container").get(0).scrollIntoView({behavior: 'smooth'});
}

window.register_user = async function() {
    let userName = document.getElementById("register-username").value;
    let password = document.getElementById("register-password").value;
    let confirmPassword = document.getElementById("register-password-confirm").value;

    if(password != confirmPassword) {
        alert("Make sure passwords match.");
        return;
    }

    await register_user(userName, "testEmail@test.com", password);
    alert("Registered user " + userName);
}

window.close_modals = function() {
    document.querySelector('.login-modal').style.display = "none";
    document.querySelector('.register-modal').style.display = "none";
}