var  knex = require('../../db/knex');

// getting all companies
var Companies = function(){
  return knex('companies');
}

// create company
var addCompany = function(company){
  //check if company already exist
  return Companies().where({id: company.id}).first().then(function(foundCompany){
    if(!foundCompany){
      return Companies().insert(company).first().then(function(newCompany){
        return newCompany;
      });
    }
    else{
      return 'company is already there'
    }
  })

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

module.exports = {
  AllCompanies: Companies,
  addCompany: addCompany,
  updateCompany: updateCompany,
  deleteCompany: deleteCompany,
  company:company
}
