/*!
 * sort-keys <https://github.com/helpers/sort-keys>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT License
 */

'use strict';

var _ = require ('lodash');

var noop = function (keys) {
  return keys;
};


module.exports = function (obj, options) {
  var opts = _.extend({fn: noop}, options);
  var keys = opts.keys || _.keys(obj);

  var o = {};
  keys.sort(opts.fn).forEach(function(key, i) {
    o[keys[i]] = obj[keys[i]];
  });

  return o;
};