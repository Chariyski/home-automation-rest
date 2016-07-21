'use strict';

var path = require('path');
var fs = require('fs');
var StaircaseLight = require('../modules/staircase-lighting/src/index');

var staircaseLight = new StaircaseLight();

var staircaseController = function () {
  var post = function (req, res) {
    var parameters = req.body;
    console.log('Parameters', parameters);

    fs.writeFile(path.normalize(__dirname + '/' + '../models/staircase.json'), JSON.stringify(parameters), function (err) {
      if (err) {
        return console.log(err);
      }

      console.log('The file was saved!');
    });

    res.json({
      message: 'The file was saved!'
    });

    staircaseLight.setAnimationMode(parameters.animationMode);
    staircaseLight.setColor(parameters.color);
    staircaseLight.setWorkMode(parameters.workMode);
    staircaseLight.start();
  };

  return {
    post: post
  }
};

module.exports = staircaseController;
