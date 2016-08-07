'use strict';

var path = require('path');
var callsite = require('callsite');

module.exports = {
  camelCaseToHyphen: function (str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  },
  getFullPath: function (relativePath) {
    var stack = callsite();
    var requester = stack[1].getFileName();

    return path.normalize(path.dirname(requester) + '/' + relativePath);
  }
};
