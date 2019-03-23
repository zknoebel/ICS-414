// Main script to be run for home.html

// The four main buttons are logically connected, and thus share 1 state.
// state:
// {
//   toggledAt: Date,
//   pressed: boolean,
//   mode: enum - 'game'/'study',
//   locked: boolean,
// }

(() => {
  // START wrapper to preserve global space.

  const Datastore = require('nedb');
  const path = require('path');
  const {getBlendedSettingsSync} = require('./settings');
  const buttonStateDb = require('./db');
  const Buttons = require('./usageButtons');

  const usageDbLocation = '../../resources/db/usage.db';
  const usageDb = new Datastore({
    filename: path.join(__dirname, usageDbLocation),
    timestampData: true,
  });
  const settings = getBlendedSettingsSync();

  const buttonState = {
    timestamp: new Date(),
    pressed: false,
    mode: '',
    locked: false,
  };

  const buttons = new Buttons(buttonState);

  function setDefaultButtonState() {
    setButtonState(buttonState)
  }

  function setButtonState(database, buttonState) {
    // set button state
    buttons.setState(buttonState);

    // add new button state to the database //todo
    buttonStateDb.setEntry(usageDb, buttonState)
  }

  setDefaultButtonState();

  usageDb.loadDatabase(function (err) {
  });



  // todo: call setDefaultButtonState() when the program ends so that we don't assume users are continuing their selected activity between runs


  // END wrapper
})();

