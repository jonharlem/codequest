var  knex = require('../../db/knex');

// getting all interviews
var Interviews = function(){
  return knex('interviews');
}

// create interview
var addInterview = function(interview){

  return Interviews().insert(interview).then(function(newInterview){
    return newInterview;
  });


}
// update interview
var updateInterview = function(interview){
  return Interviews().where({
    id: interview.id
  }).first().update(interview).then(function(updatedInterview){
    return updatedInterview;
  });
}
// delete interview
var deleteInterview = function(interview){
  return Interviews().where({
    id: interview.id
  }).first().del();
}
// get interview by id
var interview = function(interviewID){
  return Interviews().where({id: interviewID}).first().then(function(interview){
    return interview;
  });
}

 var addInterviewWithCompany= function(interview){
   // add new interview
   // get interview ID when done
  // check if company exits
  // if not, add new company then get the id
  // if exits, get the company and it's ID
  // get array of questions
  // create questions for each one

 }

module.exports = {
  allInterviews: Interviews,
  addInterview: addInterview,
  updateInterview: updateInterview,
  deleteInterview: deleteInterview,
  interview:interview
}
