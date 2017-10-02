// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
const timestamps = require('mongoose-timestamp');
var sendSchema = mongoose.Schema({

 customer_sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
 customer_receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
 sent_tpc : Number

});
sendSchema.plugin(timestamps);

// create the model for users and expose it to our app
module.exports = mongoose.model('Sentpc', sendSchema);
