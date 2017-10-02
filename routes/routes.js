module.exports = function (app, passport) {
    const Rates = require("../models/tcc_rate");
    const Customers = require("../models/customers");
    const Purchase = require("../models/buytcc");
    // show the home page (will also have our login links)
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', function (req, res) {


        Rates.findOne({}).sort({_id: -1}).exec(function (err, rslt) {
            console.log(rslt);
            res.render('profile.ejs', {
                results: rslt
            });
        });
    });

    // Customer list =========================
    app.get('/customerList', isLoggedIn, function (req, res) {

        const Customers = require("../models/customers");
        //const Customers_a = require("../models/customers");
        Customers.find({}).exec(function (err, rslt) {
            res.render('customerList.ejs', {results: rslt});
            /*Customers_a.find({status: false}, function(err, customers) {
             res.render('customerList.ejs', {results: rslt, customers: customers});
           });*/
        });
    });

    // New buying request =========================
    app.get('/tpc-buying-requests', isLoggedIn, function (req, res) {

        const Purchase = require("../models/buytcc");
        Purchase.find({purchase_status:false}).populate('customer', {password: false}).exec(function (err, purchase) {
            res.render('templates/new-buying-request.ejs', {purchase: purchase});
        });
    });

    // Approve customer
    app.post('/customer/approve', isLoggedIn, function (req, res) {

        const formidable = require('formidable');
        const Customers = require("../models/customers");
        const form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            //console.log(fields.cid);
            Customers.update({_id: fields.cid}, {$set: {status: true}}, function (err, result) {
                if (err)
                    console.log(result);
                return res.send({error: false, message: "Customers approved"});
            });

        });

    });

    // Deny customer
    app.post('/customer/deny', isLoggedIn, function (req, res) {

        const formidable = require('formidable');
        const Customers = require("../models/customers");
        const form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            //console.log(fields.cid);
            Customers.remove({
                _id: fields.cid
            }, function (err, user) {
                if (err)
                    res.send(err);

                return res.send({message: 'Request denied'});
            });

        });

    });

    // Approve tpc buying
    app.post('/customer/approve-tcp', isLoggedIn, function (req, res) {

        const formidable = require('formidable');
        const Purchase = require("../models/buytcc");
        const form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            //console.log(fields.cid);
            Purchase.findOne({_id: fields.cid}, function (error, doc) {
                doc.purchase_status = true;
                doc.save(function (error, doc) {
                    if (error) {
                        return res.send({error: true, message: error});
                    }
                    require("../models/tcc_rate").findOne({}, function (error, rate) {
                        rate.stock -= doc.tcp_coins;
                        rate.save(function (error, doc) {
                            return res.send({error: false, message: "Tpc approved"});
                        })
                    })
                })
            })


        });

    });

    // Deny tpc
    app.post('/customer/deny-tpc', isLoggedIn, function (req, res) {

        const formidable = require('formidable');
        const Purchase = require("../models/buytcc");
        const form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            //console.log(fields.cid);
            Purchase.remove({
                _id: fields.cid
            }, function (err, user) {
                if (err)
                    res.send(err);

                return res.send({message: 'Request denied'});
            });

        });

    });

    // Customer list =========================
    app.get('/customerList/:cid', function (req, res) {
        const Buyer = require("../models/buytcc");
        Buyer.find({customer: req.params.cid, purchase_status: true}).exec(function (err, rslt) {
            console.log(rslt);
            res.render('common.ejs', {results: rslt});
        });
    });

    // Customer list =========================
    app.get('/protected', function (req, res) {

        res.render('templates/protected.ejs', {results: "yoo"});

    });

    // Send tpc =========================
    app.get('/send-coins', function (req, res) {

        res.render('templates/send-coins.ejs', {results: "yoo"});

    });

    // LOGOUT ==============================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // show the login form
    app.get('/login', function (req, res) {
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true // allow flash messages
    }));

    // SIGNUP =================================
    // show the signup form
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    app.post("/forgot-password", function (e) {
        const Customers = require("../models/customers");
        const email = req.body.email;
        Customers.findOne({email: email}, {password: false}, function (error, customer) {
            if (customer) {
            }
        })

    })

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
