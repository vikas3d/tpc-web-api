// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
const timestamps = require('mongoose-timestamp');
const customerSchema = mongoose.Schema({

    fisrtname: String,
    lastname: String,
    email: String,
    password: String,
    tcc: String,
    status: {type: Boolean, default: false}

});
customerSchema.plugin(timestamps);
// create the model for users and expose it to our app
module.exports = mongoose.model('customers', customerSchema);
