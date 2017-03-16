$(document).ready(function() {
  var clock = new pomodoroClock(10, 5);

  $("#pomodoroClock .clock").click(function() {
    clock.startAndPause();
    $(".button").prop("disabled", !$(".button").prop("disabled"));
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
    $(".title").text("Session");
    $(".timer").text(new Date(seconds*1000).toUTCString().split(/ /)[4].slice(3));
  }

  function breakTimeRendering(seconds) {
    $(".title").text("Break");
    $(".timer").text(new Date(seconds*1000).toUTCString().split(/ /)[4].slice(3));

  }

  clock.setSessionTimeCallback(sessionTimeRendering);
  clock.setBreakTimeCallback(breakTimeRendering);
})