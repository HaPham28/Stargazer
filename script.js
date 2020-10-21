/********************************
*
*   Main JS file for landing page
*
*********************************/

/*********************************
 * 
 *   API Calls
 * 
*********************************/
// Aeris Weather info (moon phase)
const AccessID = 'cruQcmMBbu2IWxTzBpQxF';
const SecretKey = 'ZclnNemymt1nOKIUsB37ci2U5ydvua6e6OAla33f';
// request format: https://api.aerisapi.com//sunmoon/moonphases?limit={NUMDAYS}&client_id=cruQcmMBbu2IWxTzBpQxF&client_secret=ZclnNemymt1nOKIUsB37ci2U5ydvua6e6OAla33f
// replace {NUMDAYS} with number of days we want moon phases (should be 7 in our case..)
// more info: https://www.aerisweather.com/support/docs/api/reference/endpoints/sunmoon-moonphases/


// Aeris Weather Info (weather forecast)
// Same API ID & Key as above



//light polution info
const SecretKey_light = '45pZnF8eF3ak9ixj'
let latitude = SearchLocation.latitude;
let longtitude = SearchLocation.longitude;
request.open('GET', 'https://www.lightpollutionmap.info/QueryRaster/?ql=viirs_2019&qt=point&qd=' + longtitude + ','+ latitude + '&key=45pZnF8eF3ak9ixj', true);








/*********************************
 * 
 *   HTML template updates
 * 
*********************************/