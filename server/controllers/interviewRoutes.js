var interviewTypes = require('../models/interviewTypes');
var questions = require('../models/questions');
var interviews = require('../models/interviews');
var knex = require('../../db/knex');

var express = require('express');
var router = express.Router();
// require('locus');

router.post('/', function(req,res) {
		// insert questionId
		// find tag in tagsdb
		// add question and tags infor to question_tags table
		var tags  =req.body.tags;
		console.log('inside route', req.body);
		questions.addQuestionWithPromise({question: req.body.question}).then(function(data){
			for(var i = 0 ; i < tags.length; i++){
				questions.addTagToQuestion(tags[i], data[0]);
			}
			res.json(data);
		});

});

module.exports = router;
