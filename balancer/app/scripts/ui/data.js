const db = require('./db');

function getPercentGaming(buttonStateDatabase) {
  const gameTime = getGameTime(buttonStateDatabase);
  const studyTime = getStudyTime(buttonStateDatabase);

  if (studyTime === 0 && gameTime === 0) {
    return 50;
  } else {
    return 100 * gameTime / (studyTime + gameTime);
  }
}

function getPercentStudying(buttonStateDatabase) {
  return 100 - getPercentGaming(buttonStateDatabase);
}

// returns time studying in minutes
function getStudyTime(buttonStateDatabase) {
  return getTime("study", buttonStateDatabase);
}

// returns time playing games in minutes
function getGameTime(buttonStateDatabase) {
  return getTime("game", buttonStateDatabase);
}

function getTime(mode, buttonStateDatabase) {
  let activityTime = 0;
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
  return activityTime;
}

module.exports = {
  getGameTime,
  getStudyTime,
  getPercentGaming,
  getPercentStudying,
};
