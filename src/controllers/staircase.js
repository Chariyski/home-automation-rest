'use strict';

const helpers = require('../helpers/utils');
const StaircaseLight = require('../modules/staircase-lighting/src/index');
const staircaseConfigJSONLocation = helpers.getFullPath('../models/staircase.json');
const staircaseConfigJSON = helpers.readJSONSync(staircaseConfigJSONLocation);

const staircaseLight = new StaircaseLight({
  _color: staircaseConfigJSON._color,
  _workMode: staircaseConfigJSON._workMode,
  _animationMode: staircaseConfigJSON._animationMode
});
helpers.saveJSON(staircaseConfigJSONLocation, staircaseLight);

const staircaseController = function () {
  const get = function (req, res) {
    res.json(staircaseLight);
  };

  const post = function (req, res) {
    const parameters = req.body;
    let animationMode;
    let workMode;

    console.log(parameters);

    if (parameters.animationMode) {
      animationMode = parameters.animationMode.trim();

      // Home-assistant currently is not supporting setting a value to drop down.
      if (staircaseLight[animationMode] === undefined) {
        animationMode = helpers.RegularFormToCamelCase(animationMode);
      }

      staircaseLight.animationMode = animationMode;
    }

    if (parameters.color) {
      staircaseLight.color = parameters.color.trim();
    }

    if (parameters.workMode) {
      workMode = parameters.workMode.trim();

      // Home-assistant currently is not supporting setting a value to drop down.
      if (staircaseLight[workMode] === undefined) {
        workMode = helpers.RegularFormToCamelCase(workMode);
      }

      staircaseLight.workMode = workMode;
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
