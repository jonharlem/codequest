var tags = require('../models/tags');
var companies = require('../models/companies');
var questions = require('../models/questions');
var interviewTypes = require('../models/interviewTypes');
var express = require('express');
var router = express.Router();
require('locus');

router.get('/', function(req,res) {
	interviewTypes.allTypes().then(function(types) {
		res.json(types);
	})
});

module.exports = router;