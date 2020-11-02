
// Upcoming Astronomical events
const events = [{"date":"10/21/2020", "event_name":"Orionid Meteor Shower", "event_description":"The Orionids are the second meteor shower in October. The shower peaks on October 21-22 but usually remains active between October 2 and November 7. The best time to see these shooting stars is just after midnight and before the Sun rises.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/orionid.html"},
{"date":"10/31/2020", "event_name":"Blue Moon", "event_description":"October has two Full Moons, which makes this Full Moon a Blue Moon. This Blue Moon is also a Micro Full Moon.", "event_link":"https://www.timeanddate.com/astronomy/moon/blue-moon.html"},
{"date":"11/15/2020", "event_name":"Super New Moon", "event_description":"This New Moon takes place very close to its perigee—the point on its orbit closest to the Earth.", "event_link":"https://www.timeanddate.com/astronomy/moon/super-full-moon.html"},
{"date":"11/17/2020", "event_name":"Leonid Meteor Shower", "event_description":"The Leonids' shooting stars are visible between November 6 and 30, and peak on the night of November 17 and early morning of November 18, 2020 with up to 15 meteors per hour.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/leonids.html"},
{"date":"11/30/2020", "event_name":"Beaver Moon", "event_description":"November's Full Moon is called a Beaver Moon, after beavers that build their dams during this time of the year.", "event_link":"https://www.timeanddate.com/astronomy/moon/beaver.html"},
{"date":"12/13/2020", "event_name":"Geminid Meteors", "event_description":"One of the best meteor showers of the year, the Geminids peak on the night of December 13 and early morning hours of December 14, 2020, but will be visible from December 4-16.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/geminids.html"},
{"date":"12/14/2020", "event_name":"Total Solar Eclipse", "event_description":"This total solar eclipse will be visible from Chile and some parts of Argentina in the afternoon.", "event_link":"https://www.timeanddate.com/eclipse/solar/2020-december-14"},
{"date":"12/21/2020", "event_name":"December Solstice", "event_description":"The December solstice will take place at 10:02 UTC. Also known as the winter solstice, it is the shortest day of the year in the Northern Hemisphere. In the Southern Hemisphere, it is the longest day of the year and is called the summer solstice.", "event_link":"https://www.timeanddate.com/calendar/december-solstice.html"},
{"date":"12/22/2020", "event_name":"Ursid Meteors", "event_description":"Catch the shooting stars of the last major meteor shower of the year, the Ursids, when it peaks between the night of December 21 and 22, 2020.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/ursids.html"},
{"date":"12/30/2020", "event_name":"Cold Moon", "event_description":"The year's final Full Moon in December is called a Cold Moon because of low temperatures in most locations in the Northern Hemisphere.", "event_link":"https://www.timeanddate.com/astronomy/moon/cold.html"},
{"date":"01/02/2021", "event_name":"Earth's Perihelion", "event_description":"At 13:50 UTC, the Earth will reach its perihelion—the point on its orbit that is closest to the Sun.", "event_link":"https://www.timeanddate.com/astronomy/perihelion-aphelion-solstice.html"},
{"date":"01/03/2021", "event_name":"Quadrantids Meteors", "event_description":"The first major meteor shower of 2021, the Quadrantids, peaks on the night of January 3 and early morning hours of January 4.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/quadrantids.html"},
{"date":"01/13/2021", "event_name":"New Moon", "event_description":"The Moon will come between the Sun and the Earth, and the illuminated side of the Moon will face away from the Earth. A New Moon is almost impossible to see, even with a telescope.", "event_link":"https://www.timeanddate.com/astronomy/moon/new-moon.html"},
{"date":"01/28/2021", "event_name":"Wolf Moon", "event_description":"The first Full Moon of the year is colloquially known as Wolf Moon in many northern cultures. A Full Moon occurs when the Sun and the Moon are on opposite sides of the Earth.", "event_link":"https://www.timeanddate.com/astronomy/moon/wolf.html"},
{"date":"02/11/2021", "event_name":"New Moon", "event_description":"Take advantage of the New Moon to check out the night sky, weather permitting, of course.", "event_link":"https://www.timeanddate.com/astronomy/moon/new-moon.html"},
{"date":"02/27/2021", "event_name":"Snow Moon", "event_description":"February's Full Moon is also known as Snow Moon in many Northern Hemisphere cultures.", "event_link":"https://www.timeanddate.com/astronomy/moon/snow.html"},
{"date":"03/13/2021", "event_name":"New Moon", "event_description":"Dark nights a few days before and after the Moon reaches its New Moon phase at 10:21 UTC on March 13 are the best nights to do some night sky watching.", "event_link":"https://www.timeanddate.com/astronomy/moon/new-moon.html"},
{"date":"03/20/2021", "event_name":"March Equinox", "event_description":"The March equinox is the first day of spring in the Northern Hemisphere and the start of fall in the Southern Hemisphere by astronomical definitions.", "event_link":"https://www.timeanddate.com/calendar/march-equinox.html"},
{"date":"03/28/2021", "event_name":"Worm Moon", "event_description":"March 2021's Super Full Moon is also the Worm Moon, named after earthworms that tend to appear around in this time in many locations in the Northern Hemisphere.", "event_link":"https://www.timeanddate.com/astronomy/moon/worm.html"},
{"date":"04/12/2021", "event_name":"New Moon", "event_description":"Take advantage of a dark night sky to see the planets and Earthshine a few days before and after the New Moon.", "event_link":"https://www.timeanddate.com/astronomy/moon/new-moon.html"},
{"date":"04/22/2021", "event_name":"Lyrid Meteor Shower", "event_description":"The Lyrid meteor shower is expected to peak around April 22 and 23, depending on your location.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/lyrids.html"},
{"date":"04/27/2021", "event_name":"Pink Moon", "event_description":"The Full Moon in April is sometimes known as the Pink Moon because of phlox, a pink flower, that blooms around this time in the North.", "event_link":"https://www.timeanddate.com/astronomy/moon/pink.html"},
{"date":"04/27/2021", "event_name":"Super Full Moon", "event_description":"April's Pink Full Moon is also a Super Moon. Because the Full Moon takes place when the Moon is at its perigee, it will look a little larger than a usual Full Moon.", "event_link":"https://www.timeanddate.com/astronomy/moon/super-full-moon.html"},
{"date":"05/5/2021", "event_name":"Eta Aquarid Meteors", "event_description":"Use our handy Interactive Meteor Shower Sky Map to increase your chances of seeing shooting stars from the Eta Aquarids.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/eta-aquarids.html"}
];

export function getNextAstronomicalEvent(){
    for (let i = 0; i < events.length; i++){
        var curEvent = events[i];
        var curDate = new Date(curEvent["date"]);
        var todaysDate = new Date();
        if (curDate > todaysDate){
            return curEvent;
        }
    }
    return null;
}
