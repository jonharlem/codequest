var  knex = require('../../db/knex');

// getting all users
var Users = function(){
  return knex('users');
}

// get user by id

// get user by email

module.exports = {
  allUsers: Users()
}
