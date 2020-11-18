import './css/styles'

window.init_profile = function() {
    console.log("Index Loading...");
    document.getElementById("search-button").addEventListener("click", () => clearWeatherCards());
    initMap();
    console.log("Index Loaded");
}