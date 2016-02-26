var index = require('./index');
var auth  = require('./auth');
var users = require('./usersRoutes');
var companies = require('./companiesRoutes');
var tags = require('./tagsRoutes');
var interviewTypes = require('./interviewTypesRoutes');
var interview = require('./interviewRoutes');
var questions = require('./questionsRoutes');

module.exports = {
  index: index,
  auth: auth,
  users: users,
  companies: companies,
  tags: tags,
  interviewTypes: interviewTypes,
  interview: interview,
  questions: questions
}
