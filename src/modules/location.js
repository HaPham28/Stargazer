/** get 20 most relevant nearby parks (as ranked by google) **/
import {latitude, longitude} from "./autocomplete";
import {getLightPollution} from "./light_pollution";
import {central_park} from "../assets/assets";
//import { resolve } from "../../webpack.config.dev";

// get 20 most relevant nearby parks (as ranked by google)
export async function getNearbyParks() {
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

    service.nearbySearch(request, async function(results, status) {
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
        //console.log("place id " + place_id);
        let request = {
            placeId: place_id,
            fields: ['name', 'place_id', 'opening_hours', 'formatted_address', 'geometry', 'rating', 'photo', 'url', 'types', 'formatted_phone_number', 'website', 'business_status'],
        };
        let service = new google.maps.places.PlacesService(map);

        service.getDetails(request, async function(place, status) {
            //console.log(place);
            makeLocationTemplate (place, top10Parks[0].Light_Pollution, 'top-location-container');
        });


        //add location cards
        for (const park of top10Parks.slice(1,) ) {
            let place_id = park.place_id;
            let request = {
                placeId: place_id,
                fields: ['name', 'place_id', 'formatted_address', 'geometry', 'rating', 'photo', 'url', 'types', 'formatted_phone_number', 'opening_hours', 'website', 'business_status'],
            };
            let service = new google.maps.places.PlacesService(map);
            const detail = await service.getDetails(request, async function(place, status) {
                const make =  makeLocationTemplate (place, park.Light_Pollution, 'location-container');
            });
        };
        
        console.log("PARKS DONE");

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

    //console.log("level of polution ", lpt);
    let name = park.name;
    let address = park.formatted_address;
    let website = park.website;
    let place_id = park.place_id;
    let rating = 0;
    let lightPollution = lpt.toFixed(2);
    let imgLink = central_park;
    let status = "N/A";
    let hours = [];
    let phone_number = "N/A";
    let types = [];
    let lat1 = park.geometry.location.lat();
    let lon1 = park.geometry.location.lng();
    //console.log(lat1, lon1, latitude, longitude);
    let dist = getDistanceFromLatLonInKm(lat1,lon1,latitude,longitude);
    let distance = "";

    //console.log("make dist distance111 ", dist, distance);
    //handle undefined
    if (isNaN(lightPollution)) {
        lightPollution = 0;
    }if (isNaN(dist)) {
        distance = "";
    }
    else distance = Math.round(dist).toString()+ " miles";
    //console.log("make dist distance222 ", dist, distance);

    if (typeof park.photos !== 'undefined') {
        imgLink = park.photos[0].getUrl();
        //console.log("IMG: " + imgLink);
    }
    if (typeof park.business_status !== 'undefined') {
        status = park.business_status.toLowerCase();
    }
    if (typeof park.opening_hours !== 'undefined') {
        park.opening_hours.weekday_text.forEach(day => {
            hours.push(" " + day);
        });
    } else {
        hours.push("N/A");
    }
    if (typeof park.formatted_phone_number !== 'undefined') {
        phone_number = park.formatted_phone_number;
    }
    park.types.forEach(type => {
        type = type.replace(/_/g, ' ');
        types.push(" " + type);
    });

    //update light pollution bar
    let color_rating = "";
    let width_rating = "";
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

    //update rating stars
    let full_star = 0;
    let partial_star = 0;
    let partial_star_percentage = 0;
    let empty_star = 0;
    if (typeof park.rating !== 'undefined') {
        rating = park.rating;
        full_star = Math.floor(rating);
        partial_star_percentage = Math.round((rating - full_star)*100);
        if (partial_star_percentage > 0) {
            partial_star = 1;
            empty_star = 5 - 1 - full_star;

            if (partial_star_percentage <= 37) {
                partial_star_percentage = 25;
            }
            else if (partial_star_percentage <= 62) {
                partial_star_percentage = 50;
            }
            else if (partial_star_percentage <= 87) {
                partial_star_percentage = 75;
            }
            else {
                full_star += 1;
                if (empty_star >= 1) {
                    empty_star -= 1;
                }
            }
        }
        else {
            empty_star = 5 - full_star;
            partial_star = 0;
        }

    }
    //console.log("star-rating ", rating);

    const make_empty_star = ' <span class="rating-star-0"><i class="material-icons">grade</i></span> ';
    const make_full_star = ' <span class="rating-star-100"><i class="material-icons">grade</i></span> ';
    const make_partial_star = '<span class="rating-star-' + partial_star_percentage.toString() +'"><i class="material-icons">grade</i></span>';
    

    //console.log(make_partial_star);


    const template = (`
    <div class="location-card">
        <!-- Show picture of location -->
        <div class="location-card-left"><img src='${imgLink}'/></div>

        <div class="location-card-right">

            <!-- Show name, address, and location icon -->
            <div class="location-card-right-top">
                <div class="location-location">
                    <span class="location-name"> <a target="_blank" href="${website}">${name}</a>,</span>
                    <span class="location-address">${address}</span>
                </div>
                <div class="location-distance" title="Open in Maps"> <span class="location-dist">${distance}</span><span class = "location-icon"> <a href="https://www.google.com/maps/place/?q=place_id:${place_id}" target="_blank" class="material-icons">place</a></span>
                </div>
            </div>
        

            <!-- Show desciption of location & rating star-->
            <div class="location-card-right-middle">
                <div class="location-description">Hours: ${hours}<br><br>Contact: ${phone_number}<br><br>Business status: ${status}<br><br>Types: ${types}</div>
                <div class="location-rating-stars-group">
                    ${make_empty_star.repeat(empty_star)}
                    ${make_partial_star.repeat(partial_star)}
                    ${make_full_star.repeat(full_star)}
                </div>
            </div>
            <!-- Show light pollution -->
            <div class ="location-card-right-bottom">
                <div class="pollution" >
                    <div class="pollution-title">Light Pollution</div>
                    <div class="pollution-value">${lightPollution} lpc</div>
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

export function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    //console.log("distance lat lon ", lat1,lon1,lat2,lon2)

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c * 0.621371; // Distance in mile
    //console.log("distance d ", d);
    return d;
}
  
export function deg2rad(deg) {
    //console.log("degree ", deg, deg * (Math.PI/180));
    return deg * (Math.PI/180);
}