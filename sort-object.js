/**!
 * sort-object
 * http://github.com/helpers/sort-object
 * Copyright (c) 2013, Assemble, contributors
 * Licensed under the MIT license.
 */

var sort = module.exports = function (obj) {

  var sorted = {},
      keys   = [],
      key;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }

  keys.sort();
  for (var index in keys) {
    key = keys[index];
    sorted[key] = obj[key];
  }

  return sorted;

};