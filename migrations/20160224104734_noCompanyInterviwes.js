
exports.up = function(knex, Promise) {
  return knex.schema.createTable('no_companies_interviews', function(table){
    table.increments();
    table.integer('interview_id').unsigned().index().references('id').inTable('interviews');
    table.integer('question_id').unsigned().index().references('id').inTable('questions');
    table.integer('user_id').unsigned().index().references('id').inTable('users');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('no_companies_interviews');
};
