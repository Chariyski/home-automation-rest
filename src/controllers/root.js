'use strict';

var rootControler = function(req, res) {
  res.render('staircase', {
    title: 'Staircase',
    color: '#00ff00',
    animations: [{
      type: 'default',
      name: 'Default'
    }, {
      type: 'test',
      name: 'test'
    }],
    modes: ['one', 'two', 'many more ....']
  });
};

module.exports = rootControler;
