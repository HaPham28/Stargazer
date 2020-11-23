import './css/profile_styles';
import * as back_end from "./modules/back_end";

window.init_profile = async function() {
    console.log("Profile Loading...");
    console.log("Profile Loaded");

    const user = JSON.parse((await back_end.get_token()).user());
    document.querySelector('.profile-title').innerHTML = user.user.username;
}