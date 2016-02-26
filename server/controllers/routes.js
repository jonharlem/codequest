var index = require('./index');
var auth  = require('./auth');
var users = require('./usersRoutes');
var companies = require('./companiesRoutes');

module.exports = {
  index: index,
  auth: auth,
  users: users,
  companies: companies
}
