var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var cons = require('consolidate');
var logger = require('morgan');
var mongoose= require('mongoose');
var bodyParser = require('body-parser');
const passport = require('passport');
var methodOverride = require('method-override');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dituRouter = require('./routes/ditu');

var app = express();

require('./config/passport.js')(passport);

app.use(methodOverride('_method'))

app.use(session({
    secret: 'secure',
    resave: true,
    saveUninitialized: true,
}));

//Passport config
app.use(passport.initialize());
app.use(passport.session());

//Set up default mongoose connection
var mongoDB ="mongodb://127.0.0.1:27017/test";
//  var mongoDB ="mongodb://abhijeet.anand99:ditu2018@ds131753.mlab.com:31753/ditu-assistant";
mongoose.connect(mongoDB, { useNewUrlParser: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console,'MongoDB connection error'));

// view engine setup
app.engine('html', cons.nunjucks);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ditu', dituRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
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

//Global Variables
app.use(function(req, res, next){
    if(user){
    res.locals.user = req.user;
    }else{
        res.locals.user =null;  
    }
    next();
});

module.exports = app;
