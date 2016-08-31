'use strict';
var fs = require('fs');
var path = require('path');
var callsite = require('callsite');

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
    var stack = callsite();
    var requester = stack[1].getFileName();
    var relativePath = relativePath ? relativePath : '';

    return path.normalize(path.dirname(requester) + '/' + relativePath);
  },

  readJSONSync: function (file) {
    var json = {};

    try {
      json = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (error) {
      console.log(error);
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
  }
};
