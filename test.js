/*!
 * sort-keys <https://github.com/jonschlinkert/sort-keys>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var helper = require('./');

describe('sort object', function () {
  it('should sort the keys on an object', function () {
    var o = {a: 1, c: 2, b: 3};
    var actual = helper(o);

    assert.deepEqual(actual, {a: 1, b: 3, c: 2});
  });

  it('should create a new object with only the given keys.', function () {
    var o = {a: 1, c: 2, b: 3};
    var actual = helper(o, {keys: ['a', 'b']});

    assert.deepEqual(actual, {a: 1, b: 3});
  });

  it('should sort the keys using a custom function.', function () {
    var o = {a: 1, c: 2, e: 5, d: 4, b: 3};
    var actual = helper(o, {
      fn: function (a, b) {
        return a < b ? -1 : 1;
      }
    });
    assert.deepEqual(actual, {a: 1, b: 3, c: 2, d: 4, e: 5});
  });
});
