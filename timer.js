var pomodoroClock = function() {
  var sessionLength = 10;
  var breakLength = 5;
  var sessionTimerId;
  var breakTimerId;
  var self = this;

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

  function sessionIntervalHandler(sessionTime) {
    return function(){
      console.log('Session:', sessionTime);
      if (sessionTime == 0) {
        clearInterval(sessionTimerId);
        startBreakTimer();
      }
      sessionTime--;
    }
  };

  function breakIntervalHandler(breakTime) {
    return function(){
      console.log('Break:', breakTime);
      if (breakTime == 0) {
        clearInterval(breakTimerId);
        self.startSessionTimer();
      }
      breakTime--;
    }
  }

  function startBreakTimer() {
    breakTimerId = setInterval(breakIntervalHandler(breakLength), 1000);
  }

  this.startSessionTimer = function() {
    sessionTimerId = setInterval(sessionIntervalHandler(sessionLength), 1000);
  }
}