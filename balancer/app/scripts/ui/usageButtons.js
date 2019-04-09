// Class used for setting button state.

class Buttons {
  constructor(state) {
    this.buttonStateDb = require('./db');
    this.gameBtn = document.getElementById('game-btn');
    this.studyBtn = document.getElementById('study-btn');
    this.gameLockBtn = document.getElementById('game-lock-btn');
    this.studyLockBtn = document.getElementById('study-lock-btn');

    this.setState(state);
  }

  setState(state) {
    this.buttonStateDb.setEntry(state);

    // Reset toggles to default toggle state.
    this.gameBtn.classList.remove('active');
    this.studyBtn.classList.remove('active');
    this.gameLockBtn.classList.remove('active');
    this.studyLockBtn.classList.remove('active');


    if (state.pressed === true) {
      if (state.mode === 'game') {
        this.gameBtn.classList.add('active');
        if (state.locked === true) {
          this.gameLockBtn.classList.add('active');
        }
      } else {
        if (state.mode === 'study') {
          this.studyBtn.classList.add('active');
          if (state.locked === true) {
            this.studyLockBtn.classList.add('active');
          }
        }
      }
    }
  }

  studyLockBtnFn() {
    const state = {
      timestamp: new Date(),
      pressed: true,
      mode: 'study',
      locked: true,
    };
    this.setState(state);
  }

  studyBtnFn() {
    const state = {
      timestamp: new Date(),
      pressed: true,
      mode: 'study',
      locked: false,
    };
    this.setState(state);
  }

  gameLockBtnFn() {
    const state = {
      timestamp: new Date(),
      pressed: true,
      mode: 'game',
      locked: true,
    };
    this.setState(state);
  }

  gameBtnFn() {
    const state = {
      timestamp: new Date(),
      pressed: true,
      mode: 'game',
      locked: false,
    };
    this.setState(state);
  }

}

semantic = {};
semantic.button = {};

// ready event
semantic.button.ready = function () {
  // selector cache
  var $buttons = $('.seven.wide.black.column .button');
  // alias
  handler = {
    activate: function () {
      $icon = $(this)
        .find('.icon');
      $icon.hasClass('open')
        ? $icon.removeClass('open')
        : $icon.addClass('open');
    }
  };

  $buttons.on('click', handler.activate);
};

// attach ready event
$(document)
  .ready(semantic.button.ready);

var time = document.getElementsByTagName('time')[0],
  time2 = document.getElementsByTagName('time2')[0],
  startGame = document.getElementById('game-lock-btn'),
  stopGame = document.getElementById('game-lock-btn'),
  startStudy = document.getElementById('study-lock-btn'),
  stopStudy = document.getElementById('study-lock-btn'),
  seconds = 0,
  minutes = 0,
  hours = 0,
  t;

function add() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }

  time.textContent = (hours ? (hours > 9 ? hours : '0' + hours) : '00') + ':' + (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);

  time2.textContent = (hours ? (hours > 9 ? hours : '0' + hours) : '00') + ':' + (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);

  timer();
}

function timer() {
  t = setTimeout(add, 1000);
}

timer();

/* Start game button */
startGame.onclick = timer;
/* Start study button */
startStudy.onclick = timer;

/* Stop game button */
stopGame.onclick = function () {
  clearTimeout(t);
};
/* Stop study button */
stopStudy.onclick = function () {
  clearTimeout(t);
};

module.exports = Buttons;
