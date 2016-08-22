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
  var post = function (req, res) {
    var parameters = req.body;

    staircaseLight.setAnimationMode(parameters.animationMode);
    staircaseLight.setColor(parameters.color);
    staircaseLight.setWorkMode(parameters.workMode);
    staircaseLight.start();

    helpers.saveJSON(staircaseConfigJSONLocation, staircaseLight, function (responce) {
      res.json({
        message: responce.status
      });
    });
  };

  return {
    post: post
  }
};

module.exports = staircaseController;
