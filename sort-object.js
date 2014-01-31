/**!
 * sort-object
 * http://github.com/helpers/sort-object
 * Copyright (c) 2013, Assemble, contributors
 * Licensed under the MIT license.
 */

var _ = require('lodash');

var inspect = require('util').inspect;

function getKeys (obj) {
  return _.keys(obj);
};

function orderBy(result, opts) {
  if (opts.order.toLowerCase() === 'desc') {
    return result * -1;
  }
  return result;
};

/**
 * Custom sort function to allow sorting by descending order
 * @param  {Object}     opts optional parameter specifying which order to sort in.
 * @return {Function}   function used to pass into a sort function.
 */
function sortBy (opts) {
  return function (objA, objB) {
    var result = 0;
    result = objA < objB ? -1 : 1;
    return orderBy(result, opts);
  };
};

function sortByProperty (opts) {
  return function (objA, objB) {
    var result = 0;
    var propA = objA[opts.property];
    var propB = objB[opts.property];

    if ((_.isNull(propA) || _.isUndefined(propA)) &&
        (_.isNull(propB) || _.isUndefined(propB))) {
      return result;
    }

    if (_.isNull(propA) || _.isUndefined(propA)) {

      result = -1;

    } else if (_.isNull(propB) || _.isUndefined(propB)) {

      result = 1;

    } else {

      result = objA[opts.property] < objB[opts.property] ? -1 : 1;

    }
    return orderBy(result, opts);
  };
};

function sortKeys (obj, opts) {
  var keys = [];
  var key;

  keys = opts.keys(obj);
  keys.sort(sortBy(opts));

  return keys;
};

function sortProperties (obj, opts) {

  var sorted = {};
  var pairs = _.pairs(obj);

  if (opts.property === true) {

    // sort on the value
    var values = [];
    for (var i = 0; i < pairs.length; i++) {
      var item = {
        key: pairs[i][0],
        value: pairs[i][1]
      };
      values.push(item);
    }
    values.sort(sortByProperty(_.extend({}, opts, { property: 'value' })));

    for (var i = 0; i < values.length; i++) {
      sorted[values[i].key] = values[i].value;
    }

  } else {

    // sort on the value of the property key
    var values = [];
    for (var i = 0; i < pairs.length; i++) {
      var value = pairs[i][1];
      value.__origKey = pairs[i][0];
      values.push(value);
    }
    values.sort(sortByProperty(opts));

    for (var i = 0; i < values.length; i++) {
      var key = values[i].__origKey;
      var value = values[i];
      delete value.__origKey;
      sorted[key] = value;
    }

  }

  return sorted;
};


/**
 * Sorts the keys on an object
 * @param  {Object} obj     Object that has keys to be sorted
 * @param  {Object} options Optional parameter specifying orders for the function
 * @return {Object}         Object with keys sorted
 */
function sort(obj, options) {

  var opts = _.extend({ order: 'asc', property: false, keys: getKeys }, options);

  var sorted = {};
  var keys = [];
  var key;

  if(opts.property && opts.property !== false) {

    sorted = sortProperties(obj, opts);

  } else {

    keys = sortKeys(obj, opts);
    for (var index in keys) {
      key = keys[index];
      sorted[key] = obj[key];
    }

  }

  return sorted;
};

module.exports = sort;