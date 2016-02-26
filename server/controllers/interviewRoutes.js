var interviewTypes = require('../models/interviewTypes');
var questions = require('../models/questions');
var interviews = require('../models/interviews');
var knex = require('../../db/knex');

var express = require('express');
var router = express.Router();
require('locus');

router.post('/', function(req,res) {
	questions.allQuestions().returning('id').insert({question: req.body.question}).then(function(questionId) {
		var tags = req.body.tags;
		function createQuestionTags(i) {
				questions.allQuestionsWithTags().insert({
					question_id: questionId[0], 
					tag_id: tags[i].id
				}).catch(function(error) {
					console.log(error);
				});
		}
		for (var i = 0; i < tags.length; i++) {
			createQuestionTags(i);
		}
		
		interviews.allInterviews().returning('id').insert({
			type_id: req.body.type,
			interviewer: req.body.companyName,
			title: req.body.position
		}).then(function(interviewId) {
			// eval(locus)
			knex('interview_questions').insert({
				interview_id: interviewId[0],
				question_id: questionId[0]
			}).catch(function(error) {
				console.log(error);
			})
			res.end();
		});
	});
});

module.exports = router; 