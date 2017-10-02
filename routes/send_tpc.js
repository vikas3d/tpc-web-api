const express = require('express');
const router = express.Router();
const Sentpc = require("../models/send_tpc");
const Customers = require("../models/customers");
const Purchase = require("../models/buytcc");
const Rate = require("../models/tcc_rate");

router.get('/', function(req, res) {

  Customers.find({}).exec(function(err,rslt) {
      res.json({result:rslt});
  });

});

router.post('/', function(req, res) {
     console.log(req.body);
     Customers.findOne({unique_id:req.body.unique_id},function (err,receiver) {
         if(receiver){
             newpurch = new Purchase();
             newpurch.customer = receiver._id;
             newpurch.purchase_status=true;
             newpurch.tcp_coins = req.body.coins;
             Purchase.findOne({customer:req.body.sender},function (err,sender) {
               console.log(sender);
               sender.tcp_coins -= req.body.coins;
               sender.save(function (err, result) {
                   console.log(result);
               })
              })
             Rate.findOne({}).sort({_id: -1}).exec(function (error, rate) {
                 newpurch.total_amount = rate.rate*req.body.coins;
                 newpurch.save(function(error,save){
                     res.send({
                         error,save
                     });
                 })
             })
         }
     })
});

module.exports = router;
