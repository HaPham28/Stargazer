import {init_google_map} from "./modules/autocomplete";
import './css/styles'
import {clearWeatherCards} from "./modules/weather";
import * as back_end from "./modules/back_end";

/********************************
*
*   Main JS file for landing page
*
*********************************/

// Allow HTML element to be removed directly from DOM
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

function initMap(){
    // noinspection JSUnresolvedVariable
    init_google_map(google, document)
        .then(() => console.log("Maps loaded"))
        .catch(e => console.error(e));
}

window.init_index = async function() {
    console.log("Index Loading...");
    document.getElementById("search-button").addEventListener("click", () => clearWeatherCards());
    initMap();

    const user = await back_end.get_token();
    if(user == null) {
        console.log("Nobody logged in");
        createGuestElements();
    } else {
        createLoggedInElements();
        console.log(JSON.parse(user.user()).user.username);
    }
    document.querySelector('.loader-container').style.display = 'none';
}

window.scroll_to_content = function() {
    $(".content-container").get(0).scrollIntoView({behavior: 'smooth'});
}

window.register_user = async function() {
    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirm_password = document.getElementById("register-password-confirm").value;

    if(password != confirm_password) {
        alert("Make sure passwords match.");
        return;
    }

    try { 
        await back_end.register_user(username, email, password);
        alert("Registered user " + username);
        createLoggedInElements();
        removeGuestElements();
        document.querySelector('.register-modal').style.display = 'none';
        document.getElementById("register-username").value = '';
        document.getElementById("register-email").value = '';
        document.getElementById("register-password").value = '';
        document.getElementById("register-password-confirm").value = '';
    } catch(err) {
        if(err.toString().indexOf("UsernameTaken") != -1) {
            alert("Username already taken. Please select a different username.");
        } else if(err.toString().indexOf("EmailTaken") != -1) {
            alert("Email already taken. Please use a different email.");
        } else if(err.toString().indexOf("PasswordError(TooShort") != -1) {
            alert("Password must be of at least length 8");
        } else {
            alert("Unspecified error registering user. Please try again later");
        }
    }
}

window.login_user = async function() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
        await back_end.login(username, password);
        alert("Logged in user " + username);
        createLoggedInElements();
        removeGuestElements();
        document.querySelector('.login-modal').style.display = 'none';
        document.getElementById("login-username").value = '';
        document.getElementById("login-password").value = '';
    } catch(err) {
        alert("Could not login user. Make sure username and password is correct.");
    }
}

window.open_register_modal = async function() {
    document.querySelector('.register-modal').style.display = 'block';
}

window.open_login_modal = async function() {
    document.querySelector('.login-modal').style.display = 'block';
}

window.logout_user = async function() {
    await back_end.set_token(null);
    document.cookie = 'auth_token' + '=; Max-Age=1';
    removeLoggedInElementes();
    createGuestElements();
}

window.close_modals = function() {
    document.querySelector('.login-modal').style.display = "none";
    document.querySelector('.register-modal').style.display = "none";
}

function createLoggedInElements() {
    const profileElement = document.createElement('a');
    profileElement.innerHTML = '<a id="profile" class="nav-link" href="profile.html">Profile</a>';
    const logoutElement = document.createElement('a');
    logoutElement.innerHTML = '<a id="logout" class="nav-link" onclick="logout_user()">Logout</a>'

    document.getElementById('about').insertAdjacentElement('afterend', profileElement);
    document.getElementById('profile').insertAdjacentElement('afterend', logoutElement);
}

function removeLoggedInElementes() {
    document.getElementById('profile').remove();
    document.getElementById('logout').remove();
}

function createGuestElements() {
    const loginElement = document.createElement('a');
    loginElement.innerHTML = '<a id="login" class="nav-link" onclick="open_login_modal()">Login</a>';
    const registerElement = document.createElement('a');
    registerElement.innerHTML = '<a id="register" class="nav-link" onclick="open_register_modal()">Register</a>';

    document.getElementById('about').insertAdjacentElement('afterend', loginElement);
    document.getElementById('login').insertAdjacentElement('afterend', registerElement);
}

function removeGuestElements() {
    document.getElementById('login').remove();
    document.getElementById('register').remove();
}
