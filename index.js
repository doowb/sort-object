/*!
 * sort-keys <https://github.com/helpers/sort-keys>
 *
 * Copyright (c) 2014 Brian Woodward, Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var sortDesc = require('sort-desc');
var sortAsc = require('sort-asc');


module.exports = function (obj, options) {
  var sort = {desc: sortDesc, asc: sortAsc};
  var fn, opts = {}, keys = Object.keys(obj);

  // if `options` is an array, assume it's keys
  if (Array.isArray(options)) {
    opts.keys = options;
    options = {};
  // if `options` is a function, assuming it's a sorting function
  } else if (typeof options === 'function') {
    fn = options;
  } else {
    for (var opt in options) {
      if (options.hasOwnProperty(opt)) {
        opts[opt] = options[opt]
      }
    }
  }

  // Default sort order is descending
  fn = opts.sort || sortDesc;

  if (opts.hasOwnProperty('sortOrder')) {
    fn = sort[opts.sortOrder.toLowerCase()];
  }

  if (opts.hasOwnProperty('sortBy')) {
    keys = opts.sortBy(obj);
    fn = null;
  }

  if (opts.hasOwnProperty('keys')) {
    keys = opts.keys;
    if (!opts.sort && !opts.sortOrder && !opts.sortBy) {
      fn = null;
    }
  }

  if (fn) {
    keys = keys.sort(fn);
  }

  var o = {};
  keys.forEach(function(key, i) {
    o[keys[i]] = obj[keys[i]];
  });

  return o;
};