var app = require('express')();
app.set('view engine', 'ejs');
var nodemailer = require('express-mailer');


module.exports = {
    'mailer': nodemailer.extend(app, {
        from: 'no-reply@pleydata.com',
        host: "smtp.gmail.com",//'smtp.gmail.com', // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
        auth: {
            //user: '3dvirtuallabs.sandbox@gmail.com',
            user:"rmckenzie@pleydata.com",
            pass:"olqrzjuwdqcqeull"
            //pass: 'xqrbykpqpzaxkqud'
        }
    })
}