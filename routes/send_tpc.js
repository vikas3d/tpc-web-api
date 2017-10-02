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
     Customers.findOne({unique_id:req.body.wallet_id},function (error,doc) {
         if(doc){
             /*customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
             //sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
             current_tpc_price: Number,
                 total_amount: Number,
                 tcp_coins: Number,
                 purchase_status: { type: Boolean, default: false }
             */
             pur = new Purchase();
             pur.customer = doc._id;
             pur.purchase_status=false;
             pur.tcp_coins = req.body.coins;
             Rate.findOne({}).exec(function (error,rate) {
                 pur.total_amount = rate.rate*req.body.coins;
                 pur.save(function(error,save){
                     res.send({
                         error,save
                     });
                 })
             })
         }
     })
});

module.exports = router;
