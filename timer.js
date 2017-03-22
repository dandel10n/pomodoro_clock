function PomodoroClock(sessionLength, breakLength) {
  this._sessionTimerId = null;
  this._breakTimerId = null;
  this._sessionCallback = null;
  this._breakCallback = null;
  this._currentTimerType = null;
  this._temporarySessionLength;
  this._temporaryBreakLength;
  this._sessionLength = sessionLength;
  this._breakLength = breakLength;
}

PomodoroClock.prototype.sessionMinutePlus = function() {
  this._sessionLength += 60;
  if (this._currentTimerType === "session") {
    this._temporarySessionLength = this._sessionLength;
  }
};

PomodoroClock.prototype.sessionMinuteMinus = function() {
  if (this._sessionLength > 60) {
    this._sessionLength -= 60;
  } else {
    this._sessionLength = 60;
  }
  //если была остановлена сессия
  if (this._currentTimerType === "session") {
    this._temporarySessionLength = this._sessionLength;
  }
};

PomodoroClock.prototype.breakMinutePlus = function() {
  this._breakLength += 60;
  //если было остановлено время брейка
  if (this._currentTimerType === "break") {
    this._temporaryBreakLength = this._breakLength;
  }
};

PomodoroClock.prototype.breakMinuteMinus = function() {
  if (this._breakLength > 60) {
    this._breakLength -= 60;
  } else {
    this._breakLength = 60;
  }
  if (this._currentTimerType === "break") {
    this._temporaryBreakLength = this._breakLength;
  }
};

PomodoroClock.prototype.getSessionLength = function() {
  return this._sessionLength;
};

PomodoroClock.prototype.getBreakLength = function() {
  return this._breakLength;
};

PomodoroClock.prototype.getCurrentTimerType = function() {
  return this._currentTimerType;
}

PomodoroClock.prototype.setSessionTimeCallback = function(callback) {
  this._sessionCallback = callback;
};

PomodoroClock.prototype.setBreakTimeCallback = function(callback) {
  this._breakCallback = callback;
}

/*запускается при нажатии на часы*/
PomodoroClock.prototype.startAndPause = function() {
  /*если оба таймера останослены(на паузе или еще не запускались)*/
  if (this._breakTimerId === null && this._sessionTimerId === null) {
    /*первый запуск*/
    if (this._currentTimerType === null) {
      this.startSessionTimer();
    /*была остановлена сессия*/
    } else if (this._currentTimerType === "session") {
      this._sessionTimerId = setInterval(this.sessionIntervalHandler.bind(this), 1000);
    /*был остановлен перерыв*/
    } else if (this._currentTimerType === "break") {
      this._breakTimerId = setInterval(this.breakIntervalHandler.bind(this), 1000);
    }
  /*если сейчас идет сессия*/
  } else if (this._breakTimerId === null && this._sessionTimerId !== null) {
    clearInterval(this._sessionTimerId);
    this._sessionTimerId = null;
  /*если сейчас идет перерыв*/
  } else if (this._breakTimerId !== null && this._sessionTimerId === null) {
    clearInterval(this._breakTimerId);
    this._breakTimerId = null;
  }
}

PomodoroClock.prototype.sessionIntervalHandler = function() {
  this._sessionCallback(this._temporarySessionLength);
  if (this._temporarySessionLength == 0) {
    clearInterval(this._sessionTimerId);
    this._sessionTimerId = null;
    this.startBreakTimer();
  }
  this._temporarySessionLength--;
};

PomodoroClock.prototype.breakIntervalHandler = function() {
  this._breakCallback(this._temporaryBreakLength);
  if (this._temporaryBreakLength == 0) {
    clearInterval(this._breakTimerId);
    this._breakTimerId = null;
    this.startSessionTimer();
  }
  this._temporaryBreakLength--;
}

PomodoroClock.prototype.startBreakTimer = function() {
  this._currentTimerType = "break";
  this._temporaryBreakLength = this._breakLength;
  this._breakTimerId = setInterval(this.breakIntervalHandler.bind(this), 1000);
}

PomodoroClock.prototype.startSessionTimer = function() {
  this._currentTimerType = "session";
  this._temporarySessionLength = this._sessionLength;
  this._sessionTimerId = setInterval(this.sessionIntervalHandler.bind(this), 1000);
}