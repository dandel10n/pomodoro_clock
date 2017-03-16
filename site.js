$(document).ready(function() {
  var clock = new pomodoroClock(10, 5);

  var minutes;

  $('.timer').html("timer");

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
    console.log("Session Rendering", new Date(seconds*1000).toUTCString().split(/ /)[4].slice(3));
  }

  function breakTimeRendering(seconds) {
    console.log("Break Rendering", new Date(seconds*1000).toUTCString().split(/ /)[4].slice(3));

  }

  clock.setSessionTimeCallback(sessionTimeRendering);
  clock.setBreakTimeCallback(breakTimeRendering);
})