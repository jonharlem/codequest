var express = require('express');
var router = express.Router();

function isAuthenticated(req, res, next) {
  if (!req.header("Authorization")) {
    res.status(401).send({ message: "You are not authenticated." });
  }

  var token = req.header("Authorization").split(" ")[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);

  req.user = payload.sub;
  next();
}

function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

module.exports = router;