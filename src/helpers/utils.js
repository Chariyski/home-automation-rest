'use strict';
const fs = require('fs');
const path = require('path');
const callsite = require('callsite');

module.exports = {
  camelCaseToHyphen: function (str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  },

  camelCaseToRegularForm: function (string) {
    return string.replace(/([A-Z]+)/g, ' $1').split(' ').map(function (subString) {
      return subString.toLowerCase();
    }).join(' ');
  },

  RegularFormToCamelCase: function (string) {
    return string
      .split(' ')
      .map(function (subString, index) {
        if (index === 0) {
          return subString.charAt(0).toLowerCase() + subString.slice(1);
        } else {
          return subString.charAt(0).toUpperCase() + subString.slice(1);
        }
      })
      .join('');
  },

  getFullPath: function (relativePath) {
    const stack = callsite();
    const requester = stack[1].getFileName();
    const relPath = relativePath ? relativePath : '';

    return path.normalize(path.dirname(requester) + '/' + relPath);
  },

  readJSONSync: function (file) {
    let json = {};

    try {
      json = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (error) {
      console.log(`${file} is not existing`);
    }

    return json;
  },

  saveJSON: function (path, json, callback) {
    fs.writeFile(path, JSON.stringify(json), function (err) {
      if (err) {
        console.log(err);
        callback({
          status: err
        });
        return err;
      }

      if (callback) {
        callback({
          status: 'success'
        });
      }
    });
  },

  saveStaircaseConfiguration: function (path, staircase, callback) {
    this.saveJSON(path, {
      animationMode: staircase.animationMode,
      animationModes: staircase.animationModes,
      color: staircase.color,
      direction: staircase.direction,
      directions: staircase.directions,
      workMode: staircase.workMode,
      workModes: staircase.workModes
    }, callback);
  }
};
