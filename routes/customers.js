const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const bcrypt = require('bcrypt-nodejs');
const Customer = require("../models/customers");

// Get All customers

router.get('/', function (req, res) {
    Customer.find({}, function (err, customer) {
        res.json({'customer': [customer]});
    });
});

// Save new customer

router.post('/', function (req, res) {
    //console.log(req.headers.host);
    const newCustomer = new Customer({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        password: createHash(req.body.password),
        address: req.body.address,
        device_id: req.body.device_id,
        push_notification: req.body.push_notification
    });

    newCustomer.save(function (err, customer) {
        return res.send({error: false, message: "success!"});
    });


});

// Generates hash using bCrypt
var createHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

module.exports = router;
