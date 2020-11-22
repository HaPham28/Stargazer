import './css/styles'
import { central_park } from "./assets/assets";

window.init_about = function() {
    console.log("About Loading...");
    console.log("About Loaded");

    document.getElementById("scott-pic").src = central_park;
    document.getElementById("ha-pic").src = central_park;
    document.getElementById("alex-pic").src = central_park;
    document.getElementById("brett-pic").src = central_park;
    document.getElementById("vinay-pic").src = central_park;
}