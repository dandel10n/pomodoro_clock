$(document).ready(function() {
  var clock = new pomodoroClock();

  $('.timer').html(clock.sessionMinutes + ":00");

  $("#pomodoroClock .clock").click(function() {
    clock.pause();
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

})