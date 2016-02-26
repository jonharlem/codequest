
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    //users ID
    table.increments();

    table.string('name');
    table.string('email');
    table.string('password');
    table.string('github');
    table.string('linkedin');
    table.string('twitter');
    table.string('image');
    table.string('position');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
