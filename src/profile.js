import './css/profile_styles';
import * as back_end from "./modules/back_end";
import {verify_token} from "./modules/back_end";
import {displayFavorite} from "./modules/location";

window.init_profile = async function() {
    console.log("Profile Loading...");
    await verify_token();
    console.log("Profile Loaded");
    document.querySelector('.review-slider').oninput = function() {
        document.querySelector('.review-slider-title').innerHTML = "Leave Review (" + this.value + "/5)";
    }

    const user = JSON.parse((await back_end.get_token()).user());
    document.querySelector('.profile-title').innerHTML = user.user.username;
    document.querySelector('.stats-header').innerHTML = 'Review Count: ' + user.user.review_count;

    const favoritePlaces = await back_end.get_favorite_places(999, 0);

    let favPlaceIds = [];
    for(let i = 0; i < favoritePlaces.length; i++) {
        let place = favoritePlaces[i];
        favPlaceIds.push(place.place_id());
    }

    displayFavorite(favPlaceIds);

    let place_id = "";

    window.open_review_modal = function(elem) {
        document.querySelector('.review-modal').style.display = "block";
        window.set_place_id(elem.value);
    }


    window.set_place_id = function(id){
        place_id = id;
    }

    window.leave_review = async function() {
        const reviewNumber = document.querySelector('.review-slider').value;
        const result = await back_end.add_review(place_id, reviewNumber, "N/A");
        console.log(result);
        document.querySelector('.review-modal').style.display = "none";
    }

    window.toggle_favorite = async function(elem) {
        if(await is_favorite(elem.value)) {
            await back_end.remove_favorite_place(elem.value);
            elem.innerHTML = "Add Favorite";
        } else {
            await back_end.add_favorite_place(elem.value);
            elem.innerHTML = "Remove Favorite";
        }

        console.log((await back_end.get_favorite_places(999, 0)));
    }

    window.is_favorite = async function(id) {
        const favPlaces = await back_end.get_favorite_places(999, 0);

        let isFav = false;
        for(let i = 0; i < favPlaces.length; i++) {
            const place = favPlaces[i];
            if(place.place_id() == id)
                isFav = true;
        }

        return isFav;
    }

    window.close_modals = function() {
        document.querySelector('.review-modal').style.display = "none";
    }
}