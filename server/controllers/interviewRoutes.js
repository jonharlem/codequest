var interviewTypes = require('../models/interviewTypes');
var questions = require('../models/questions');
var express = require('express');
var router = express.Router();
require('locus');

router.post('/', function(req,res) {
	questions.allQuestions().returning('id').insert({question: req.body.question}).then(function(questionId) {

	});
});

module.exports = router; 