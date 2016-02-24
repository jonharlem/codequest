var tagsData = [
  {id:1,text:'Apple'},
  {id:2,text:'Banana'},
  {id:3,text:'Cherry'},
  {id:4,text:'Cantelope'},
  {id:5,text:'Grapefruit'},
  {id:6,text:'Grapes'},
  {id:7,text:'Lemon'},
  {id:8,text:'Lime'},
  {id:9,text:'Melon'},
  {id:10,text:'Orange'},
  {id:11,text:'Strawberry'},
  {id:12,text:'Watermelon'}
];

$("#searchBar").select2({

    tags: true,
    multiple: true,
    data: tagsData
});