var  knex = require('../../db/knex');
var tagsData = require('./../../seeds/questions.json');

// getting all tags
var Tags = function(){
  return knex('tags');
}

// create tag
var addTag = function(tag){
   Tags().insert(tag).then(function(newTag){
  });

}
// update tag
var updateTag = function(tag){
  return Tags().where({
    id: tag.id
  }).first().update(tag).then(function(updatedTag){
    return updatedTag;
  });
}
// delete tag
var deleteTag = function(tag){
  return Tags().where({
    id: tag.id
  }).first().del();
}
// get tag by id
var tag = function(tagID){
  return Tags().where({id: tagID}).first().then(function(tag){
    return tag;
  });
}

var  deleteAllTags = function(){
    knex('tags').del();
}

// populated comapanies table with node server/models/companies
var populatedDb = function(){
  var tags = [];
  for(var i =0; i < tagsData.length; i++){
    // get all tags and push them to tags array
    tags.push(tagsData[i].tag);
  }

  // remove dublicates
  var uniqueTags = makeUniqueTags(tags);

  // populated db
  for(var i =0; i < uniqueTags.length; i++){
    addTag({
      name: uniqueTags[i]
    });
  }
}
var makeUniqueTags = function(a) {
          return a.reduce(function(p, c) {
              if (p.indexOf(c) < 0) p.push(c);
              return p;
          }, []);
        }

// populatedDb();
module.exports = {
  allTags: Tags,
  addTag: addTag,
  updateTag: updateTag,
  deleteTag: deleteTag,
  tag:tag
}
