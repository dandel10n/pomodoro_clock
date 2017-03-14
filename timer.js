var pomodoroClock = function() {

  var sessionLength = 10;
  var breakLength = 5;
  var sessionTimerId = null;
  var breakTimerId = null;
  var self = this;

  var nowIsRunning = null;

  this.sessionMinutes = 10;
  this.breakMinutes = 5;

  this.stopTimer = function() {};

  this.sessionMinutePlus = function() {
    sessionLength += 1;
  };

  this.sessionMinuteMinus = function() {
    sessionLength -= 1;
  };

  this.breakMinutePlus = function() {
    breakLength += 1;
  };
  this.breakMinuteMinus = function() {
    breakLength -= 1;
  };

  this.getSessionLength = function() {
    return sessionLength;
  };

  this.getBreakLength = function() {
    return breakLength;
  };

  function sessionIntervalHandler() {
    console.log('Session:', sessionLength);
    if (sessionLength == 0) {
      clearInterval(sessionTimerId);
      sessionTimerId = null;
      startBreakTimer();
    }
    sessionLength--;
  };

  function breakIntervalHandler() {
    console.log('Break:', breakLength);
    if (breakLength == 0) {
      clearInterval(breakTimerId);
      breakTimerId = null;
      startSessionTimer();
    }
    breakLength--;
  }

  function startBreakTimer() {
    nowIsRunning = "break";
    breakLength = self.breakMinutes;
    breakTimerId = setInterval(breakIntervalHandler, 1000);
  }

  function startSessionTimer() {
    nowIsRunning = "session";
    sessionLength = self.sessionMinutes;
    sessionTimerId = setInterval(sessionIntervalHandler, 1000);
  }

  /*запускается при нажатии на часы*/
  this.pause = function() {
    /*если оба таймера останослены(не важно на паузе или еще не запускались)*/
    if (breakTimerId === null && sessionTimerId === null) {
      /*была остановлена сессия или не шло ничего(первый запуск)*/
      if (nowIsRunning === null || nowIsRunning === "session") {
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
}