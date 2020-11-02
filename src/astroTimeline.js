//Sample dates
const dates = ["6/12/2015", "8/15/2015", "10/22/2015", "11/2/2015", "12/22/2015"];
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
  if (dates.length < 2) {
    $("#astro-line").hide();
    $("#astro-span").show().text(dateSpan(dates[0]));
    //This is what you really want.
  } else if (dates.length >= 2) {
    //Set day, month and year variables for the math
    const first = dates[0];
    const last = dates[dates.length - 1];

    const firstMonth = parseInt(first.split('/')[0]);
    const firstDay = parseInt(first.split('/')[1]);

    const lastMonth = parseInt(last.split('/')[0]);
    const lastDay = parseInt(last.split('/')[1]);

    //Integer representation of the last day. The first day is represnted as 0
    const lastInt = ((lastMonth - firstMonth) * 30) + (lastDay - firstDay);

    //Draw first date circle
    console.log(document.querySelector('#astro-line'));

    $('astro-line').append('<div class="astro-circle" id="astro-circle0" style="left: ' + 0 + '%;"><div class="popupSpan">' + dateSpan(dates[0]) + '</div></div>');
    
    $("#astro-mainCont").append('<span id="astro-span0" class="center">' + dateSpan(dates[0]) + '</span>');

    //Loop through middle dates
    let i;
    for (i = 1; i < dates.length - 1; i++) {
      const thisMonth = parseInt(dates[i].split('/')[0]);
      const thisDay = parseInt(dates[i].split('/')[1]);

      //Integer representation of the date
      const thisInt = ((thisMonth - firstMonth) * 30) + (thisDay - firstDay);

      //Integer relative to the first and last dates
      const relativeInt = thisInt / lastInt;

      //Draw the date circle
      $("#astro-line").append('<div class="astro-circle" id="astro-circle' + i + '" style="left: ' + relativeInt * 100 + '%;"><div class="popupSpan">' + dateSpan(dates[i]) + '</div></div>');
      
      $("#astro-mainCont").append('<span id="astro-span' + i + '" class="right">' + dateSpan(dates[i]) + '</span>');
    }

    //Draw the last date circle
    $("#astro-line").append('<div class="astro-circle" id="astro-circle' + i + '" style="left: ' + 99 + '%;"><div class="popupSpan">' + dateSpan(dates[dates.length - 1]) + '</div></div>'); 
    
    $("#astro-mainCont").append('<span id="astro-span' + i + '" class="right">' + dateSpan(dates[i]) + '</span>');
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

console.log()
