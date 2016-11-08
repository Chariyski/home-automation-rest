'use strict';

const helpers = require('../helpers/utils');
const StaircaseLight = require('../modules/staircase-lighting/src/index');
const staircaseConfigJSONLocation = helpers.getFullPath('../models/staircase.json');
const staircaseConfigJSON = helpers.readJSONSync(staircaseConfigJSONLocation);
const staircaseLight = new StaircaseLight();

staircaseLight.color = staircaseConfigJSON.color || '#ffffff';
staircaseLight.animationMode = staircaseConfigJSON.animationMode || 'stairByStair';
staircaseLight.workMode = staircaseConfigJSON.workMode || 'off';

helpers.saveStaircaseConfiguration(staircaseConfigJSONLocation, staircaseLight);

const staircaseController = function () {
  const get = function (req, res) {
    res.json(staircaseLight);
  };

  const post = function (req, res) {
    const parameters = req.body && req.body.message;
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

    helpers.saveStaircaseConfiguration(staircaseConfigJSONLocation, staircaseLight, function (responce) {
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
