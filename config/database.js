
//require mongoose node module
const mongoose = require('mongoose');

//connect to local mongodb database
const db = mongoose.connect('mongodb://dev:vick1234@ds135594.mlab.com:35594/tcc', {
    useMongoClient: true,
    /* other options */
});

//attach lister to connected event
mongoose.connection.once('connected', function() {
    console.log("Connected to database")
});

