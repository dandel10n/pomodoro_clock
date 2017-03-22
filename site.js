$(document).ready(function() {
  var clock = new PomodoroClock(1500, 300);

  $("#pomodoroClock .clock").click(function() {
    clock.startAndPause();
    $(".button").prop("disabled", !$(".button").prop("disabled"));
  });

  $('#pomodoroClock .sessionMinus').click(function() {
    clock.sessionMinuteMinus();
    $(".sessionLength").text(formateSecondsintoMinutes(clock.getSessionLength()));
    sessionTimeUpdating();
  });

  $('#pomodoroClock .sessionPlus').click(function() {
    clock.sessionMinutePlus();
    $(".sessionLength").text(formateSecondsintoMinutes(clock.getSessionLength()));
    sessionTimeUpdating();
  });

  $('#pomodoroClock .breakMinus').click(function() {
    clock.breakMinuteMinus();
    $(".breakLength").text(formateSecondsintoMinutes(clock.getBreakLength()));
    breakTimeUpdating();
  });

  $('#pomodoroClock .breakPlus').click(function() {
    clock.breakMinutePlus();
    $(".breakLength").text(formateSecondsintoMinutes(clock.getBreakLength()));
    breakTimeUpdating();
  });

  function breakTimeUpdating() {
    if (clock.getCurrentTimerType() === "break") {
      $(".timer").text(formateSecondsintoMinutes(clock.getBreakLength()));
    }
  }

  function sessionTimeUpdating() {
    if (clock.getCurrentTimerType() === "session" || clock.getCurrentTimerType() === null) {
      $(".timer").text(formateSecondsintoMinutes(clock.getSessionLength()));
    }
  }

  function sessionTimeRendering(seconds) {
    $(".title").text("Session");
    $(".timer").text(formateSecondsintoTimer(seconds));
    $(".complite").css("height", 100 - seconds/clock.getSessionLength()*100 + "%");
  }

  function breakTimeRendering(seconds) {
    $(".title").text("Break");
    $(".timer").text(formateSecondsintoTimer(seconds));
    $(".complite").css("backgroundColor", "#ccff99")
    $(".complite").css("height", 100 - seconds/clock.getBreakLength()*100 + "%");
  }

  function formateSecondsintoTimer(seconds) {
    return new Date(seconds*1000).toUTCString().split(/ /)[4].slice(3);
  }

  function formateSecondsintoMinutes(seconds) {
    return seconds/60;
  }

  clock.setSessionTimeCallback(sessionTimeRendering);
  clock.setBreakTimeCallback(breakTimeRendering);
})