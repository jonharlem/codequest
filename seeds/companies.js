var companiesData = require('./companies.json');
var companiesManager = require('./../server/models/companies');

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    for(var i =0; i < companiesData.length; i++){
      companiesManager.addCompany({
        name: companiesData[i].name;
        contactInfo: companiesData[i].contactInfo,
        logo: companiesData[i].logo,
        size: companiesData[i].size.toString(),
        industry: companiesData[i].industry
      });
    }

  );
};
