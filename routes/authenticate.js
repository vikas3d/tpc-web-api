var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken');
const User = require("../models/customers");
var bcrypt = require('bcrypt-nodejs');

// Get users auth request from query string i.e req.query

router.get("/",function (req,res,next) {

    // find the user
    User.findOne({
        email: req.query.email
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (!isValidPassword(user, req.query.password)){
                console.log('Invalid Password');
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            }
            else {

                // if user is found and password is right
                // create a token
                var token =  jwt.sign({User}, 'secret', { expiresIn: '24h' });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                });
            }

        }

    });

});


// Auth with post route

router.post("/",function (req,res,next) {

    // find the user
    User.findOne({
        email: req.body.email
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (!isValidPassword(user, req.body.password)){
                console.log('Invalid Password');
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            }
            else {

                // if user is found and password is right
                // create a token
                var token =  jwt.sign({User}, 'secret', { expiresIn: '1h' });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    user: user
                });
            }

        }

    });

});

// converting hash password to normal

var isValidPassword = function(user, password){
    return bcrypt.compareSync(password, user.password);
}


module.exports = router;
