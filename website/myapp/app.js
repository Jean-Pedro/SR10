var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser')
var path = require('path');
var logger = require('morgan');
const session = require('./utils/session');
const multer = require('multer');
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var recruteurRouter = require('./routes/recruteur');
var adminRouter = require('./routes/admin');
var candidatRouter = require('./routes/candidat');
var authRouteur = require('./routes/auth');

var app = express();

app.use(session.init())
app.use(cookieParser());


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

// const uploadDir = path.join(__dirname, 'public/uploads');

// if (!fs.existsSync(uploadDir)){
//     fs.mkdirSync(uploadDir, { recursive: true });
// }


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });



module.exports = app;
