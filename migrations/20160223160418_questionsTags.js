
exports.up = function(knex, Promise) {
  return knex.schema.createTable('question_tags', function(table){
    table.increments();
    table.integer('question_id').unsigned().index().references('id').inTable('questions');
    table.integer('tag_id').unsigned().index().references('id').inTable('tags');


  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('question_tags');
};
