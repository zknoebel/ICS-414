// Variables
// game div
const game = document.getElementById('game-btn');
// study div
const study = document.getElementById('study-btn');
//control row elements
const startTime = document.getElementById('times');
const reset = document.querySelector('.reset-btn');
// randoms for functions
var sec;
var min;
var gameId;
var studyId;
const gameSide = game.style.background;
const studySide = study.style.background;

const setTime = function (event) {
  document.getElementById('gameMin').innerHTML = document.getElementById('times').value;
  document.getElementById('studyMin').innerHTML = document.getElementById('times').value;
};
// reset button
const resetClick = function (event) {
  studyStop();
  gameStop();
  document.getElementById('gameMin').innerHTML = document.getElementById('times').value;
  document.getElementById('studyMin').innerHTML = document.getElementById('times').value;
  document.getElementById('gameSec').innerHTML = '00';
  document.getElementById('studySec').innerHTML = '00';
  game.style.background = gameSide;
  study.style.background = studySide;
  show();
  study.style.pointerEvents = 'auto';
  game.style.pointerEvents = 'none';
  times.style.pointerEvents = 'auto';
};
// alert: work in progress
const learning = function () {
  alert('Learning how to implement spacebar/keyboard control...check back in!');
};
// study second countdown
const gameCountdown2 = function () {
  sec = document.getElementById('gameSec').innerHTML;
  min = document.getElementById('gameMin').innerHTML;
  if (sec >= 11) {
    sec--;
    document.getElementById('gameSec').textContent = sec;
  }
  else {
    if (sec >= 1) {
      sec--;
      document.getElementById('gameSec').textContent = '0' + sec;
    }
    else {
      if (sec == 0 && min >= 1) {
        sec = 59;
        min--;
        document.getElementById('gameSec').textContent = sec;
        document.getElementById('gameMin').textContent = min;
      }
      else {
        alert("Time's up! Please switch it to the study mode.");
        study.style.background = 'red';
      }
    }
  }
};
// game second countdown
const studyCountdown2 = function () {
  sec = document.getElementById('studySec').innerHTML;
  min = document.getElementById('studyMin').innerHTML;
  if (sec >= 11) {
    sec--;
    document.getElementById('studySec').textContent = sec;
  }
  else {
    if (sec >= 1) {
      sec--;
      document.getElementById('studySec').textContent = '0' + sec;
    }
    else {
      if (sec == 0 && min >= 1) {
        sec = 59;
        min--;
        document.getElementById('studySec').textContent = sec;
        document.getElementById('studyMin').textContent = min;
      }
      else {
        alert("Time's up! Please switch it to the game mode.");
        game.style.background = 'red';
      }
    }
  }
  ;
};
// interval start study countdown
const gameCountdown = function () {
  studyId = setInterval(gameCountdown2, 1000);
};
// interval start game countdown
const studyCountdown = function () {
  gameId = setInterval(studyCountdown2, 1000);
};
// end study countdown
const gameStop = function () {
  clearInterval(studyId);
};
// end game countdown
const studyStop = function () {
  clearInterval(gameId);
};
// hide instructions at game start
const hide = function () {
  document.getElementById('startInstructions').style.display = 'none';
};
// show instructions at game reset
const show = function () {
  document.getElementById('startInstructions').style.display = 'block';
};
// hide mobile instructions
const hideMobile = function () {
  document.getElementById('mobileIns').style.display = 'none';
};
// show mobile instructions
const showMobile = function () {
  document.getElementById('mobileIns').style.display = 'block';
};
// study's function container function
const gameActive = function () {
  studyCountdown();
  gameStop();
  hide();
  hideMobile();
  study.style.pointerEvents = 'none';
  game.style.pointerEvents = 'auto';
  times.style.pointerEvents = 'none';
};
// game's function container function
const studyActive = function () {
  gameCountdown();
  studyStop();
  game.style.pointerEvents = 'none';
  study.style.pointerEvents = 'auto';
};


//EVENTS
// game side
game.addEventListener('click', studyActive);
// study side
study.addEventListener('click', gameActive);
// picking time control
startTime.addEventListener('change', setTime);
// alert: work in progress
window.addEventListener('keypress', learning);
// reset
reset.addEventListener('click', resetClick);

