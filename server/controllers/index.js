var express = require('express');
var router = express.Router();

router.get('/api', function(req,res){
  res.send('yo yo, landing page');
});

router.post('/login', function(req,res){
  res.send('yo yo, login page');
});

module.exports = router;
