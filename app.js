var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var hbs = require('hbs');

var indexRouter = require('./routes/index');
// var tourRouter = require('./routes/tour');

var app = express();

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

hbs.registerHelper('ifIsNthItem', function(options) {
  var index = options.data.index + 1;

  if (index === 3 || index === 4 || index === 9 || index === 10)
    return options.fn(this);
  else
    return options.inverse(this);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
