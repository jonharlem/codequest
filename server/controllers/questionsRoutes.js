var questions = require('../models/questions');
var express = require('express');
var router = express.Router();
require('locus');

router.get('/:tagname', function(req,res) {
	questions.allQuestionsWithTags().where('tag', req.params.tagname).then(function(questions) {
		res.json(questions);
	});
});

module.exports = router;