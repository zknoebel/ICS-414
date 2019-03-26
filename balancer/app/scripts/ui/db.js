// database/button functions
const Datastore = require('nedb');
const path = require('path');
const buttonStateDb = require('./db');
const usageDbLocation = '../../resources/db/usage.db';
const usageDb = new Datastore({
  filename: path.join(__dirname, usageDbLocation),
  timestampData: true,
  autoload: true,
});

function setEntry(buttonState, buttonStateDatabase) {
  if (typeof(buttonStateDatabase)==='undefined') buttonStateDatabase = usageDb;

  buttonStateDatabase.insert(buttonState, function (err, doc) {
    console.log('Inserted', doc.toggledAt, 'with ID', doc._id);
  });
}

/**
 * remove an entry from the database
 */
function deleteEntry(timestamp, buttonStateDatabase) {
  if (typeof(buttonStateDatabase)==='undefined') buttonStateDatabase = usageDb;

  // delete a button state from the database
  buttonStateDatabase.remove({toggledAt: {timestamp}}, function (err, numDeleted) {
    console.log('Deleted', numDeleted, 'button state(s)');
  });
}

/**
 * clear the database
 */
function deleteAllEntries(buttonStateDatabase) {
  if (typeof(buttonStateDatabase)==='undefined') buttonStateDatabase = usageDb;

  // delete all button states from the database
  buttonStateDatabase.remove({}, {multi: true}, function (err, numDeleted) {
    console.log('Deleted', numDeleted, 'button state(s)');
  });
}


/**
 * get an entry from the database
 */
function getEntry(timestamp, myFunction, buttonStateDatabase) {
  if (typeof(buttonStateDatabase)==='undefined') buttonStateDatabase = usageDb;

  buttonStateDatabase.findOne({toggledAt: timestamp}, function (err, doc) {
    console.log('Found button state:', doc.toggledAt);
    myFunction(doc);
  });
}

/**
 * get the last entry from the database
 */
function getLastEntry(myFunction, buttonStateDatabase) {
  if (typeof(buttonStateDatabase)==='undefined') buttonStateDatabase = usageDb;

  buttonStateDatabase.find({}).sort({toggledAt: -1}).limit(1).exec(function (err, docs) {
    docs.forEach(function (d) {
      console.log('Found button states:', d.toggledAt);
    });
    myFunction(docs);
  });
}

/**
 * get all entries in the database, sorted from earliest to latest
 */
function getAllEntries(myFunction, buttonStateDatabase) {
  if (typeof(buttonStateDatabase)==='undefined') buttonStateDatabase = usageDb;

  buttonStateDatabase.find({}).sort({toggledAt: 1}).exec(function (err, docs) {
    docs.forEach(function (d) {
      console.log('Found button state:', d.toggledAt);
    });
    myFunction(docs);
  });

}

module.exports = {
  setEntry,
  deleteAllEntries,
  deleteEntry,
  getEntry,
  getLastEntry,
  getAllEntries,
};
