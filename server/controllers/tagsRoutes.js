var express = require('express');
var router = express.Router();
var tags = require('./../models/tags');

router.get('/', function(req, res){
  tags.allTags().then(function(tagsData){
    res.json(tagsData);
  });
});

module.exports = router;
=======
var tags = require('../models/tags');
var express = require('express');
var router = express.Router();

router.get('/', function(req,res) {
	tags.allTags().then(function(tags) {
		res.json(tags);
	});
});

module.exports = router;
