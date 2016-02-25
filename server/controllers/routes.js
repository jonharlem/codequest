var index = require('./index');
var auth  = require('./auth');
var users = require('./usersRoutes');
var interviewTypes = require('./interviewTypesRoutes');
var tags = require('./tagsRoutes');

module.exports = {
  index: index,
  auth: auth,
  users: users,
  interviewTypes: interviewTypes,
  tags: tags
}
