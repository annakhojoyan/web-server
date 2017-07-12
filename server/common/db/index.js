var mongo = require('mongodb');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

var dbConnection = function() {
    var uri = 'mongodb://localhost:27017/webServer';
    mongoose.connect(uri);
    console.log('Connect');
}

module.exports = dbConnection;
