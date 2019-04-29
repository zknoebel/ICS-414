let db = require('./data');

let percent_gaming = db.getPercentGaming();
let percent_studying = db.getPercentStudying();

console.log(percent_gaming);
console.log(percent_studying);

var startStudyTimer;
var startGameTimer;
var continueStudyTimer;

let study_btn = document.getElementById('study-lock-btn');
let game_btn = document.getElementById('game-lock-btn');
let pause_btn = document.getElementById('pause-btn');
let reset_btn = document.getElementById('reset-btn');
let game_time = document.getElementById('game-time');
let study_time = document.getElementById('study-time');

function switchGreen() {
  document.getElementsByTagName('body')[0].style.backgroundColor = 'green';
  document.getElementsByTagName('body')[0].style.color = 'green';
}

function switchRed() {
  document.getElementsByTagName('body')[0].style.backgroundColor = 'red';
  document.getElementsByTagName('body')[0].style.color = 'red';
}

function switchPaleGoldenRod() {
  document.getElementsByTagName('body')[0].style.backgroundColor = 'palegoldenrod';
  document.getElementsByTagName('body')[0].style.color = 'palegoldenrod';
}


study_btn.addEventListener('click', (e) => {
  event.preventDefault();
  startStudyTimer = setInterval(() => {
    study_time.innerHTML = db.getPercentStudying() + ' %';
  }, 5000);

  study_btn.disabled = true;
  game_btn.disabled = false;
  pause_btn.disabled = false;
  reset_btn.disabled = false;

  game_time.style.borderColor = '#000000';
  study_time.style.borderColor = '#6cfc6e';
});


game_btn.addEventListener('click', (e) => {
  event.preventDefault();
  clearInterval(startStudyTimer);
  clearInterval(continueStudyTimer);

  startGameTimer = setInterval(() => {
    game_time.innerHTML = db.getPercentGaming() + ' %';
  }, 5000);

  study_time.style.borderColor = '#000000';
  game_time.style.borderColor = '#f94848';

  study_btn.disabled = false;
  game_btn.disabled = true;
  pause_btn.disabled = false;
  reset_btn.disabled = false;

});


reset_btn.addEventListener('click', (e) => {
  event.preventDefault();
  clearInterval(startStudyTimer);
  clearInterval(continueStudyTimer);
  clearInterval(startGameTimer);

  study_time.innerHTML = "0 %";
  game_time.innerHTML = "0 %";
  studyHours = 0;
  gameTime = 0;

  study_time.style.borderColor = '#000000';
  game_time.style.borderColor = '#000000';

  study_btn.disabled = false;
  game_btn.disabled = false;
  pause_btn.disabled = true;
  reset_btn.disabled = true;

});

pause_btn.addEventListener('click', (e) => {
  event.preventDefault();
  clearInterval(startGameTimer);
  clearInterval(startStudyTimer);

  study_time.style.borderColor = '#6cfc6e';
  game_time.style.borderColor = '#000000';
  study_btn.disabled = false;
  game_btn.disabled = false;
  pause_btn.disabled = true;
  reset_btn.disabled = false;

});

study_btn.onclick = switchGreen;
game_btn.onclick = switchRed;
pause_btn.onclick = switchPaleGoldenRod;
reset_btn.onclick = switchPaleGoldenRod;

