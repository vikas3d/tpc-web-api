// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
const timestamps = require('mongoose-timestamp');
const customerSchema = mongoose.Schema({

  firstname    : String,
  lastname     : String,
  phone        : String,
  unique_id    : {type:String,unique:true},
  default_id   : String,
  qrcode       : String,
  email        : {type:String,required:true,unique:true},
  password     : {type:String,required:true},
  address      : String,
  device_id    : String,
  //status       : { type: Boolean, default: false },
  push_notification  : { type: Boolean, default: false }

});
customerSchema.plugin(timestamps);

// create the model for users and expose it to our app
module.exports = mongoose.model('Customer', customerSchema);
