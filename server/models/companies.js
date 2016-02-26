var  knex = require('../../db/knex');
var companiesData = require('./../../seeds/companies.json');

// getting all companies
var Companies = function(){
  return knex('companies');
}

// create company
var addCompany = function(company){
  Companies().insert(company).then(function(newCompany){
  });

}
// update company
var updateCompany = function(company){
  return Companies().where({
    id: company.id
  }).first().update(company).then(function(updatedCompany){
    return updatedCompany;
  });
}
// delete company
var deleteCompany = function(company){
  return Companies().where({
    name: company.name
  }).first().del();
}

// get company by id
var company = function(companyID){
  return Companies().where({id: companyID}).first().then(function(company){
    return company;
  });
}

var  deleteAllCompanies = function(){
    knex('companies').del();
}

// populated comapanies table with node server/models/companies
var populatedDb = function(){
  for(var i =0; i < companiesData.length; i++){
    addCompany({
      name: companiesData[i].name,
      contactInfo: companiesData[i].contactInfo,
      logo: companiesData[i].logo,
      size: companiesData[i].size.toString(),
      industry: companiesData[i].industry
    });
  }
}


module.exports = {
  AllCompanies: Companies,
  addCompany: addCompany,
  updateCompany: updateCompany,
  deleteCompany: deleteCompany,
  company:company,
  populateCompanies: populatedDb
}
