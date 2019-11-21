let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let cartRouter = require('./routes/cart');
let productsRouter = require('./routes/cart');

let app = express();

// Setup for the view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Allows the use of specific modules based on the url endpoints.
app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.use('/products', productsRouter);

// Throws an error if none of the above are found.
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler.
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Throws a 500, and gives error.
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
