/** get 20 most relevant nearby parks (as ranked by google) **/
import {latitude, longitude} from "./autocomplete";
import {getLightPollution} from "./light_pollution";

// get 20 most relevant nearby parks (as ranked by google)
export function getNearbyParks() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
    });

    let request = {
        location: new google.maps.LatLng(latitude, longitude),
        radius: '50000',
        type: ['park'],
    };
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function(results, status) {
        console.log(results);

        // Get top # of parks (the first # parks in the list)
        const num_Location = 3;  // 3 is just for debug, maybe 10 for demo
        let top10Parks = results.slice(0,num_Location);

        // add light pollution element to each Park
        top10Parks.forEach(park => {

            let lat = park.geometry.location.lat();
            let lng = park.geometry.location.lng();
            let lightPollution = parseFloat(getLightPollution(lat, lng));

            park.Light_Pollution = lightPollution;
        });

        // sort the list of Parks by light pollution level from low to high
        top10Parks.sort(function(a,b)
        {
            return a.Light_Pollution - b.Light_Pollution;
        });

        clearLocationCards();

        //get more details
        let place_id = top10Parks[0].place_id;
        console.log("place id " + place_id);
        let request = {
            placeId: place_id,
            fields: ['name', 'place_id', 'opening_hours', 'formatted_address','rating', 'photo', 'url', 'types', 'formatted_phone_number', 'website', 'business_status'],
        };
        let service = new google.maps.places.PlacesService(map);
        service.getDetails(request, function(place, status) {
            console.log(place);
            makeLocationTemplate (place, top10Parks[0].Light_Pollution, 'top-location-container');
        });


        //add location cards
        top10Parks.slice(1,).forEach( park => {
            let place_id = park.place_id;
            let request = {
                placeId: place_id,
                fields: ['name', 'place_id', 'formatted_address', 'rating', 'photo', 'url', 'types', 'formatted_phone_number', 'opening_hours', 'website', 'business_status'],
            };
            let service = new google.maps.places.PlacesService(map);
            service.getDetails(request, function(place, status) {
                console.log(place);
                makeLocationTemplate (place, park.Light_Pollution, 'location-container');
            });
        });
        console.log(top10Parks);


    });

}

/**
 * Clears all weather cards from the HTML
 */
export function clearLocationCards() {
    let top_location = document.querySelector(".top-location-container");
    top_location.innerHTML = '';
    let cards = document.querySelector(".location-container");
    cards.innerHTML = '';
}

export function makeLocationTemplate(park, lpt, position) {
    let name = park.name;
    let address = park.formatted_address;
    let website = park.website;
    let place_id = park.place_id;

    let rating = park.rating;
    let lightPollution = lpt.toFixed(2);

    let imgLink = "./assets/central-park.jpg";
    if (typeof park.photos !== 'undefined') {
        imgLink = park.photos[0].getUrl();
    }


    //description variable
    let status = "N/A";
    if (typeof park.business_status !== 'undefined') {
        status = park.business_status.toLowerCase();
    }
    let hours = [];
    if (typeof park.opening_hours !== 'undefined') {
        park.opening_hours.weekday_text.forEach(day => {
            hours.push(" " + day);
        });
    } else {
        hours.push("N/A");
    }
    let phone_number = "N/A";
    if (typeof park.formatted_phone_number !== 'undefined') {
        phone_number = park.formatted_phone_number;
    }
    let types = [];
    park.types.forEach(type => {
        types.push(" " + type);
    });


    let color_rating = "";
    let width_rating = "";

    //light pollution bar
    if (lightPollution > 100) {
        color_rating = "dark_red";
        width_rating = "100%";
    } else if (lightPollution <= 100 && lightPollution >= 70) {
        color_rating = "red";
        width_rating = String(lightPollution) + "%";
    } else if (lightPollution < 70 && lightPollution > 40) {
        color_rating = "orange";
        width_rating = String(lightPollution) + "%";
    } else if (lightPollution <= 40 && lightPollution > 20) {
        color_rating = "yellow";
        width_rating = String(lightPollution) + "%";
    } else if (lightPollution <= 20 && lightPollution > 5) {
        color_rating = "green";
        width_rating = String(lightPollution) + "%";
    } else {
        color_rating = "dark_green";
        width_rating = String(lightPollution) + "%";
    }

    console.log("width" + width_rating);

    const template = (`
    <div class="location-card">
        <!-- Show picture of location -->
        <div class="location-card-left"><img src='${imgLink}'/></div>

        <div class="location-card-right">

            <!-- Show name, address, and location icon -->
            <div class="location-card-right-top">
                <div class="location-location">
                    <span class="location-name"> <a href="${website}">${name}</a>,</span>
                    <span class="location-address">${address}</span>
                </div>
                <div class="location-icon" title="Open in Maps"><a href="https://www.google.com/maps/place/?q=place_id:${place_id}" target="_blank" class="material-icons">place</a></div>
            </div>

            <!-- Show desciption of location & rating star-->
            <div class="location-card-right-middle">
                <div class="location-description">Hours: ${hours}<br><br>Contact: ${phone_number}<br><br>Business status: ${status}<br><br>Types: ${types}</div>
                <div class="location-rating-stars-group">
                    <span class="rating-star-100"><i class="material-icons">grade</i></span>
                    <span class="rating-star-100"><i class="material-icons">grade</i></span>
                    <span class="rating-star-100"><i class="material-icons">grade</i></span>
                    <span class="rating-star-75"><i class="material-icons">grade</i></span>
                    <span class="rating-star-0"><i class="material-icons">grade</i></span>
                </div>
            </div>
            <!-- Show light pollution -->
            <div class ="location-card-right-bottom">
                <div class="pollution" >
                    <div class="pollution-title">Light Pollution</div>
                    <p class="pollution-value">${lightPollution} lpc</p>
                    <div class="rating-bar">
                        <div style = "width: ${width_rating};" class="rate">
                            <span class="animate ${color_rating}"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `);

    document.querySelector('.' + position).insertAdjacentHTML('beforeend', template);
}
