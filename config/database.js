//module.exports = {
	//'url' : 'mongodb://admin:p3s2VUa5123Q@127.9.90.2:27017/nodesample'
	//'mongodb://localhost:27017/nodesample'
  
//}
//may need to change host

var util = require("util");
var mongoClient = require('mongodb').MongoClient;
/*
 * This is the connection URL
 * Give the IP Address / Domain Name (else localhost)
 * The typical mongodb port is 27012
 * The path part (here "fallTest") is the name of the databas
 */
var url = 'mongodb://admin:p3s2VUa5123Q@127.9.90.2:27017/nodesample';

var mongoDB; // The connected database
// Use connect method to connect to the Server
mongoClient.connect(url, function(err, db) {
  if (err) doError(err);
  console.log("Connected correctly to server");
  mongoDB = db;
});

/* 
 * In the methods below, notice the use of a callback argument,
 * how that callback function is called, and the argument it is given.
 * Why can't the insert, find, and update functions just return the
 * data directly?
 */

// INSERT
exports.insert = function(collection, query, callback) {
        console.log("start insert");
        mongoDB.collection(collection).insert(
          query,
          {safe: true},
          function(err, crsr) {
            if (err) doError(err);
            console.log("completed mongo insert");
            callback(crsr);
          });
}

// FIND
exports.find = function(collection, query, callback) {
        var crsr = mongoDB.collection(collection).find(query);
        crsr.toArray(function(err, docs) {
          if (err) doError(err);
          callback(docs);
        });
 }

// UPDATE
exports.update = function(collection, query, callback) {
          mongoDB.collection(collection).update(
            JSON.parse(query.find),
            JSON.parse(query.update), {
              new: true
            }, function(err, crsr) {
              if (err) doError(err);
              callback('Update succeeded');
        });
  }

var doError = function(e) {
        util.debug("ERROR: " + e);
        throw new Error(e);
    }