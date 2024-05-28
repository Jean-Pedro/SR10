var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser')
var path = require('path');
var logger = require('morgan');
const session = require('./utils/session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var recruteurRouter = require('./routes/recruteur');
var adminRouter = require('./routes/admin');
var candidatRouter = require('./routes/candidat');
var authRouteur = require('./routes/auth');

var app = express();

// var session = require('express-session');

// const uneHeure = 1000*60*60
// app.use(session({
//   secret: "zebi",
//   saveUninitialized:true,
//   cookie: {maxAge: uneHeure},
//   resave: false
// }));
app.use(session.init())
app.use(cookieParser());

//app.use("/CSS", express.static(__dirname + "/CSS/"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recruteur', recruteurRouter);
app.use('/admin', adminRouter);
app.use('/candidat', candidatRouter);
app.use('/auth', authRouteur);


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

module.exports = app;
