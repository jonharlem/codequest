
exports.up = function(knex, Promise) {
  return knex.schema.table('interviews', function(table){
    table.integer('type_id').unsigned().index().references('id').inTable('interview_types');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('interviews', function(table){
    table.dropColumn('type_id');
  });;
};
