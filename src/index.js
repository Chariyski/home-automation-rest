'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var helpers = require('./helpers/utils');
var hbHelpers = require('./helpers/handlebars');

var app = express();

var hbs = exphbs.create({
  defaultLayout: helpers.getFullPath('views/layouts/main'),
  helpers: hbHelpers,
  partialsDir: [helpers.getFullPath('views/partials/')]
});

app.engine('handlebars', hbs.engine);

app.use(bodyParser.json());
app.use('/staircase', require('./routes/staircase'));
app.use(express.static(helpers.getFullPath('public')));

app.set('view engine', 'handlebars');
app.set('views', helpers.getFullPath('views/'));

app.get('/', require('./controllers/root'));

app.listen(3000, function() {
  console.log('Server listening on: 3000');
});
