var express = require('express');
var router = express.Router();
var companies = require('./../models/companies');

router.get('/', function(req, res){
  companies.AllCompanies().then(function(companiesData){
    res.json(companiesData);
  });
});

module.exports = router;
