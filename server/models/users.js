var  knex = require('../../db/knex');

// getting all users
var Users = function(){
  return knex('users');
}

// create user
var addUser = function(user){
  //check if user already exist
  return Users().where({id: user.id}).first().then(function(foundUser){
    if(!user){
      return Users().insert(user).first().then(function(user){
        return user;
      });
    }
  })

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
var deleteUser = function(userID){
  return Users().where({
    id: userID
  }).first().del();
}
// get user by id
var user = function(userID){
  return Users().where({id: user.id}).first().then(function(user){
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
  allUsers: Users(),
  addUser: addUser(),
  updateUser: updateUser(),
  deleteUser: deleteUser(),
  user:user(),
  userByEmail: userByEmail()
}
