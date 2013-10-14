/**!
 * sort-object
 * http://github.com/helpers/sort-object
 * Copyright (c) 2013, Assemble, contributors
 * Licensed under the MIT license.
 */

var _ = require('lodash');

/**
 * Custom sort function to allow sorting by descending order
 * @param  {Object}     options optional parameter specifying which order to sort in.
 * @return {Function}   function used to pass into a sort function.
 */
var sortBy = function (options) {

  var opts = _.extend({ order: 'asc' }, options);

  return function (objA, objB) {
    var result = 0;
    result = objA < objB ? -1 : 1;

    if(opts.order.toLowerCase() === 'desc') {
      return result * -1;
    }
    return result;
  };
};

/**
 * Sorts the ksys on an object
 * @param  {Object} obj     Object that has keys to be sorted
 * @param  {Object} options Optional parameter specifying orders for the function
 * @return {Object}         Object with keys sorted
 */
function sort(obj, options) {

  var opts = _.extend({
    order: 'asc'
  }, options);

  var sorted = {},
      keys   = [],
      key;

  keys = _.keys(obj);
  keys.sort(sortBy(options));

  for (var index in keys) {
    key = keys[index];
    sorted[key] = obj[key];
  }

  return sorted;
};

module.exports = sort;