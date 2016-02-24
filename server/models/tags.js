var  knex = require('../../db/knex');

// getting all tags
var Tags = function(){
  return knex('tags');
}

// create tag
var addTag = function(tag){
  //check if tag already exist
  return Tags().where({id: tag.id}).first().then(function(foundTag){
    if(!foundTag){
      return Tags().insert(tag).first().then(function(newTag){
        return newTag;
      });
    }
    else{
      return 'Tag is already there'
    }
  })

}
// update tag
var updateTag = function(tag){
  return Tags().where({
    id: interview.id
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

module.exports = {
  allTags: Tags,
  addTag: addTag,
  updateTag: updateTag,
  deleteTag: deleteTag,
  tag:tag
}
