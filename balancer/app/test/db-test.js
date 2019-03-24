const QUnit = require('qunit');

const db = require('../scripts/ui/db');
const Datastore = require('nedb');
const path = require('path');
const usageDbLocation = 'usage.db';

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
QUnit.test("setEntry test", function (assert) {
  var done1 = assert.async();  // tell QUnit we're doing async actions

  // get a clean database
  db.deleteAllEntries(usageDb);

  // make sure no entries have been entered.
  db.getAllEntries(usageDb, function (docs) {
    let docSize = docs.length;
    console.log("Docs is ", docSize, " entries long.");
    assert.ok(docSize === 0, "Passed!");
    done1();  // using the function returned from `assert.async()` we
  });

  // input test data
  testData.forEach(function (entry) {
    console.log("Entering ", JSON.stringify(entry), "into the database");
    db.setEntry(usageDb, entry);
  });

  var done2 = assert.async();  // tell QUnit we're doing async actions

  // make sure that the number of entries equals the length of the test data array
  db.getAllEntries(usageDb, function (docs) {
    let docSize = docs.length;
    let testSize = testData.length;
    console.log("Docs is ", docSize, " entries long.");
    assert.ok(docSize === testSize, "Passed!");
    done2();
  });
});

// function deleteEntry(buttonStateDatabase, timestamp)
// function deleteAllEntries(buttonStateDatabase)
// function getEntry(buttonStateDatabase, timestamp)
// function getLastEntry(buttonStateDatabase)
// function getAllEntries(buttonStateDatabase)
