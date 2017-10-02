const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const Buyer = require("../models/buytcc");
const Rate = require("../models/tcc_rate");
// Get All Buyers

router.get('/', function (req, res) {
    Buyer.find({}).exec(function (err, purchase) {
        res.json({'Buyers': [purchase]});
    });
});

// Get new customer

router.post('/', function (req, res) {
    Rate.findOne({}).sort({_id: -1}).limit(1).exec(function (err, rate) {
        var min_q;
        var stock;
        min_q = rate.min_tcc;
        stock = rate.stock;
        if (stock >= 0) {
            if (min_q <= req.body.tcp_coins) {
                var newPurchase = new Buyer({
                    customer: req.body.customer,
                    current_tpc_price: req.body.current_tpc_price,
                    total_amount: req.body.total_amount,
                    tcp_coins: req.body.tcp_coins
                });
                newPurchase.save(function (err, purchase) {
                    return res.send({error: false, message: purchase});
                });
            }
            else {
                return res.send({response: "Please buy minimum " + min_q + " coins."});
            }
        }
        else {
            return res.send({response: "Opps,Out of stock!,Coins not available at this moment"});
        }
    });
});
module.exports = router;
