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


var  deleteAllCompanies = function(){
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

populatedDb();

module.exports = {
  allQuestions: Questions,
  addQuestion: addQuestion,
  updateQuestion: updateQuestion,
  deleteQuestion: deleteQuestion,
  question:question
}
