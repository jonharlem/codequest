var express = require('express');
var router = express.Router();
var qs = require('querystring');
var request = require("request");
var jwt = require('jsonwebtoken');

var knex = require("../db/knex");
var User = function() {
  return knex('users');
}

//  create and return a json web token
function createJWT(user) {
  var payload = {
    id: user.id,
    name: user.name
  };

  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "7d" });
}

/*
 |--------------------------------------------------------------------------
 | Login with GitHub
 |--------------------------------------------------------------------------
 */
router.post('/github', function(req, res) {
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  var userApiUrl = 'https://api.github.com/user';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.GITHUB_SECRET,
    redirect_uri: req.body.redirectUri
  };

  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params }, function(err, response, accessToken) {
    accessToken = qs.parse(accessToken);
    var headers = { 'User-Agent': 'Satellizer' };

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: userApiUrl, qs: accessToken, headers: headers, json: true }, function(err, response, profile) {

      // Step 3a. Link user accounts.
      if (req.header('Authorization')) {
        User().where({ github: profile.id }).first().then(function(existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a GitHub account that belongs to you' });
          }
          var token = req.header('Authorization').split(' ')[1];
          var payload = jwt.decode(token, process.env.TOKEN_SECRET);
          User().where('id', payload.id).first().then(function(user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.github = profile.id;
            user.image = user.image || profile.avatar_url;
            user.name = user.name || profile.name;
            User().insert(user).then(function() {
              var token = createJWT(user);
              res.send({ token: token });
            });
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        User().where({ github: profile.id }).first().then(function(existingUser) {
          if (existingUser) {
            var token = createJWT(existingUser);
            return res.send({ token: token });
          }
          var user = {};
          user.github = profile.id;
          user.image = profile.avatar_url;
          user.name = profile.name;
          knex('users').insert(user).then(function() {
            var token = createJWT(user);
            res.send({ token: token });
          });
        });
      }
    });
  });
});

/*
 |--------------------------------------------------------------------------
 | Login with LinkedIn
 |--------------------------------------------------------------------------
 */
router.post('/linkedin', function(req, res) {
  var accessTokenUrl = 'https://www.linkedin.com/uas/oauth2/accessToken';
  var peopleApiUrl = 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,picture-url)';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.LINKEDIN_SECRET,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl, { form: params, json: true }, function(err, response, body) {
    if (response.statusCode !== 200) {
      return res.status(response.statusCode).send({ message: body.error_description });
    }
    var params = {
      oauth2_access_token: body.access_token,
      format: 'json'
    };

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: peopleApiUrl, qs: params, json: true }, function(err, response, profile) {

      // Step 3a. Link user accounts.
      if (req.header('Authorization')) {
        User().where({ linkedin: profile.id }).first().then(function(existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a LinkedIn account that belongs to you' });
          }
          var token = req.header('Authorization').split(' ')[1];
          var payload = jwt.decode(token, process.env.TOKEN_SECRET);
          User().where('id', payload.id).first().then(function(user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.linkedin = profile.id;
            user.image = user.image || profile.pictureUrl;
            user.name = user.name || profile.firstName + ' ' + profile.lastName;
            User().insert(user).then(function() {
              var token = createJWT(user);
              res.send({ token: token });
            });
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        User().where({ linkedin: profile.id }).first().then(function(existingUser) {
          if (existingUser) {
            return res.send({ token: createJWT(existingUser) });
          }
          var user = {};
          user.linkedin = profile.id;
          user.image = profile.pictureUrl;
          user.name = profile.firstName + ' ' + profile.lastName;
          User().insert(user).then(function() {
            var token = createJWT(user);
            res.send({ token: token });
          });
        });
      }
    });
  });
});

module.exports = router;