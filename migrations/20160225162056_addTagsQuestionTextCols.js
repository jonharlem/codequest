exports.up = function(knex, Promise) {
  return knex.schema.table('question_tags', function(table){
    table.text('question');
    table.string('tag');


  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('question_tags', function(table){
    table.dropColumn('question');
    table.dropColumn('tag');
  });;
};
