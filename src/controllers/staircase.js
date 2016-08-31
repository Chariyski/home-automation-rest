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
    console.log(parameters);

    if (parameters.animationMode) {
      var animationMode = parameters.animationMode.trim();

      // Home-assistant currently is not supporting setting a value to drop down.
      if (staircaseLight[animationMode] === undefined) {
        animationMode = helpers.RegularFormToCamelCase(animationMode);
      }

      staircaseLight.setAnimationMode(animationMode);
    }

    if (parameters.color) {
      staircaseLight.setColor(parameters.color.trim());
    }

    if (parameters.workMode) {
      var workMode = parameters.workMode.trim();

      // Home-assistant currently is not supporting setting a value to drop down.
      if (staircaseLight[workMode] === undefined) {
        workMode = helpers.RegularFormToCamelCase(workMode);
      }

      staircaseLight.setWorkMode(workMode);
    }

    staircaseLight.start(); // TODO add to different rout

    helpers.saveJSON(staircaseConfigJSONLocation, staircaseLight, function (responce) {
      res.json({
        message: responce.status,
        staircase: staircaseLight
      });
    });
  };

  return {
    get: get,
    post: post
  }
};

module.exports = staircaseController;
