var pomodoroClock = function() {
  var sessionLength = 25;
  var breakLength = 5;

  this.startTimer = function() {};
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

  //this.workTimeIsOver = function() {};
  //this.breakTimeIsOver = function() {};
}