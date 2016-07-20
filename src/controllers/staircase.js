'use strict';

var path = require('path');
var fs = require('fs');
var staircaseLight = require('../modules/staircase-lighting/index');

staircaseLight.init();

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

    staircaseLight.animate({
      color: parameters.color
    });
  };

  return {
    post: post
  }
};

module.exports = staircaseController;
