var  knex = require('../../db/knex');
var companiesData = require('./../../seeds/companies.json');
var fs = require('fs');

// getting all companies
var Companies = function(){
  return knex('companies');
}

// create company
var addCompany = function(company){

  return Companies().insert(company).then(function(newCompany){
    return newCompany;
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
    id: company.id
  }).first().del();
}
// get company by id
var company = function(companyID){
  return Companies().where({id: companyID}).first().then(function(company){
    return company;
  });
}

for(var i = 0; i < companiesData.length; i++){
  addCompany({
            name: companiesData[i].name,
            contactInfo: companiesData[i].contactInfo,
            logo: companiesData[i].logo,
            size: companiesData[i].size.toString(),
            industry: companiesData[i].industry
  });
}

module.exports = {
  AllCompanies: Companies,
  addCompany: addCompany,
  updateCompany: updateCompany,
  deleteCompany: deleteCompany,
  company:company
}
