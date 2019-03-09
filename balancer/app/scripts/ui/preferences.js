// Main script to be run for preferences.html

(() => {
  // START wrapper to preserve global space.

  const {
    getDefaultSettingsSync,
    getBlendedSettingsSync,
    setSettingsSync,
    settingsSchema,
  } = require('./settings');

  /**
   * Populate each form input with its current value from settings.
   */
  function setFormInputPlaceholders() {
    const settings = getBlendedSettingsSync();

    Object.keys(settings).forEach((key) => {
      const nodes = document.getElementsByName(key);

      nodes.forEach((node) => {
        if (node.type && node.type === 'checkbox') {
          node.checked = settings[key];
        } else {
          node.value = settings[key];
        }
      });
    });
  }

  /**
   * Reset Button onClick function.
   * Reset all settings back to app default settings.
   */
  function onResetSettingsButtonClick() {
    const defaultSettings = getDefaultSettingsSync();
    setSettingsSync(defaultSettings);
    setFormInputPlaceholders();
  }

  /**
   * Submit button onClick function.
   * This function:
   * 1. Collects all data from the form.
   * 2. Validates the data.
   * 3. Report any form validation errors.
   * 4. If no errors, write all settings to user settings file.
   */
  function onSubmitSettingsButtonClick() {

  }


  // / Main routines

  setFormInputPlaceholders();

  // Set button onclick functions.
  document.getElementById('preferences-submit-btn').onclick = onSubmitSettingsButtonClick;
  document.getElementById('preferences-reset-btn').onclick = onResetSettingsButtonClick;

  // END wrapper
})();
