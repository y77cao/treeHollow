//Default
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//local and Facebook authentication using Passport module
var passport = require('passport')
var FBStrategy = require('passport-facebook').Strategy
var localStrategy = require('passport-local').Strategy
var FBConfig = require('./models/FBConfig')

//var localConfig = require(./models/User)
//APIs
var index = require('./routes/index');
var stickers = require('./routes/stickers');
var fb = require('./routes/facebook')
//MongoDB
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/test')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err)); //A promise here, for asymchronous execution
//Express
var express = require('express');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(4000, function() {
  console.log('Server listening on port 4000');
});


//API routing
app.use('/', index);
app.use('/stickers', stickers);

// Passport session setup
app.use(passport.initialize());
app.use(passport.session());
 passport.serializeUser(function(user, done) {
   done(null, user);
});
 passport.deserializeUser(function(obj, done) {
   done(null, obj);
});

//Facebook authentication
passport.use(new FBStrategy({
    clientID: '794736684017182',
    clientSecret: '3be1ca5c9a5942685eebd3b7d9ef1640',
    callbackURL: "http://localhost:4000/auth/facebook/return"
  },
function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

function ensureAuthenticated(req, res, next) {
   if (req.isAuthenticated()) { return next(); }
   res.redirect('/login')
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
