const QUnit = require('qunit');

const db = require('../scripts/ui/db');
const Datastore = require('nedb');
const path = require('path');
const usageDbLocation = 'db-test-usage.db';

// set up test database
const usageDb = new Datastore({
  filename: path.join(__dirname, usageDbLocation),
  timestampData: true,
  autoload: true,
});

const testData = [
  {
    toggledAt: new Date("2019-03-24T01:40:29.705Z"),
    pressed: true,
    mode: 'study',
    locked: false,
  },
  {
    toggledAt: new Date("2019-03-24T05:53:29.705Z"),
    pressed: false,
    mode: 'game',
    locked: false,
  },
  {
    toggledAt: new Date("2019-03-24T01:36:29.705Z"),
    pressed: true,
    mode: 'game',
    locked: false,
  },
  {
    toggledAt: new Date("2019-03-24T01:53:29.705Z"),
    pressed: true,
    mode: 'game',
    locked: true,
  },
  {
    toggledAt: new Date("2019-03-25T07:53:29.705Z"),
    pressed: false,
    mode: 'study',
    locked: false,
  },
  {
    toggledAt: new Date("2019-03-25T05:53:29.705Z"),
    pressed: true,
    mode: 'study',
    locked: false,
  },
];

// function setEntry(buttonStateDatabase, buttonstate)
QUnit.test("deleteAllEntries, getAllEntries, setEntry test", function (assert) {
  const done1 = assert.async();  // tell QUnit we're doing async actions

  // get a clean database
  db.deleteAllEntries(usageDb);

  // make sure no entries have been entered.
  db.getAllEntries(function (docs) {
    let docSize = docs.length;
    console.log("Docs is ", docSize, " entries long.");
    assert.ok(docSize === 0, "Assertion 1");
    done1();  // using the function returned from `assert.async()
  }, usageDb);

  // input test data
  testData.forEach(function (entry) {
    db.setEntry(entry, usageDb);
  });

  const done2 = assert.async();  // tell QUnit we're doing async actions

  // make sure that the number of entries equals the length of the test data array
  db.getAllEntries(function (docs) {
    let docSize = docs.length;
    let testSize = testData.length;
    console.log("Docs is ", docSize, " entries long.");
    assert.ok(docSize === testSize, "Assertion 2");
    done2();
  }, usageDb);
});

// function getEntry(buttonStateDatabase, timestamp)
QUnit.test("getEntry, getLastEntry test", function (assert) {
  const done1 = assert.async();  // tell QUnit we're doing async actions

  // get a clean database
  db.deleteAllEntries(usageDb);

  // make sure no entries have been entered.
  db.getAllEntries(function (docs) {
    let docSize = docs.length;
    console.log("Docs is ", docSize, " entries long.");
    assert.ok(docSize === 0, "Assertion 1");
    done1();  // using the function returned from `assert.async()
  }, usageDb);

  // input test data
  testData.forEach(function (entry) {
    db.setEntry(entry, usageDb);
  });

  const done2 = assert.async();  // tell QUnit we're doing async actions

  // the entries are out out order, make sure it sorts and returns correct value
  db.getLastEntry(function (doc) {
    console.log("current doc value: ", JSON.stringify(doc));
    let currentTime = JSON.stringify(doc[0].toggledAt);
    let testValue = JSON.stringify(new Date("2019-03-25T07:53:29.705Z"));

    assert.ok(currentTime === testValue, "Assertion 2");
    done2();
  }, usageDb);

  const done3 = assert.async();  // tell QUnit we're doing async actions

  db.getEntry(new Date("2019-03-25T07:53:29.705Z"),function (doc) {
    let currentPressedValue = JSON.stringify(doc.pressed);
    let currentModeValue = JSON.stringify(doc.mode);
    let currentLockedValue = JSON.stringify(doc.locked);
    let testPressedValue = JSON.stringify(testData[4].pressed);
    let testModeValue = JSON.stringify(testData[4].mode);
    let testLockedValue = JSON.stringify(testData[4].locked);

    assert.ok(currentPressedValue === testPressedValue, "Assertion 3.1");
    assert.ok(currentModeValue === testModeValue, "Assertion 3.2");
    assert.ok(currentLockedValue === testLockedValue, "Assertion 3.3");
    done3();
  }, usageDb);
});
