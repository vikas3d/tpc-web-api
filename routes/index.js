const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const path = require('path');

module.exports = router;
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}
