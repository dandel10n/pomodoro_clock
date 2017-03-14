$(document).ready(function() {
  var clock = new pomodoroClock();

  $('.timer').html(clock.sessionMinutes + ":00");

  $("#pomodoroClock .clock").click(function() {
    clock.startAndPause();
  });

  $('#pomodoroClock .sessionMinus').click(function() {
    clock.sessionMinuteMinus();
    $(".sessionLength").text(clock.getSessionLength());
  });

  $('#pomodoroClock .sessionPlus').click(function() {
    clock.sessionMinutePlus();
    $(".sessionLength").text(clock.getSessionLength());
  });

  $('#pomodoroClock .breakMinus').click(function() {
    clock.breakMinuteMinus();
    $(".breakLength").text(clock.getBreakLength());
  });

  $('#pomodoroClock .breakPlus').click(function() {
    clock.breakMinutePlus();
    $(".breakLength").text(clock.getBreakLength());
  });

  function sessionTimeRendering(seconds) {
    console.log("Session Rendering", seconds);
  }

  function breakTimeRendering(seconds) {
    console.log("Break Rendering", seconds);
  }

  clock.setSessionTimeCallback(sessionTimeRendering);
  clock.setBreakTimeCallback(breakTimeRendering);
})