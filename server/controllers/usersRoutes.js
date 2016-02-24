var express = require('express');
var router = express.Router();
var users = require('./../models/users');

router.get('/users', function(rq,res){
  users.allUsers().then(function(data){
    console.log('here');
    res.send('uo uo');
  });
});

module.exports = router;
