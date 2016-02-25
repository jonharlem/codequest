var companies = require('./companies');
var interviews = require('./interviews');
var questions = require('./questions');
var tags = require('./tags');
var types = require('./interviewTypes');

companies.populateCompanies();
questions.populateQuestions();
tags.populateTags();
types.populateTypes();
questions.addTagsToQuestions();
