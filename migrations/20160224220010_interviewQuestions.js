
exports.up = function(knex, Promise) {
  return knex.schema.createTable('interview_questions', function(table){
    table.increments();
    table.integer('interview_id').unsigned().index().references('id').inTable('interviews');
    table.integer('question_id').unsigned().index().references('id').inTable('questions');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('interview_questions');
};
