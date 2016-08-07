'use strict';

var helpers = require('../helpers/utils');
var staircaseModel = require('../modules/staircase-lighting/src/index').getModel();
var animationModes = staircaseModel.animationModes.map(function (element) {
  return helpers.camelCaseToHyphen(element);
});
var workModes = staircaseModel.workModes.map(function (element) {
  return helpers.camelCaseToHyphen(element);
});


var rootControler = function (req, res) {
  res.render('staircase', {
    title: 'Staircase',
    color: '#00ff00',
    animationModes: animationModes,
    workModes: workModes
  });
};

module.exports = rootControler;
