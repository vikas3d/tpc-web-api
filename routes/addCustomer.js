const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const Customers = require("../models/addCustomer");

router.get('/', isLoggedIn, function(req, res) {

  const Rates = require("../models/tcc_rate");
  Rates.find({}).sort({_id:-1}).limit(1).exec(function(err,rslt) {
    res.render('addCustomer.ejs', {results: rslt, user : req.user });
  });
});

module.exports = router;

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
