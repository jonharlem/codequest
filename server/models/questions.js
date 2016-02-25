var  knex = require('../../db/knex');

// getting all questions
var Questions = function(){
  return knex('questions');
}

// create question
var addQuestion = function(question){
  return Questions().insert(question).then(function(newQuestion){
    return newQuestion;
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

module.exports = {
  allQuestions: Questions,
  addQuestion: addQuestion,
  updateQuestion: updateQuestion,
  deleteQuestion: deleteQuestion,
  question:question
}
