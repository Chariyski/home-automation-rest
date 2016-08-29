'use strict';

var helpers = require('../helpers/utils');
var StaircaseLight = require('../modules/staircase-lighting/src/index');
var staircaseConfigJSONLocation = helpers.getFullPath('../models/staircase.json');
var staircaseConfigJSON = helpers.readJSONSync(staircaseConfigJSONLocation);

var staircaseLight = new StaircaseLight({
  color: staircaseConfigJSON.color,
  workMode: staircaseConfigJSON.workMode,
  animationMode: staircaseConfigJSON.animationMode
});
helpers.saveJSON(staircaseConfigJSONLocation, staircaseLight);


var staircaseController = function () {
  var get = function (req, res) {
    res.json(staircaseLight);
  };

  var post = function (req, res) {
    var parameters = req.body;

    if (parameters.animationMode) {
      staircaseLight.setAnimationMode(parameters.animationMode);
    }

    if (parameters.color) {
      staircaseLight.setColor(parameters.color);
    }

    if (parameters.workMode) {
      staircaseLight.setWorkMode(parameters.workMode);
    }

    staircaseLight.start(); // TODO add to different rout

    helpers.saveJSON(staircaseConfigJSONLocation, staircaseLight, function (responce) {
      res.json({
        message: responce.status
      });
    });
  };

  return {
    get: get,
    post: post
  }
};

module.exports = staircaseController;
