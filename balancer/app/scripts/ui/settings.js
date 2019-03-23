// Helper functions for working with settings.

const fs = require('fs');
const path = require('path');

const defaultSettingsPath = '../../resources/data/default.settings.json';
const settingsPath = '../../resources/data/settings.json';

/**
 * Returns JavaScript object containing default settings.
 */
function getDefaultSettingsSync() {
  const fileContents = fs.readFileSync(path.join(__dirname, defaultSettingsPath));
  return JSON.parse(fileContents);
}

/**
 * Returns JavaScript object containing settings.
 */
function getSettingsSync() {
  // if user defined settings are non-existent or blank, return default settings
  let fileContents;
  let parsedContents;
  let defaultContents = getDefaultSettingsSync();
  try {
    fileContents = fs.readFileSync(path.join(__dirname, settingsPath));
    parsedContents = JSON.parse(fileContents);
    if (Object.keys(parsedContents).length === 0) {
      parsedContents = defaultContents;
    }

  } catch (err) {
    if (err.code === 'ENOENT') {
      parsedContents = defaultContents;
    } else {
      throw err;
    }
  }

  return parsedContents;
}

/**
 * Returns JavaScript object containing blended settings.
 */
function getBlendedSettingsSync() {
  const defaultSettings = getDefaultSettingsSync();
  const settings = getSettingsSync();

  // Update default settings object.
  return Object.assign(defaultSettings, settings);
}

/**
 * Writes settings to file.
 */
function setSettingsSync(settings) {
  const currentSettings = getSettingsSync();
  const updatedSettings = Object.assign(currentSettings, settings);
  fs.writeFileSync(path.join(__dirname, settingsPath), JSON.stringify(updatedSettings));
}

module.exports = {
  getDefaultSettingsSync,
  getBlendedSettingsSync,
  getSettingsSync,
  setSettingsSync,
};
