var  knex = require('../../db/knex');
var questionsData = require('./../../seeds/questions.json');

// getting all questions
var Questions = function(){
  return knex('questions');
}

// create question
var addQuestion = function(question){
   Questions().insert(question).then(function(newQuestion){
  });

}
// update question
var updateQuestion = function(question){
  return Questions().where({
    id: question.id
  }).first().update(question).then(function(updatedQuestion){
    return updatedQuestion;
  });
}
// delete question
var deleteQuestion = function(question){
  return Questions().where({
    id: question.id
  }).first().del();
}
// get question by id
var question = function(questionID){
  return Questions().where({id: questionID}).first().then(function(question){
    return question;
  });
}

var  deleteAllQuestions = function(){
    knex('questions').del();
}

// populated comapanies table with node server/models/companies
var populatedDb = function(){
  for(var i =0; i < questionsData.length; i++){
    addQuestion({
      question: questionsData[i].question
    });
  }
}

var addTagsToQuestions = function(){
  //get the question

  for(var i = 0; i < questionsData.length; i++){
    generateQuestionTagCallback(i);
  }
}

function generateQuestionTagCallback(i){
  var questionID, tagID;

  Questions().where({
    question: questionsData[i].question
  }).first().then(function(question){
     questionID = question.id;
    console.log(questionID);
  }).then(function(){
    knex('tags').where({
      name: questionsData[i].tag
    }).first().then(function(tag){
      tagID = tag.id;
      // add to questions_tags db
      knex('question_tags').insert({
        question_id: questionID,
        tag_id: tag.id,
        question:questionsData[i].question,
        tag:questionsData[i].tag
      }).then(function(){
      });
    });
  }).catch(function(error){
    console.log(error);
  });
}

var allQuestionsWithTags = function(){
  return knex('question_tags');
}

module.exports = {
  allQuestions: Questions,
  addQuestion: addQuestion,
  updateQuestion: updateQuestion,
  deleteQuestion: deleteQuestion,
  question:question,
  populateQuestions:populatedDb,
  addTagsToQuestions: addTagsToQuestions,
  allQuestionsWithTags: allQuestionsWithTags
}
