const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const bcrypt = require('bcrypt-nodejs');
const Customer = require("../models/customers");
const uniqueID = require('../config/uniqueID');
const qr = require('qr-image');
const randomID = require("random-id");
// Save new customer

router.post('/', function (req, res) {

    //console.log(uniqueID);
    const defaultId = randomID(12, "a0");
    const code = qr.image(req.body.phone, {type: 'png'});
    const rs = code.pipe(require('fs').createWriteStream("./public/qrimg/" + req.body.firstname + '.png'));
    //console.log(code);
    const newCustomer = new Customer({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        unique_id: req.body.unique_id + uniqueID,
        default_id: defaultId + uniqueID,
        qrcode: "http://" + req.headers.host + "/qrimg/" + req.body.firstname + '.png',
        email: req.body.email,
        password: createHash(req.body.password),
        address: req.body.address,
        device_id: req.body.device_id,
        push_notification: req.body.push_notification
    });

    newCustomer.save(function (err, customer) {
        if (err) {
            var str = err.errmsg;
            if (str.includes("customers.$unique_id_1")) {
                return res.send({
                    success: false, message: "Unique Id already exits,Please user other"
                });
            }
            else {
                return res.send({
                    success: false, message: "Email Already Exits"
                });
            }
        }
        else {
            return res.json({success: true, message: 'Signup successfull, please login to your account'});
        }
    });

});

// Generates hash using bCrypt
var createHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

module.exports = router;
