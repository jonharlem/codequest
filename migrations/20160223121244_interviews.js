
exports.up = function(knex, Promise) {
  knex.schema.createTable('interviews', function(){
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
