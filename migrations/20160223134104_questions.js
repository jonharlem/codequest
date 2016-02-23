
exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', function(table){
    table.increments();
    table.text('question');
    table.text('response');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('questions');
};
