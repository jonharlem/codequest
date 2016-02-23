
exports.up = function(knex, Promise) {
  return knex.schema.createTable('interview_types', function(table){
    table.increments();
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('interview_types');
};
