//light pollution info --- return a STRING
export function getLightPollution(lat , lng) {
    const apiKey = '45pZnF8eF3ak9ixj'
    let url = 'https://www.lightpollutionmap.info/QueryRaster/?ql=viirs_2019&qt=point&qd=' + lng + ','+ lat + '&key=' + apiKey;
    console.log(url);
    let request = new XMLHttpRequest();
    request.open('GET', url, false);
    console.log("Request opened");

    request.onload = function () {
        if (request.readyState == 4 && request.status == 200) {
            return request.response;
        }
    }

    request.send();
    console.log("light in request ", request.onload());
    document.querySelector(".animate").classList.toggle("rate-8");

    return request.onload();
}
