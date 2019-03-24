const QUnit = require('qunit');
const settings = require('../scripts/ui/settings');


// function getDefaultSettingsSync()
QUnit.test("getDefaultSettingsSync test", function (assert) {
  const defaultSettings = settings.getDefaultSettingsSync();
  const str = JSON.stringify(defaultSettings);
  console.log(str);
  assert.ok(str.length > 0, "Passed!");

});

// function getSettingsSync()
QUnit.test("getSettingsSync test", function (assert) {
  const userSettings = settings.getSettingsSync();
  const str = JSON.stringify(settings);
  console.log(str);
  assert.ok(str.length > 0, "Passed!");

});

// function getBlendedSettingsSync()
QUnit.test("getBlendedSettingsSync test", function (assert) {
  const defaultSettings = settings.getDefaultSettingsSync();
  const userSettings = settings.getSettingsSync();
  const blendedSettings = settings.getBlendedSettingsSync();
  const str = JSON.stringify(blendedSettings);
  console.log(str);

  assert.ok(str.length > 0, "Passed!");

});

// function setSettingsSync(settings)
QUnit.test("setSettingsSync test", function (assert) {
//todo: change the settings file location so it does not overwrite the original
  const testSettings = {
    "gamingAllowance":66,
    "workAllowance":666,
    "activeModeDuration":66,
    "enableYeelightConnectivity":true,
    "yeelightLocalAddress":"",
    "brightness":66,
    "gamingWorkRatio":66,
    "daysBeforeReset":6
  };

  const originalSettings = settings.getSettingsSync();
  const originalSettingsString = JSON.stringify(originalSettings);

  settings.setSettingsSync(testSettings);

  const newSettings = settings.getSettingsSync();
  const newSettingsString = JSON.stringify(newSettings);

  //reset original settings file
  settings.setSettingsSync(originalSettings);

  assert.notEqual(originalSettingsString, newSettingsString, "Passed!");
  assert.equal(originalSettingsString, JSON.stringify(settings.getSettingsSync()));


});
