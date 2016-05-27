var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/tasklist';

var findDocs = function(db, collectionName, callback) {
  var collection = db.collection(collectionName);

  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log('Found the following ' + docs.length + ' record(s)');
    console.dir(docs);
    callback(docs);
  });
}

var manageDatabase = function(manageDoc, collectionName) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err, 'Connecting server error.');

    manageDoc(db, collectionName, function() {
      db.close();
    })
  });
}

manageDatabase(findDocs, 'document');
