'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const helpers = require('./helpers/utils');
const hbHelpers = require('./helpers/handlebars');

const app = express();

const hbs = exphbs.create({
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
