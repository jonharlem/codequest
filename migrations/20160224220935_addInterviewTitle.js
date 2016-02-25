
exports.up = function(knex, Promise) {
  return knex.schema.table('interviews', function(table){
    table.string('title');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('interviews', function(table){
    table.dropColumn('title');
  });;
};
