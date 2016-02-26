var index = require('./index');
var auth  = require('./auth');
var users = require('./usersRoutes');
var companies = require('./companiesRoutes');
var tags = require('./tagsRoutes');

module.exports = {
  index: index,
  auth: auth,
  users: users,
  companies: companies,
  tags: tags
}
