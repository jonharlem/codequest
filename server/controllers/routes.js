var index = require('./index');
var auth  = require('./auth');
var users = require('./usersRoutes');
var interviewTypes = require('./interviewTypesRoutes');
var tags = require('./tagsRoutes');
var interview = require('./interviewRoutes');

module.exports = {
  index: index,
  auth: auth,
  users: users,
  interviewTypes: interviewTypes,
  tags: tags,
  interview: interview
}
