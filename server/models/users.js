var  knex = require('../../db/knex');

// getting all users
var Users = function(){
  return knex('users');
}

// create user
var addUser = function(user){
  return Users().insert(user).then(function(newUser){
    return newUser;
  });

}
// update user
var updateUser = function(user){
  return Users().where({
    id: user.id
  }).first().update(user).then(function(updatedUser){
    return updatedUser;
  });
}
// delete user
var deleteUser = function(user){
  return Users().where({
    id: user.id
  }).first().del();
}
// get user by id
var user = function(userID){
  return Users().where({id: userID}).first().then(function(user){
    return user;
  });
}
// get user by email
var userByEmail = function(){
  return Users().where({email: user.email}).first().then(function(user){
    return user;
  });
}
module.exports = {
  allUsers: Users,
  addUser: addUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  user:user,
  userByEmail: userByEmail
}
