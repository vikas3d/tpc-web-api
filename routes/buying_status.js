const express = require('express');
const router = express.Router();

// buying status =========================

router.get('/', function (req, res) {
    const Buyer = require("../models/buytcc");
    Buyer.find({}).exec(function (err, rslt) {
        //console.log(rslt);
        res.send(rslt);
    });
});

// wallet TCP ==============================
router.get('/:cid', function (req, res) {
    const Buyer = require("../models/buytcc");
    //console.log(req.params.cid);
    const Sentpc = require("../models/send_tpc");
    require('mongoose').set('debug', true);
    pipeline = [
        {
            $match: {customer: require('mongoose').Types.ObjectId(req.params.cid)}
        }, {
            $project: {
                tcp_coins: true,
                balance: true,
                customer: true
            }
        }, {
            $group: {
                _id: "$customer",
                balance: {$sum: "$tcp_coins"}
            }
        }
    ];

    Buyer.aggregate(pipeline, function (error, docs) {
        if (!error) {
            res.send(docs[0]);
        }
    })

});

module.exports = router;
