var index = require('./index');
var auth  = require('./auth');
var users = require('./usersRoutes');

module.exports = {
  index: index,
  auth: auth,
  users: users
}
