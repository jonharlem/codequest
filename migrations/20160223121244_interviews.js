
exports.up = function(knex, Promise) {
  return knex.schema.createTable('interviews', function(table){
    table.increments();
    table.text('description');
    table.text('interviewer');
    table.dateTime('date');
    table.string('rating');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('interviews');
};
