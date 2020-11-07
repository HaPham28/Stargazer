//Sample dates
const dates = ["6/12/2015", "8/15/2015", "10/22/2015", "11/2/2015", "12/22/2015"];
const events = [{"img":"https://c.tadst.com/gfx/600x337/supermoon-micromoon.png?1","date":"10/21/2020", "event_name":"Orionid Meteor Shower", "event_description":"The Orionids are the second meteor shower in October. The shower peaks on October 21-22 but usually remains active between October 2 and November 7. The best time to see these shooting stars is just after midnight and before the Sun rises.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/orionid.html"},
{"img":"https://c.tadst.com/gfx/600x337/supermoon-micromoon.png?1", "event_name":"Blue Moon", "event_description":"October has two Full Moons, which makes this Full Moon a Blue Moon. This Blue Moon is also a Micro Full Moon.", "event_link":"https://www.timeanddate.com/astronomy/moon/blue-moon.html"},
{"img":"https://c.tadst.com/gfx/600x337/supermoon-micromoon.png?1","date":"11/15/2020", "event_name":"Super New Moon", "event_description":"This New Moon takes place very close to its perigee—the point on its orbit closest to the Earth.", "event_link":"https://www.timeanddate.com/astronomy/moon/super-full-moon.html"},
{"img":"https://static.vecteezy.com/system/resources/previews/000/096/152/original/meteor-shower-free-vector.jpg?1","date":"11/17/2020", "event_name":"Leonid Meteor Shower", "event_description":"The Leonids' shooting stars are visible between November 6 and 30, and peak on the night of November 17 and early morning of November 18, 2020 with up to 15 meteors per hour.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/leonids.html"},
{"img":"https://image.freepik.com/free-photo/full-beaver-moon-back-dark-cloud-silhouette-tree-night-sky_33861-919.jpg?1","date":"11/30/2020", "event_name":"Beaver Moon", "event_description":"November's Full Moon is called a Beaver Moon, after beavers that build their dams during this time of the year.", "event_link":"https://www.timeanddate.com/astronomy/moon/beaver.html"},
{"img":"https://static.vecteezy.com/system/resources/previews/000/096/152/original/meteor-shower-free-vector.jpg?1","date":"12/13/2020", "event_name":"Geminid Meteors", "event_description":"One of the best meteor showers of the year, the Geminids peak on the night of December 13 and early morning hours of December 14, 2020, but will be visible from December 4-16.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/geminids.html"},
{"img":"https://c.tadst.com/gfx/1200x630/total-lunar-eclipse-blood-moon.png?1","date":"12/14/2020", "event_name":"Total Solar Eclipse", "event_description":"This total solar eclipse will be visible from Chile and some parts of Argentina in the afternoon.", "event_link":"https://www.timeanddate.com/eclipse/solar/2020-december-14"},
{"img":"https://c.tadst.com/gfx/600x337/december-solstice-dark.png?1","date":"12/21/2020", "event_name":"December Solstice", "event_description":"The December solstice will take place at 10:02 UTC. Also known as the winter solstice, it is the shortest day of the year in the Northern Hemisphere. In the Southern Hemisphere, it is the longest day of the year and is called the summer solstice.", "event_link":"https://www.timeanddate.com/calendar/december-solstice.html"},
{"img":"https://static.vecteezy.com/system/resources/previews/000/096/152/original/meteor-shower-free-vector.jpg?1","date":"12/22/2020", "event_name":"Ursid Meteors", "event_description":"Catch the shooting stars of the last major meteor shower of the year, the Ursids, when it peaks between the night of December 21 and 22, 2020.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/ursids.html"},
{"img":"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2019%2F12%2Fdecember-cold-moon-COLDMOON1219.jpg?1","date":"12/30/2020", "event_name":"Cold Moon", "event_description":"The year's final Full Moon in December is called a Cold Moon because of low temperatures in most locations in the Northern Hemisphere.", "event_link":"https://www.timeanddate.com/astronomy/moon/cold.html"},
{"img":"https://c.tadst.com/gfx/1200x630/sun-distances.png?1","date":"01/02/2021", "event_name":"Earth's Perihelion", "event_description":"At 13:50 UTC, the Earth will reach its perihelion—the point on its orbit that is closest to the Sun.", "event_link":"https://www.timeanddate.com/astronomy/perihelion-aphelion-solstice.html"},
{"img":"https://static.vecteezy.com/system/resources/previews/000/096/152/original/meteor-shower-free-vector.jpg?1","date":"01/03/2021", "event_name":"Quadrantids Meteors", "event_description":"The first major meteor shower of 2021, the Quadrantids, peaks on the night of January 3 and early morning hours of January 4.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/quadrantids.html"},
{"img":"https://c.tadst.com/gfx/600x337/total-solar-elipse-diamondring.jpg?1","date":"01/13/2021", "event_name":"New Moon", "event_description":"The Moon will come between the Sun and the Earth, and the illuminated side of the Moon will face away from the Earth. A New Moon is almost impossible to see, even with a telescope.", "event_link":"https://www.timeanddate.com/astronomy/moon/new-moon.html"},
{"img":"https://images2.minutemediacdn.com/image/upload/c_crop,h_1342,w_2387,x_6,y_0/v1578412400/shape/mentalfloss/611557-gettyimages-494216958.jpg?itok=Wd8OUO0e","date":"01/28/2021", "event_name":"Wolf Moon", "event_description":"The first Full Moon of the year is colloquially known as Wolf Moon in many northern cultures. A Full Moon occurs when the Sun and the Moon are on opposite sides of the Earth.", "event_link":"https://www.timeanddate.com/astronomy/moon/wolf.html"},
{"img":"https://c.tadst.com/gfx/600x337/total-solar-elipse-diamondring.jpg?1","date":"02/11/2021", "event_name":"New Moon", "event_description":"Take advantage of the New Moon to check out the night sky, weather permitting, of course.", "event_link":"https://www.timeanddate.com/astronomy/moon/new-moon.html"},
{"img":"https://c.tadst.com/gfx/600x337/snow-moon.jpg?1","date":"02/27/2021", "event_name":"Snow Moon", "event_description":"February's Full Moon is also known as Snow Moon in many Northern Hemisphere cultures.", "event_link":"https://www.timeanddate.com/astronomy/moon/snow.html"},
{"img":"https://c.tadst.com/gfx/600x337/total-solar-elipse-diamondring.jpg?1","date":"03/13/2021", "event_name":"New Moon", "event_description":"Dark nights a few days before and after the Moon reaches its New Moon phase at 10:21 UTC on March 13 are the best nights to do some night sky watching.", "event_link":"https://www.timeanddate.com/astronomy/moon/new-moon.html"},
{"img":"https://c.tadst.com/gfx/1200x630/march-equinox-dark.png?1","date":"03/20/2021", "event_name":"March Equinox", "event_description":"The March equinox is the first day of spring in the Northern Hemisphere and the start of fall in the Southern Hemisphere by astronomical definitions.", "event_link":"https://www.timeanddate.com/calendar/march-equinox.html"},
{"img":"https://www.refinery29.com/images/9515478.jpg?crop=40%3A21","date":"03/28/2021", "event_name":"Worm Moon", "event_description":"March 2021's Super Full Moon is also the Worm Moon, named after earthworms that tend to appear around in this time in many locations in the Northern Hemisphere.", "event_link":"https://www.timeanddate.com/astronomy/moon/worm.html"},
{"img":"https://c.tadst.com/gfx/600x337/total-solar-elipse-diamondring.jpg?1","date":"04/12/2021", "event_name":"New Moon", "event_description":"Take advantage of a dark night sky to see the planets and Earthshine a few days before and after the New Moon.", "event_link":"https://www.timeanddate.com/astronomy/moon/new-moon.html"},
{"img":"https://static.vecteezy.com/system/resources/previews/000/096/152/original/meteor-shower-free-vector.jpg?1","date":"04/22/2021", "event_name":"Lyrid Meteor Shower", "event_description":"The Lyrid meteor shower is expected to peak around April 22 and 23, depending on your location.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/lyrids.html"},
{"img":"https://media.allure.com/photos/5cb775d3c9e6dd59e26fa5b3/master/pass/pinkmoon.jpg?1","date":"04/27/2021", "event_name":"Pink Moon", "event_description":"The Full Moon in April is sometimes known as the Pink Moon because of phlox, a pink flower, that blooms around this time in the North.", "event_link":"https://www.timeanddate.com/astronomy/moon/pink.html"},
{"img":"https://img.particlenews.com/img/id/0fVXCy_0OMymFNc00?type=thumbnail_512x288","date":"04/27/2021", "event_name":"Super Full Moon", "event_description":"April's Pink Full Moon is also a Super Moon. Because the Full Moon takes place when the Moon is at its perigee, it will look a little larger than a usual Full Moon.", "event_link":"https://www.timeanddate.com/astronomy/moon/super-full-moon.html"},
{"img":"https://static.vecteezy.com/system/resources/previews/000/096/152/original/meteor-shower-free-vector.jpg?1","date":"05/5/2021", "event_name":"Eta Aquarid Meteors", "event_description":"Use our handy Interactive Meteor Shower Sky Map to increase your chances of seeing shooting stars from the Eta Aquarids.", "event_link":"https://www.timeanddate.com/astronomy/meteor-shower/eta-aquarids.html"}
];

var future_events = []
export function fillFutureEvents(future_events){
  var b = false;
  for (let i = 0; i < events.length; i++){
      var curEvent = events[i];
      var curDate = new Date(curEvent["date"]);
      var todaysDate = new Date();
      if (curDate >= todaysDate){
          b = true;
      }
      if (b){
        future_events.push(curEvent)
      }
  }
  return future_events;
}
future_events = fillFutureEvents(future_events);
//For the purpose of stringifying MM/DD/YYYY date format
const monthSpan = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Format MM/DD/YYYY into string
function dateSpan(date) {
  let month = date.split('/')[0];
  month = monthSpan[month - 1];
  let day = date.split('/')[1];
  if (day.charAt(0) === '0') {
    day = day.charAt(1);
  }
  const year = date.split('/')[2];

  //Spit it out!
  return month + " " + day + ", " + year;
}

//Main function. Draw your circles.
function makeCircles() {
  //Forget the timeline if there's only one date. Who needs it!?
  if (future_events.length < 2) {
    $("#astro-line").hide();
    $("#astro-span").show().text(dateSpan(future_events[0]["date"]));
    //This is what you really want.
  } else if (future_events.length >= 2) {
    //Set day, month and year variables for the math
    const first = future_events[0]["date"];
    const last = future_events[future_events.length - 1]["date"];

    const firstMonth = parseInt(first.split('/')[0]);
    const firstDay = parseInt(first.split('/')[1]);
    const firstYear = parseInt(first.split('/')[2])

    const lastMonth = parseInt(last.split('/')[0]);
    const lastDay = parseInt(last.split('/')[1]);
    const lastYear = parseInt(last.split('/')[2])

    //Integer representation of the last day. The first day is represnted as 0
    const lastInt = ((lastYear - firstYear) * 365) + ((lastMonth - firstMonth) * 30) + (lastDay - firstDay);

    //Draw first date circle
    console.log(document.querySelector('#astro-line'));

    
    //Loop through middle dates
    let i;
    for (i = 0; i < future_events.length; i++) {
      const thisMonth = parseInt(future_events[i]["date"].split('/')[0]);
      const thisDay = parseInt(future_events[i]["date"].split('/')[1]);
      const thisYear = parseInt(future_events[i]["date"].split('/')[2])

      //Integer representation of the date
      const thisInt = ((thisYear - firstYear) * 365) + ((thisMonth - firstMonth) * 30) + (thisDay - firstDay);
      console.log(thisInt)
      //Integer relative to the first and last dates
      const relativeInt = thisInt / lastInt;

      //Draw the date circle
      $("#astro-line").append('<div class="astro-circle" id="astro-circle' + i + '" style="left: ' + relativeInt * 100 + '%;"><div class="popupSpan">' + dateSpan(future_events[i]["date"]) + '</div></div>');
      var curEvent = future_events[i]["event_name"];
      var curDescription = future_events[i]["event_description"];
      var curLink = future_events[i]["event_link"];
      var curImg = future_events[i]["img"];
      const template = (`
        <div class="card">
          <div class="thumbnail"><img class="left" src=${curImg}/></div>
          <div class="right">
            <h1>${curEvent}</h1>
            <div class="separator"></div>
            <p>${curDescription}</p>
          </div>
          <h5>${thisDay}</h5>
          <h6>${monthSpan[thisMonth-1]}</h6>
          <ul>
            <li><i class="fa fa-eye fa-2x"></i></li>
            <li><i class="fa fa-heart-o fa-2x"></i></li>
            <li><i class="fa fa-envelope-o fa-2x"></i></li>
            <li><i class="fa fa-share-alt fa-2x"></i></li>
          </ul>
          <div class="fab"><i class="fa fa-arrow-down fa-3x material-icons" href=${curLink}>explore</i></div>
        </div>
      `);
      $("#astro-mainCont").append('<span id="astro-span' + i + '" class="right">' + template + '</span>');
    }

    //Draw the last date circle
    
  }

  $(".astro-circle:first").addClass("active");
}

makeCircles();

$(".astro-circle").mouseenter(function() {
  $(this).addClass("hover");
});

$(".astro-circle").mouseleave(function() {
  $(this).removeClass("hover");
});

$(".astro-circle").click(function() {
  const spanNum = $(this).attr("id");
  selectDate(spanNum);
});

function selectDate(selector) {
  const $selector = "#" + selector;
  const $spanSelector = $selector.replace("astro-circle", "astro-span");
  const current = $selector.replace("astro-circle", "");

  $(".active").removeClass("active");
  $($selector).addClass("active");
  
  if ($($spanSelector).hasClass("right")) {
    $(".center").removeClass("center").addClass("left")
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("right")
  } else if ($($spanSelector).hasClass("left")) {
    $(".center").removeClass("center").addClass("right");
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("left");
  }
}
selectDate("astro-span0");
console.log("AHHHHHHHHHHHHHH")
