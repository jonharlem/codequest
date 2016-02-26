// require all necessary modules
var express = require('express');
var methodOverride = require("method-override");
var path = require('path');
var jwt = require('jsonwebtoken');
var bodyParser = require("body-parser");
var router = require('./controllers/routes');

// load dotenv
require('dotenv').load();

//create app instance
var app = express();

//public assets directory
app.use('/client', express.static(path.join(__dirname, '../client')));

// set bodyParser configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// set the routes path
app.use('/api', router.index);
app.use('/auth', router.auth);
app.use('/users', router.users);
app.use('/companies', router.companies);
app.use('/tags', router.tags);
app.use('/interviewTypes', router.interviewTypes);
app.use('/interview', router.interview);
app.use('/questions', router.questions);
// always redirect to angular app for routes
// are not registered
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'../client/templates', 'index.html'));
});

//set a port to listen to
var port = process.env.PORT || 3000;

//tune in to that port
app.listen(port, function(){
  console.log('listening on port: ' + port);
});
