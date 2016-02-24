var  knex = require('../../db/knex');

// getting all interviews
var Interviews = function(){
  return knex('interviews');
}

// create interview
var addInterview = function(interview){
  //check if interview already exist
  return Interviews().where({id: interview.id}).first().then(function(foundInterview){
    if(!foundInterview){
      return Interviews().insert(interview).first().then(function(newInterview){
        return newInterview;
      });
    }
    else{
      return 'interview is already there'
    }
  })

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

module.exports = {
  allInterviews: Interviews,
  addInterview: addInterview,
  updateInterview: updateInterview,
  deleteInterview: deleteInterview,
  interview:interview
}
