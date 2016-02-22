var express = require('express');
var router = express.Router();
var locus = require('locus');
var bcrypt = require('bcrypt');
var knex = require('../../db/knex');
var  jwt = require('jsonwebtoken');

// SIGNUP
router.post('/users', function(req, res) {

	knex('users').where({username: req.body.username}).first().then(function(user){
	  if(user || req.body.password !== req.body.passwordCmf){
	    res.json({
	        error: JSON.stringify(err),
	        message: "username already in use/passwords do not match"
	    });
	  }else{
	    bcrypt.genSalt(10, function(err, salt){

	        bcrypt.hash(req.body.password, salt, function(err, hash){

	        knex('users').insert({username: req.body.username, password: hash}).returning('id').then(function(id){
	        	// We sign enough information to determine if 
	            // the user is valid in the future. 
	            // In our case, username and password are required
	        	var token = jwt.sign({ username: req.body.username,
		        	                   password: hash
		        	                 }, "SECRET");

	        	// On success, we send the token back
	        	// to the browser.
	        	res.json({jwt:token, id:id});
	        });


	      });
	    });
	  }
	}).catch(function(err){
	        console.log(err);
	        res.json({
	            error: JSON.stringify(err),
	            message: "Error connecting to Database"
	        })
    	});
});

// LOGIN
router.post('/login', function(req, res) {
    knex('users').where({username: req.body.username}).first()
    .then(function(user){
    	if(user){
    		var pass = req.body.password;
    		bcrypt.compare(pass, user.password, function(err, result){
    			if(result){
    				// We sign enough information to determine if 
    				// the user is valid in the future. 
    				// In our case, username and password are required
    				var token = jwt.sign({ username: user.username,
    				                   password: user.password
    				                 }, "SECRET");

    				// On success, we send the token back
    				// to the browser.
    				res.json({jwt:token});
    			}else{
				res.json({
		            		error: JSON.stringify(err),
		            		message: "no matching user/password combo"
			        	});
    			}
    		});
    	}else{
    		res.json({
                		error: JSON.stringify(err),
                		message: "no matching user/password combo"
            	});
    	}

    }).catch(function(err){
        console.log(err);
        res.json({
            error: JSON.stringify(err),
            message: "Error connecting to Database"
        })
    });
});


module.exports = router;
