var express = require('express');
var router = express.Router();
// var pm = require('../postmates.js')
var Postmates = require('postmates');
var pmcf = require('../postmates_config');
var mongoose = require('mongoose');

var Q = require('q');

//models
var Conversation = require('../models/Conversation');
var Message = require('../models/Message');
var User = require('../models/User');
var Prescription = require('../models/Prescription');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/api/messages', function(req, res, next) {
  Conversation.create();
  // Hard coded find for conversation - change when authentication is implemented
  Conversation.findOne("54c2e4a1b976b78fbceb112d", function(err, results) {
    console.log(results.messages)
    res.json(results.messages);
  })
});

router.post('/api/messages', function(req, res, next) {
  Conversation.findOne("54c2e4a1b976b78fbceb112d").exec(function(err, conversation) {
    Message.create(req.body)
    .then(function(message) {
      var deferred = Q.defer();
      conversation.messages.push(message);
      deferred.resolve();
      return deferred.promise
    })
    .then(function() {
      var deferred = Q.defer();
      conversation.save(function(err, obj, numAffected) {
        if (err) deferred.reject(err)
        else deferred.resolve()
      });
      return deferred.promise
    })
    .then(function() {
      console.log(conversation.messages);
      res.send(200);
    })
  })
});

/* Rx page */
/* GET rx page */
router.get('/rx/new', function(req, res, next) {
  res.render("rx")
});

/* POST rx page */
router.post('/orders', function(req, res, next) {
  //create a new order with the manifest

  var new_order = req.body;

  //get pickup address : google maps api
  var pickup_address = "20 McAllister St, San Francisco, CA 94102";

  //get dropoff address: MVP: user's home address
  var dropoff_address = "101 Market St, San Francisco, CA";

  var delivery = {
    pickup_address: pickup_address,
    dropoff_address: dropoff_address
  };

  //BELOW COMMENTED OUT JUST FOR TESTING - DND
  var postmates = new Postmates(pmcf.customerId, pmcf.testApiKey);

  postmates.quote(delivery, function(err, res) {
    console.log(res.body); // 799
  });

});

router.param('doctor', function(req, res, next, id){

  // User.find(id, function(err, doctor){
  //   if (err) {
  //     next(err);
  //   } else if (doctor) {
  //     req.doctor = doctor;
  //     next();
  //   } else {
  //     next(new Error('failed to load doctor'));
  //   }
  // });
});

router.param('patient', function(req, res, next, id){

  // User.find(id, function(err, patient){
  //   if (err) {
  //     next(err);
  //   } else if (patient) {
  //     req.patient = patient;
  //     next();
  //   } else {
  //     next(new Error('failed to load patient'));
  //   }
  // });
});

module.exports = router;
