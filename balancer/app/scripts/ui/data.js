const db = require('./db');

function getPercentGaming(percent, buttonStateDatabase) {
  percent = 50;
  let gameTime;
  getGameTime(gameTime, buttonStateDatabase);
  let studyTime;
  getStudyTime(studyTime, buttonStateDatabase);

  setTimeout(() => {
    if (!(studyTime === 0 && gameTime === 0)) {
      return 100 * gameTime / (studyTime + gameTime);
    }
  });
}

function getPercentStudying(percent, buttonStateDatabase) {
  return 100 - getPercentGaming(percent, buttonStateDatabase);
}

// returns time studying in minutes
function getStudyTime(time, buttonStateDatabase) {
  return getTime("study", time, buttonStateDatabase);
}

// returns time playing games in minutes
function getGameTime(time, buttonStateDatabase) {
  return getTime("game", time, buttonStateDatabase);
}

function getTime(mode, activityTime, buttonStateDatabase) {
  activityTime = 0;
  db.getAllEntries(function (docs) {
    let start = undefined;
    let end = undefined;
    docs.forEach(function (d) {

      if (d.mode === mode && d.pressed === true) {
        if (typeof (start) === "undefined") {
          start = d.toggledAt;
          console.log("starting ", d.mode, " at ", d.toggledAt);
        }
        // if it is not pressed or if it is the other mode
      } else if (typeof (start) !== 'undefined') {
        end = d.toggledAt;
        console.log("ending at ", d.toggledAt);
      }

      // if we have a start and an end for an activity, get the time in between (clicking the game button and then the
      // lock button for game will not change the activity, but it will change the button state)
      if (typeof (start) !== 'undefined' && typeof (end) !== 'undefined') {

        // get diff in minutes instead of milliseconds
        activityTime += (end - start) / 60000;
        console.log("current Activity time: ", activityTime);
        start = undefined;
        end = undefined;
      }
    });
  }, buttonStateDatabase);
}

setUp(undefined);

module.exports = {
  getGameTime,
  getStudyTime,
  getPercentGaming,
  getPercentStudying,
};

function setUp(buttonStateDatabase) {
  var gameTime = document.getElementById('gameTime');
  if (gameTime !== null) {
     getGameTime(gameTime.textContent, buttonStateDatabase);
  }

  var gamePercent = document.getElementById('gamePercent');
  if (gamePercent !== null) {
     getPercentGaming(gamePercent.textContent, buttonStateDatabase);
  }

  var studyTime = document.getElementById('studyTime');
  if (studyTime !== null) {
    getStudyTime(studyTime.textContent, buttonStateDatabase);
  }
  var studyPercent = document.getElementById('studyPercent');
  if (studyPercent !== null) {
    getPercentStudying(studyPercent.textContent, buttonStateDatabase);
  }
}

