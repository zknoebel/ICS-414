// database/button functions

function setEntry(buttonStateDatabase, buttonState) {
  buttonStateDatabase.insert(buttonState, function (err, doc) {
    console.log('Inserted', doc.toggledAt, 'with ID', doc._id);
  });
}

/**
 * remove an entry from the database
 */
function deleteEntry(buttonStateDatabase, timestamp) {
  // delete a button state from the database
  buttonStateDatabase.remove({toggledAt: {timestamp}}, function (err, numDeleted) {
    console.log('Deleted', numDeleted, 'button state(s)');
  });
}

/**
 * clear the database
 */
function deleteAllEntries(buttonStateDatabase) {
  // delete all button states from the database
  buttonStateDatabase.remove({}, {multi: true}, function (err, numDeleted) {
    console.log('Deleted', numDeleted, 'button state(s)');
  });
}


/**
 * get an entry from the database
 */
function getEntry(buttonStateDatabase, timestamp) {
  buttonStateDatabase.findOne({toggledAt: timestamp}, function (err, doc) {
    console.log('Found button state:', doc.toggledAt);
    return doc;
  });
}

/**
 * get the last entry from the database
 */
function getLastEntry(buttonStateDatabase) {
  buttonStateDatabase.find({}).sort({toggledAt: -1}).limit(1).exec(function (err, docs) {
    docs.forEach(function (d) {
      console.log('Found button states:', d.toggledAt);
      return docs;
    });
  });
}

/**
 * get all entries in the database
 * @param buttonStateDatabase
 * @returns {*}
 */
function getAllEntries(buttonStateDatabase, myFunction) {
  buttonStateDatabase.find({}, function (err, docs) {
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
