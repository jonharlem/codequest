
exports.up = function(knex, Promise) {
  return knex.schema.createTable('companies', function(table){
    table.increments();
    table.string('name');
    // for long text
    table.text('description');
    table.string('size');
    table.string('image');
    table.string('logo');
    table.string('location');
    table.date('foundedDate');
    // could be anything
    table.text('contactInfo');
    // something like b2b ..etc
    table.string('industry');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('companies');
};
