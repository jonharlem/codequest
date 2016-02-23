var express = require('express');
var router = express.Router();
var locus = require('locus');
var bcrypt = require('bcrypt');
var knex = require('../db/knex');
var  jwt = require('jsonwebtoken');

// SIGNUP
router.post('/users', function(req, res) {
	knex('users').where({email: req.body.email}).first().then(function(user){
	  if(user || req.body.password !== req.body.passwordConfirm){
	    res.json({
	        error: JSON.stringify(err),
	        message: "email already in use/passwords do not match"
	    });
	  }else{
	    bcrypt.genSalt(10, function(err, salt){

	        bcrypt.hash(req.body.password, salt, function(err, hash){

	        knex('users').insert({name: req.body.name, email: req.body.email, password: hash}).returning('id').then(function(id){
	        	// We sign enough information to determine if
	            // the user is valid in the future.
	            // In our case, username and password are required
	        	var token = jwt.sign({ email: req.body.email,
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
    knex('users').where({email: req.body.email}).first()
    .then(function(user){
    	if(user){
    		var pass = req.body.password;
    		bcrypt.compare(pass, user.password, function(err, result){
    			if(result){
    				// We sign enough information to determine if
    				// the user is valid in the future.
    				// In our case, username and password are required
    				var token = jwt.sign({ email: user.email,
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
