// database/button functions

function setEntry(buttonStateDatabase, buttonstate){
  buttonStateDatabase.insert(buttonState, function(err, doc) {
    console.log('Inserted', doc.name, 'with ID', doc._id);
  });
}

/**
 * remove an entry from the database
 */
function deleteEntry(buttonStateDatabase, timestamp) {
  // delete a button state from the database
  buttonStateDatabase.remove({ timestamp: { timestamp } }, function(err, numDeleted) {
    console.log('Deleted', numDeleted, 'button state(s)');
  });
}

/**
 * clear the database
 */
function deleteAllEntries(buttonStateDatabase) {
  // delete all button states from the database
  buttonStateDatabase.remove({}, { multi: true }, function(err, numDeleted) {
    console.log('Deleted', numDeleted, 'button state(s)');
  });
}


/**
 * get an entry from the database
 */
function getEntry(buttonStateDatabase, timestamp) {
  buttonStateDatabase.findOne({ timestamp: timestamp }, function(err, doc) {
    console.log('Found user:', doc.name);
  });
}

/**
 * get the last entry from the database
 */
function getLastEntry(buttonStateDatabase) {
  users.find({}).sort({timestamp: -1}).limit(1).exec(function(err, docs) {
    //todo doesn't need forEach
    docs.forEach(function(d) {
      console.log('Found user:', d.name);
    });
  });


}



module.exports = {
  setEntry,
  deleteAllEntries,
  deleteEntry,
  getEntry,
  getLastEntry,
};
