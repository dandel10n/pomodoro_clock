var pomodoroClock = function(sessionLength, breakLength) {

  var sessionTimerId = null;
  var breakTimerId = null;
  var self = this;
  var sessionCallback;
  var breakCallback;
  var nowIsRunning = null;
  var temporarySessionLength;
  var temporaryBreakLength;

  this.sessionMinutePlus = function() {
    sessionLength += 60;
    if (nowIsRunning === "session") {
      temporarySessionLength = sessionLength;
    }
  };

  this.sessionMinuteMinus = function() {
    sessionLength -= 60;
    //если была остановлена сессия
    if (nowIsRunning === "session") {
      temporarySessionLength = sessionLength;
    }
  };

  this.breakMinutePlus = function() {
    breakLength += 60;
    //если было остановлено время брейка
    if (nowIsRunning === "break") {
      temporaryBreakLength = breakLength;
    }
  };

  this.breakMinuteMinus = function() {
    breakLength -= 60;
    if (nowIsRunning === "break") {
      temporaryBreakLength = breakLength;
    }
  };

  this.getSessionLength = function() {
    return sessionLength;
  };

  this.getBreakLength = function() {
    return breakLength;
  };

  this.getCurrentTimerType = function() {
    if (nowIsRunning === "break") {
      return "break";
    } else if (nowIsRunning === "session") {
      return "session";
    } else {
      return null;
    }
  }

  this.setSessionTimeCallback = function(callback) {
    sessionCallback = callback;
  };

  this.setBreakTimeCallback = function(callback) {
    breakCallback = callback;
  }

  /*запускается при нажатии на часы*/
  this.startAndPause = function() {
    /*если оба таймера останослены(на паузе или еще не запускались)*/
    if (breakTimerId === null && sessionTimerId === null) {
      /*первый запуск*/
      if (nowIsRunning === null) {
        startSessionTimer();
      /*была остановлена сессия*/
      } else if (nowIsRunning === "session") {
        sessionTimerId = setInterval(sessionIntervalHandler, 1000);
      /*был остановлен перерыв*/
      } else if (nowIsRunning === "break") {
        breakTimerId = setInterval(breakIntervalHandler, 1000);
      }
    /*если сейчас идет сессия*/
    } else if (breakTimerId === null && sessionTimerId !== null) {
      clearInterval(sessionTimerId);
      sessionTimerId = null;
    /*если сейчас идет перерыв*/
    } else if (breakTimerId !== null && sessionTimerId === null) {
      clearInterval(breakTimerId);
      breakTimerId = null;
    }
  }

  function sessionIntervalHandler() {
    sessionCallback(temporarySessionLength);
    if (temporarySessionLength == 0) {
      clearInterval(sessionTimerId);
      sessionTimerId = null;
      startBreakTimer();
    }
    temporarySessionLength--;
  };

  function breakIntervalHandler() {
    breakCallback(temporaryBreakLength);
    if (temporaryBreakLength == 0) {
      clearInterval(breakTimerId);
      breakTimerId = null;
      startSessionTimer();
    }
    temporaryBreakLength--;
  }

  function startBreakTimer() {
    nowIsRunning = "break";
    temporaryBreakLength = breakLength;
    breakTimerId = setInterval(breakIntervalHandler, 1000);
  }

  function startSessionTimer() {
    nowIsRunning = "session";
    temporarySessionLength = sessionLength;
    sessionTimerId = setInterval(sessionIntervalHandler, 1000);
  }
}