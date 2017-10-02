// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
const timestamps = require('mongoose-timestamp');
var rateSchema = mongoose.Schema({

    rate: Number,
    min_tcc: Number,
    stock: Number,
    commission:{type:Number,default:0}

});
rateSchema.plugin(timestamps);

// create the model for users and expose it to our app
module.exports = mongoose.model('Rate', rateSchema);
