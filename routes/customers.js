const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const bcrypt = require('bcrypt-nodejs');
const Customer = require("../models/customers");
const randomID = require("random-id");
const uniqueID = require('../config/uniqueID');
// Get All customers

router.get('/', function (req, res) {
    Customer.find({}, function (err, customer) {
        res.json({'customer': [customer]});
    });
});

// Save new customer

router.post('/', function (req, res) {
  const defaultId = randomID(12, "a0");
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields) {
  const newCustomer = new Customer({
        firstname: fields.firstname,
        lastname: fields.lastname,
        phone: fields.phone,
        default_id: defaultId + uniqueID,
        unique_id: defaultId + uniqueID,
        email: fields.email,
        password: createHash(fields.password),
        address: fields.address
    });

    newCustomer.save(function (err, customer) {
        console.log(err);
        if(err){
          var str = err.errmsg;
          if (str.includes("customers.$unique_id_1")) {
              return res.send({
                  error: 'UniqueID', message: "Unique Id already exits,Please user other"
              });
          }
          else {
              return res.send({
                  error: 'email', message: "Email Already Exits"
              });
          }
        }
        else{
            return res.send({error: false, message: "New customer added"});
        }
    });

  });

});

// Generates hash using bCrypt
var createHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

module.exports = router;
