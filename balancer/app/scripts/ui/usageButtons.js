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

  static studyLockBtnFn() {
    const state = {
      timestamp: new Date(),
      pressed: true,
      mode: 'study',
      locked: true,
    };
    require('./db')
      .setEntry(state);
  }

  static studyBtnFn() {
    const state = {
      timestamp: new Date(),
      pressed: true,
      mode: 'study',
      locked: false,
    };
    require('./db')
      .setEntry(state);
  }

  static gameLockBtnFn() {
    const state = {
      timestamp: new Date(),
      pressed: true,
      mode: 'game',
      locked: true,
    };
    require('./db')
      .setEntry(state);
  }

  static gameBtnFn() {
    const state = {
      timestamp: new Date(),
      pressed: true,
      mode: 'game',
      locked: false,
    };
    require('./db')
      .setEntry(state);
  }

}

/*
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
*/

/*
var time = document.getElementsByTagName('time')[0],
  time2 = document.getElementsByTagName('time2')[0],
  startGame = document.getElementById('game-btn'),
  stopGame = document.getElementById('game-lock-btn'),
  startStudy = document.getElementById('study-btn'),
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

//Start game button
startGame.onclick = timer;


//top game button
stopGame.onclick = function () {
  clearTimeout(t);
};

//Start study button
startStudy.onclick = timer;

//Stop study button
stopStudy.onclick = function () {
  clearTimeout(t);
}
*/

//module.exports = Buttons;
// TimeRecord functions...
var TimeRecord = function (elem, options) {
  var timer = createTimer(),
    startButton = createButton('Start   |', start),
    stopButton = createButton('Finish   |', stop),
    resetButton = createButton('Reset', reset),
    offset,
    clock,
    interval;

  // default options
  options = options || {};
  options.delay = options.delay || 1;

  // append elements
  elem.appendChild(timer);
  elem.appendChild(startButton);
  elem.appendChild(stopButton);
  elem.appendChild(resetButton);

  // initialize
  reset();

  // private functions
  function createTimer() {
    return document.createElement('span');
  }

  function createButton(action, handler) {
    var a = document.createElement('a');
    a.href = '#' + action;
    a.innerHTML = action;
    a.addEventListener('click', function (event) {
      handler();
      event.preventDefault();
    });
    return a;
  }

  function start() {
    if (!interval) {
      offset = Date.now();
      interval = setInterval(update, options.delay);
    }
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
    clock = 0;
    render(0);
  }

  function update() {
    clock += delta();
    render();
  }

  function render() {
    var h = Math.floor(clock / (1000 * 60 * 60)) % 24;
    var m = Math.floor(clock / (1000 * 60)) % 60;
    var s = Math.floor(clock / 1000) % 60;
    var ms = Math.floor(clock % 1000);

    if (h < 10) {
      h = '0' + h;
    }
    if (m < 10) {
      m = '0' + m;
    }
    if (s < 10) {
      s = '0' + s;
    }
    if (ms < 100) {
      ms = '0' + ms;
    }
    if (ms < 10) {
      ms = '0' + ms;
    }

    timer.innerHTML = h + ':' + m + ':' + s + '::' + ms;

  }

  function delta() {
    var now = Date.now(),
      d = now - offset;

    offset = now;
    return d;
  }

  this.start = start;
  this.stop = stop;
  this.reset = reset;
};


var elems = document.getElementsByClassName('basic');
for (var i = 0, len = elems.length; i < len; i++) {
  new TimeRecord(elems[i]);
}


//click one btn, stop all other watch
$('#btngroup button')
  .live('click', function () {
    var btnClicked = $(this)
      .index();
    $('.basic')
      .each(function (index) {
        if (btnClicked == index) {
          $(this)
            .find('a:eq(0)')[0].click();
        } else {
          $(this)
            .find('a:eq(1)')[0].click();
        }
      });
  });
