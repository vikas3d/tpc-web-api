
//require mongoose node module
const mongoose = require('mongoose');

//connect to local mongodb database
const db = mongoose.connect('mongodb://dev:vick1234@ds155644.mlab.com:55644/tpc-dev', {
    useMongoClient: true,
    /* other options */
});

//attach lister to connected event
mongoose.connection.once('connected', function() {
    console.log("Connected to dev database ")
});
