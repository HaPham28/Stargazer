import {getWeatherForecast} from "./weather";
import {getLightPollution} from "./light_pollution";
import {getConstellationData} from "./constellation";
import {getNearbyParks} from "./location";

/********* Google Maps Autocomplete ********/

export let placeName = null;
export let latitude = null;
export let longitude = null;

export async function init_google_map(google, document) {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
    });
    const card = document.getElementById("pac-card");
    const input = document.getElementById("location-input");
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
    const autocomplete = new google.maps.places.Autocomplete(input);
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo("bounds", map);
    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");
    infowindow.setContent(infowindowContent);
    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });
    autocomplete.addListener("place_changed", () => {
      // window.login("user", "pass");
      infowindow.close();
      marker.setVisible(false);
      const place = autocomplete.getPlace();

      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17); // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      console.log(place);

      latitude = place.geometry.location.lat();
      longitude = place.geometry.location.lng();
      placeName = place.name;


      getWeatherForecast();
      getLightPollution(latitude , longitude);

      getConstellationData();
      getNearbyParks(google);

      // Set place title
      document.querySelector('.place-title').innerHTML = place.name;

      //console.log(placeName + ": " + latitude + ", " + longitude);*/

      marker.setVisible(true);
      let address = "";

      if (place.address_components) {
        address = [
          (place.address_components[0] &&
            place.address_components[0].short_name) ||
            "",
          (place.address_components[1] &&
            place.address_components[1].short_name) ||
            "",
          (place.address_components[2] &&
            place.address_components[2].short_name) ||
            "",
        ].join(" ");
      }

      let heat_src = 'https://www.lightpollutionmap.info/#zoom=10.00&lat=' + latitude + '&lon=' + longitude + '&layers=B0FFFFFTFFFFFFFFFF';
      // document.querySelector('#light-pollution-map-iframe').attributes('src', heat_src);
      document.querySelector('.light-pollution-map-container').innerHTML = '';
      document.querySelector('.light-pollution-map-container').insertAdjacentHTML('afterbegin','<iframe id="light-pollution-map-iframe" src="' + heat_src + '"></iframe>');

      //document.getElementById('light-pollution-map-iframe').src = heat_src;
      //document.getElementById('​light-pollution-map-iframe').contentDocument.location.reload(true);



      console.log(heat_src);

    });
  }