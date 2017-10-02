// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
const timestamps = require('mongoose-timestamp');
const purchaseSchema = mongoose.Schema({
      customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
      //sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
      current_tpc_price: Number,
      total_amount: Number,
      tcp_coins: Number,
      purchase_status: { type: Boolean, default: false }
});
purchaseSchema.plugin(timestamps);

// create the model for users and expose it to our app
module.exports = mongoose.model('Purchase', purchaseSchema);
