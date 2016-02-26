var express = require('express');
var router = express.Router();
require('locus');

var companies = require('../models/companies')

router.get('/', function(req,res) {
	companies.AllCompanies().then(function(companies) {
		res.json(companies);
	});
});

module.exports = router;