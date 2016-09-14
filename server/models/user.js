var mongojs = require('mongojs');
var databaseUrl = 'REACT';
var collections = ["user"];
var db = mongojs(databaseUrl, collections);
db.on('error', function (err) {
  console.log('MongoDB Error: ', err);
});
db.on('connect', function () {
    console.log('database connected')
})

module.exports = db;

// monk DB config
// var monk = require('monk');
// var db2 = monk('localhost:27017/REACT');
// var users_table = db2.get('user');
// module.exports = users_table;