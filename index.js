/*!
 * sort-object <https://github.com/helpers/sort-object>
 *
 * Copyright (c) 2014-2015, Brian Woodward.
 * Licensed under the MIT License
 */

'use strict';

var sortDesc = require('sort-desc');
var sortAsc = require('sort-asc');
var isObject = require('isobject');
var get = require('get-value');
var bytewise = require('bytewise');

var sortFns = {desc: sortDesc, asc: sortAsc};

module.exports = sort;

function sort (obj, options) {
  if (Array.isArray(options)) {
    options = { keys: options };
  }

  var opts = options || {};
  var prop = opts.prop;
  var getFn = opts.get || function (val) {
    if (prop) return get(val, prop);
  };
  var fn = opts.sort || sortDesc;

  if (Boolean(opts.sortOrder)) {
    fn = sortFns[opts.sortOrder.toLowerCase()];
  }

  var keys = opts.keys || [];

  if (Boolean(opts.sortBy)) {
    keys = opts.sortBy(obj);
    fn = null;
  }

  if (Boolean(opts.keys)) {
    if (!opts.sort && !opts.sortOrder && !opts.sortBy) {
      fn = null;
    }
  }

  var tmp = {};
  var sortBy = {};

  var build = keys.length === 0 ? fromObj : fromKeys;
  build(obj, keys, tmp, sortBy, function (val) {
    return getFn(val, prop);
  });

  if (fn) {
    keys.sort(fn);
  }

  var len = keys.length, i = 0, j = 0;
  var res = {}, prev;
  while (len--) {
    var key = keys[i++];
    if (prev !== key) j = 0;
    var k = sortBy[key][j++];
    res[k] = tmp[k];
    prev = key;
  }
  return res;
}

// build up the sorting information from the `obj`
function fromObj (obj, keys, tmp, sortBy, fn) {
  for (var key in obj) {
    var val = obj[key];
    var item = isObject(val) ? fn(val) || key : key;
    item = isObject(item) ? bytewise.encode(JSON.stringify(item)).toString() : item;
    sortBy[item] = sortBy[item] || [];
    sortBy[item].push(key);
    keys.push(item);
    tmp[key] = val;
  }
}

// build up the sorting information from the supplied keys
function fromKeys (obj, keys, tmp, sortBy) {
  var len = keys.length, i = 0;
  while (len--) {
    var key = keys[i++];
    var val = obj[key];
    sortBy[key] = sortBy[key] || [];
    sortBy[key].push(key);
    tmp[key] = val;
  }
}
