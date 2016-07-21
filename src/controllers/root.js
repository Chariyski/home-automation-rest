'use strict';

var staircaseModel = require('../modules/staircase-lighting/src/index').getModel();

var rootControler = function (req, res) {
  res.render('staircase', {
    title: 'Staircase',
    color: '#00ff00',
    animationModes: staircaseModel.animationModes,
    workModes: staircaseModel.workModes
  });
};

module.exports = rootControler;
