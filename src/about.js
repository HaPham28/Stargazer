import './css/about_styles';
import { alex, scott, ha, brett, central_park } from "./assets/assets";

window.init_about = function() {
    console.log("About Loading...");
    console.log("About Loaded");

    document.getElementById("scott-pic").src = scott;
    document.getElementById("ha-pic").src = ha;
    document.getElementById("alex-pic").src = alex;
    document.getElementById("brett-pic").src = brett;
    document.getElementById("vinay-pic").src = central_park;
}