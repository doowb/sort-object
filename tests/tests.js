/**!
 * sort-object
 * http://github.com/helpers/sort-object
 * Copyright (c) 2013, Assemble, contributors
 * Licensed under the MIT license.
 */

var sort = require('../sort-object');
var assert = require('assert');

describe('Sort Object', function () {

  it('should sort the keys on an object', function () {

    var outOfOrder = {
      'foo': 1,
      'baz': 2,
      'bar': 3
    };

    var expected = {
      'bar': 3,
      'baz': 2,
      'foo': 1
    };

    var actual = sort(outOfOrder);

    assert.deepEqual(expected, actual);

  });

  it('should sort the keys on an object in decending order', function () {

    var outOfOrder = {
      'foo': 1,
      'baz': 2,
      'bar': 3
    };

    var expected = {
      'foo': 1,
      'bar': 3,
      'baz': 2
    };

    var actual = sort(outOfOrder, { order: 'desc' });

    assert.deepEqual(expected, actual);

  });

});