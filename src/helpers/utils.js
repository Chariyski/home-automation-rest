'use strict';

var path = require('path');
var callsite = require('callsite');

module.exports = {
  getFullPath: function(relativePath) {
    var stack = callsite();
    var requester = stack[1].getFileName();

    return path.normalize(path.dirname(requester) + '/' + relativePath);
  }
};
