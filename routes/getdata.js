var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET method */
router.get('/', function(req, res, next) {
  var RecordType = req.query.RecordType
  var DataName = req.query.DataName
  console.log("RecordType:" + RecordType)
  console.log("DataName:" + DataName)
  var collection = db.get().collection('customers')
  if(RecordType != undefined && DataName != undefined){
    // SELECT * FROM collection WHERE RecordType LIKE "%{pattern}%" AND Data.Name LIKE "%{pattern}%"  
    console.log('SELECT * FROM collection WHERE RecordType LIKE "%{pattern}%" AND Data.Name LIKE "%{pattern}%"')
    var pattern1 = RecordType
    var pattern2 = DataName
    collection.find({"RecordType": {$regex:pattern1 }, "Data.Name": {$regex:pattern2}}, {_id:0}).toArray(function(err, docs) {
      console.log(docs)
      res.json({"result":docs})
    })
    return;
  }

  if(RecordType != undefined && DataName == undefined){
    // SELECT * FROM collection WHERE RecordType LIKE "%{pattern}%"
    console.log('SELECT * FROM collection WHERE RecordType LIKE "%{pattern}%"')
    var pattern = RecordType
    collection.find( { "RecordType": {$regex:pattern } }).project({_id:0}).toArray(function(err, docs){
      console.log(docs)
      res.json({"result":docs})
    })
    return;
  }

  if(RecordType == undefined && DataName != undefined){
    // SELECT * FROM collection WHERE Data.Name LIKE "%{pattern}%"  
    console.log('SELECT * FROM collection WHERE Data.Name LIKE "%{pattern}%"')
    var pattern = DataName
    collection.find({ "Data.Name": {$regex:pattern }}, {_id:0}).toArray(function(err, docs) {
      console.log(docs)
      res.json({"result":docs})
    })
    return;
  }
  res.json({"message": "Bad Request"});
  //res.render('index', { title: 'Express' });
});

/* POST method */
router.post('/', function(req, res, next) {
    var RecordType = req.query.RecordType
    var DataName = req.query.DataName
    console.log("RecordType:" + RecordType)
    console.log("DataName:" + DataName)
    var collection = db.get().collection('customers')
    if(RecordType != undefined && DataName != undefined){
      // SELECT * FROM collection WHERE RecordType LIKE "%{pattern}%" AND Data.Name LIKE "%{pattern}%"  
      console.log('SELECT * FROM collection WHERE RecordType LIKE "%{pattern}%" AND Data.Name LIKE "%{pattern}%"')
      var pattern1 = RecordType
      var pattern2 = DataName
      collection.find({"RecordType": {$regex:pattern1 }, "Data.Name": {$regex:pattern2}}, {_id:0}).toArray(function(err, docs) {
        console.log(docs)
        res.json({"result":docs})
      })
      return;
    }
  
    if(RecordType != undefined && DataName == undefined){
      // SELECT * FROM collection WHERE RecordType LIKE "%{pattern}%"
      console.log('SELECT * FROM collection WHERE RecordType LIKE "%{pattern}%"')
      var pattern = RecordType
      collection.find( { "RecordType": {$regex:pattern } }).project({_id:0}).toArray(function(err, docs){
        console.log(docs)
        res.json({"result":docs})
      })
      return;
    }
  
    if(RecordType == undefined && DataName != undefined){
      // SELECT * FROM collection WHERE Data.Name LIKE "%{pattern}%"  
      console.log('SELECT * FROM collection WHERE Data.Name LIKE "%{pattern}%"')
      var pattern = DataName
      collection.find({ "Data.Name": {$regex:pattern }}, {_id:0}).toArray(function(err, docs) {
        console.log(docs)
        res.json({"result":docs})
      })
      return;
    }
    res.json({"message": "Bad Request"});
    //res.render('index', { title: 'Express' });
  });

module.exports = router;
