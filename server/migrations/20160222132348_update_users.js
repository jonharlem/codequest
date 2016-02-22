exports.up = function(knex, Promise) {
  return knex.schema.table("users", function(table) {
    table.string("name");
    table.text("image");
    table.string("github");
    table.string("linkedin");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
