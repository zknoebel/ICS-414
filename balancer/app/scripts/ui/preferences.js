// Main script to be run for preferences.html

(() => {
  // START wrapper to preserve global space.

  const {getBlendedSettingsSync, setSettingsSync} = require('./settings');


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


  function savePreferences() {
    const settings = getBlendedSettingsSync();

    Object.keys(settings).forEach((key) => {
      const nodes = document.getElementsByName(key);

      nodes.forEach((node) => {
        if (node.type && node.type === 'checkbox') {
          settings[key] = node.checked;
        } else {
          settings[key] = node.value;
        }
      });
    });

    console.log(settings);
    setSettingsSync(settings);
  }


  setFormInputPlaceholders();

  const theUpdateButton = document.getElementById("theUpdateButton");
  theUpdateButton.onclick = savePreferences;

  // END wrapper
})();
