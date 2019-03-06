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
  const { getBlendedSettingsSync } = require('./settings');
  const Buttons = require('./usageButtons');

  const usageDbLocation = '../db/usage.db';
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

  function setInitialButtonState() {
    buttons.setState(buttonState);
  }

  setInitialButtonState();
  // END wrapper
})();
