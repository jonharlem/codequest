var index = require('./index');
var auth  = require('./auth');
var users = require('./usersRoutes');
var companies = require('./companiesRoutes');
var tags = require('./tagsRoutes');
var interviewTypes = require('./interviewTypesRoutes');
var interview = require('./interviewRoutes');

module.exports = {
  index: index,
  auth: auth,
  users: users,
  companies: companies,
  tags: tag,
  interviewTypes: interviewTypes,
  interview: interview,
}
