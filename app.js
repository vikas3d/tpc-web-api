/*********************** Database connection ********************************/

const Database = require('./config/database');

/************************** required stuff **********************************/

const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash    = require('connect-flash');
const session      = require('express-session');
const jwt    = require('jsonwebtoken');
const http = require('http').Server(app);
const io = require('socket.io')(http);

/************************** Api route setup *********************************/

const index = require('./routes/index');
const rate = require('./routes/rate');
const customer = require('./routes/customers');
const buytcc = require('./routes/buytcc');
const authenticate = require('./routes/authenticate');
const signup = require('./routes/signup-customers');
const buyer = require('./routes/buying_status');
const sendtpc = require('./routes/send_tpc');

/************************** view engine setup *******************************/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

require('./config/passport')(passport); // pass passport for configuration

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// required for passportzzz
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./routes/routes')(app, passport);

/************************** Api routes **********************************/
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
});
app.use('/', index);
app.use('/rate', rate);
app.use('/customer', customer);
app.use('/customer/signup', signup);
app.use('/customer/login', authenticate);
//====================================== Api authentication  ===================================//

/*app.use('/api/auth', authenticate);
app.use(function(req, res, next) {

     var token = req.body.token || req.query.token || req.headers['x-access-token'];
     if (token) {
     jwt.verify(token, 'secret', function(err, decoded) {
     if (err) {
     return res.json({ success: false, message: 'Failed to authenticate token.' });
     } else {
     req.decoded = decoded;
     next();
     }
     });
     } else {
     return res.status(403).send({
     success: false,
     message: 'No token provided.'
     });

     }
 });
*/
// routes need auth
app.use('/api/customerslist', customer);
app.use('/api/buytpc', buytcc);
app.use('/api/rate', rate);
app.use('/api/buystatus/', buyer);
app.use('/api/sendtpc/', sendtpc);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
