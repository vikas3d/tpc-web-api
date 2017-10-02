const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const Rate = require("../models/tcc_rate");

router.get('/', function (req, res) {
    Rate.find({}).sort({_id: -1}).limit(1).exec(function (err, rate) {
        res.json(rate);
    });
});

router.post('/', function (req, res) {

    //console.log(req.body);
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        Rate.findOne({}).sort({_id: -1}).exec(function (err, rslt) {

            if (isNaN(fields.stock)) {
                console.log('innn');
                stock = 0;
            } else {
                stock = parseInt(fields.stock);
            }
            console.log(stock);
            if (rslt) {
                stock = stock + parseInt(rslt.stock);
            }
            console.log(stock);
            var newRate = new Rate({
                rate: fields.rate,
                min_tcc: fields.tcclimit,
                stock: parseInt(stock)
            });

            newRate.save(function (err, rate) {
                console.log(err, rate)
                return res.send({error: false, message: "new rate saved!"});
            });
        });


    });

});


module.exports = router;
