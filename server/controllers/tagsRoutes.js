var tags = require('../models/tags');
var express = require('express');
var router = express.Router();

router.get('/', function(req,res) {
	tags.allTags().then(function(tags) {
		res.json(tags);
	});
});

module.exports = router;