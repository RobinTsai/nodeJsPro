var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/myproject';

// define insert document function
var insertDoc = function(db, callback) {
  var collection = db.collection('document');

  collection.insertMany([
    {a: 1}, {a: 2}, {a: 3}
  ], function(err, result) {
    assert.equal(null, err);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log('Insert 3 document into the document collection');
    callback(result);
  })
}

// define update document function
var updateDoc = function(db, callback) {
  var collection = db.collection('document');

  collection.updateOne(
    {a: 2},
    {$set: {b: 1}}, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log('Update the document with field a=2');
      callback(result);
    }
  );
}

// define remove document function
var removeDoc = function(db, callback) {
  var collection = db.collection('document');

  collection.deleteOne(
    {a: 3},
    function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log('Removed the document with field a=3');
      callback(result);
    }
  );
}

var findDocs = function(db, callback) {
  var collection = db.collection('document');

  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log('Found the following ' + docs.length + ' record(s)');
    console.dir(docs);
    callback(docs);
  });
}

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected correctly to server');

  // insertDoc(db, function() {
  //   console.log('succeed');
  //   db.close();  // If close func is out of insertDoc(), will throw error. Maybe asyn
  // });

  // updateDoc(db, function() {
  //   db.close();
  // });

  // removeDoc(db, function() {
  //   db.close();
  // });

  findDocs(db, function() {
    db.close();
  })
});
