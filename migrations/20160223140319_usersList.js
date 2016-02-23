
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_interview_lists', function(table){
    table.increments();
    table.string('name');
    table.integer('user_id').unsigned().index().references('id').inTable('users');
    table.integer('interview_id').unsigned().index().references('id').inTable('interviews');


  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_interview_lists');
};
