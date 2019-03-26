const QUnit = require('qunit');

const Datastore = require('nedb');
const path = require('path');
const usageDbLocation = 'data-test-usage.db';
const data = require('../scripts/ui/data')
const db = require('../scripts/ui/db')

// set up test database
const usageDb = new Datastore({
  filename: path.join(__dirname, usageDbLocation),
  timestampData: true,
  autoload: true,
});

const testData = [
  {
    toggledAt: new Date("2019-03-24T01:40:29.705Z"),
    pressed: false,
    mode: 'study',
    locked: false,
  },
  {
    toggledAt: new Date("2019-03-24T05:50:00.000Z"),
    pressed: true,
    mode: 'game',
    locked: false,
  },
  {
    toggledAt: new Date("2019-03-24T06:20:00.000Z"),
    pressed: true,
    mode: 'game',
    locked: false,
  },
  {
    toggledAt: new Date("2019-03-24T06:50:00.000Z"),
    pressed: true,
    mode: 'study',
    locked: false,
  },
  {
    toggledAt: new Date("2019-03-24T07:50:00.000Z"),
    pressed: true,
    mode: 'game',
    locked: false,
  },
  {
    toggledAt: new Date("2019-03-24T08:50:00.000Z"),
    pressed: false,
    mode: 'game',
    locked: false,
  },
];

QUnit.test("getStudyTime test", function (assert) {
  resetDatabase();
  const studyTime = data.getStudyTime(usageDb);

  // 60 minutes of study time
  assert.ok(studyTime === 60, "Assertion 1");
});

QUnit.test("getGameTime test", function (assert) {
  resetDatabase();
  const gameTime = data.getGameTime(usageDb);

  // 120 minutes of study time
  assert.ok(gameTime === 120, "Assertion 1");
});

QUnit.test("getPercentGaming test", function (assert) {
  resetDatabase();
  const percentage = data.getPercentGaming(usageDb);

  // twice as much time gaming as studying
  assert.equal(percentage, 200 / 3, "Assertion 1");
});

QUnit.test("getPercentStudying test", function (assert) {
  resetDatabase();
  const percentage = data.getPercentStudying(usageDb);

  // twice as much time gaming as studying
  assert.equal(percentage, 100 / 3, "Assertion 1");
});

function resetDatabase() {
  db.deleteAllEntries(usageDb);
  testData.forEach(function (d) {
    db.setEntry(d, usageDb);
  });
}
