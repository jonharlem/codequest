var env = process.env.NODE_ENB || 'development';
var config = require('../knexfile')[env];

module.exports = require("knex")(config);
