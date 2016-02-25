var knex = require('../../db/knex');
var typesData = require('./../../seeds/interviewTypes.json');

// getting all interviews
var Types = function(){
  return knex('interview_types');
}

// create tpe
var addType = function(type){

   Types().insert(type).then(function(newType){
  });
}
// update type
var updateType = function(type){
  return Types().where({
    id: type.id
  }).first().update(type).then(function(updatedType){
    return updatedType;
  });
}
// delete type
var deleteType = function(type){
  return Types().where({
    id: type.id
  }).first().del();
}
// get type by id
var type = function(typeID){
  return Types().where({id: typeID}).first().then(function(type){
    return type;
  });
}

var deleteAllTypes = function(){
  knex('interview_types').del();
}

var populateTypesDB = function(){
  for(var i = 0 ; i < typesData.length; i++){
    addType({
      name: typesData[i].name
    });
  }
}

// populateTypesDB()

module.exports = {
  allTypes: Types,
  addType: addType,
  updateType: updateType,
  deleteType: deleteType,
  type:type
}
