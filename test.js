/*!
 * sort-object <https://github.com/doowb/sort-object>
 *
 * Copyright (c) 2014-2015, Brian Woodward.
 * Licensed under the MIT License
 */

'use strict';

require('should');
var sortAsc = require('sort-asc');
var sortDesc = require('sort-desc');
var sortObj = require('./');

var makeCollection = function(postFix) {
  postFix = postFix || '';
  var collection = {};
  collection['one' + postFix] = { data: { date: '2015-JUN-30' } };
  collection['two' + postFix] = { data: { date: '2015-JUN-30' } };
  collection['three' + postFix] = { data: { date: '2015-JUN-30' } };
  collection['four' + postFix] = { data: { date: '2015-JUN-21' } };
  collection['five' + postFix] = { data: { date: '2015-JUN-21' } };
  collection['six' + postFix] = { data: { date: '2015-JUN-21' } };
  collection['seven' + postFix] = { data: { date: '2015-JUN-29' } };
  collection['eight' + postFix] = { data: { date: '2015-JUN-29' } };
  collection['nine' + postFix] = { data: { date: '2015-JUN-29' } };
  collection['ten' + postFix] = { data: { date: '2015-JUN-29' } };
  return collection;
};

describe('sort object', function() {
  it('should create a new object with only the given keys.', function() {
    var o = {a: 1, c: 2, b: 3};
    var actual = sortObj(o, {keys: ['a', 'b']});

    Object.keys(actual)[0].should.equal('a');
    Object.keys(actual)[1].should.equal('b');
    actual.should.not.have.property('c');
  });

  it('should sort the keys on an object with alphabetical keys', function() {
    var o = {a: 1, c: 2, b: 3};
    var actual = sortObj(o);

    Object.keys(actual)[0].should.equal('a');
    Object.keys(actual)[1].should.equal('b');
    Object.keys(actual)[2].should.equal('c');
  });

  it('should sort the keys on an object with numerical keys', function() {
    var o = {1: 1, 3: 3, 2: 2};
    var actual = sortObj(o);

    Object.keys(actual)[0].should.equal('1');
    Object.keys(actual)[1].should.equal('2');
    Object.keys(actual)[2].should.equal('3');
  });

  it('should sort the keys on an object in descending order.', function() {
    var o = {a: 1, c: 2, b: 3};
    var actual = sortObj(o, {sortOrder: 'desc'});

    Object.keys(actual)[0].should.equal('c');
    Object.keys(actual)[1].should.equal('b');
    Object.keys(actual)[2].should.equal('a');
  });

  it('should sort the keys on an object in ascending order.', function() {
    var o = {a: 1, c: 2, b: 3};
    var actual = sortObj(o, {sortOrder: 'asc'});

    Object.keys(actual)[0].should.equal('a');
    Object.keys(actual)[1].should.equal('b');
    Object.keys(actual)[2].should.equal('c');
  });

  it('should sort the keys using a custom function.', function() {
    var o = {a: 1, c: 2, e: 5, d: 4, b: 3};
    var actual = sortObj(o, {
      sort: function(a, b) {
        return a < b ? -1 : 1;
      }
    });
    actual.should.eql({a: 1, b: 3, c: 2, d: 4, e: 5});

    Object.keys(actual)[0].should.equal('a');
    Object.keys(actual)[1].should.equal('b');
    Object.keys(actual)[2].should.equal('c');
  });

  it('should sort keys to the order in the given array.', function() {
    var o = sortObj({a: 'a', b: 'b', c: 'c'}, ['c', 'a', 'b']);

    Object.keys(o)[0].should.equal('c');
    Object.keys(o)[1].should.equal('a');
    Object.keys(o)[2].should.equal('b');
  });

  it('should use a function to sort keys in the given array.', function() {
    var o = sortObj({a: 'a', b: 'b', c: 'c'}, {
      keys: ['c', 'a'],
      sort: sortDesc
    });

    Object.keys(o)[0].should.equal('c');
    Object.keys(o)[1].should.equal('a');
    o.should.not.have.property('b');
  });

  it('should use a function to sort keys in the given array.', function() {
    var o = sortObj({a: 'a', b: 'b', c: 'c'}, {
      keys: ['b', 'a'],
      sort: sortAsc
    });

    Object.keys(o)[0].should.equal('a');
    Object.keys(o)[1].should.equal('b');
    o.should.not.have.property('c');
  });

  it('should use a `sortBy` function to return an array of keys to sort by.', function() {
    var old = {one: 'aa', two: 'bc', three: 'ab'};
    var o = sortObj(old, {
      sortBy: function(obj) {
        var arr = [];
        Object.keys(obj).filter(function(key) {
          if (/^a/.test(obj[key])) {
            arr.push(key);
          }
        });
        return arr.reverse();
      }
    });

    Object.keys(o).length.should.equal(2);
    Object.keys(o)[0].should.equal('three');
    Object.keys(o)[1].should.equal('one');
  });

  it('should sort the keys of a complex obj', function() {
    var collection = makeCollection();
    var actual = sortObj(collection);
    Object.keys(actual)[0].should.equal('eight');
    Object.keys(actual)[1].should.equal('five');
    Object.keys(actual)[2].should.equal('four');
    Object.keys(actual)[3].should.equal('nine');
    Object.keys(actual)[4].should.equal('one');
    Object.keys(actual)[5].should.equal('seven');
    Object.keys(actual)[6].should.equal('six');
    Object.keys(actual)[7].should.equal('ten');
    Object.keys(actual)[8].should.equal('three');
    Object.keys(actual)[9].should.equal('two');
  });

  it('should sort the keys of a complex obj with keys containing `.`', function() {
    var collection = makeCollection('.md');
    var actual = sortObj(collection);
    Object.keys(actual)[0].should.equal('eight.md');
    Object.keys(actual)[1].should.equal('five.md');
    Object.keys(actual)[2].should.equal('four.md');
    Object.keys(actual)[3].should.equal('nine.md');
    Object.keys(actual)[4].should.equal('one.md');
    Object.keys(actual)[5].should.equal('seven.md');
    Object.keys(actual)[6].should.equal('six.md');
    Object.keys(actual)[7].should.equal('ten.md');
    Object.keys(actual)[8].should.equal('three.md');
    Object.keys(actual)[9].should.equal('two.md');
  });

  it('should use a `prop` string to sort on value properties.', function() {
    var collection = makeCollection();
    var actual = sortObj(collection, { prop: 'data.date' });
    Object.keys(actual)[0].should.equal('four');
    Object.keys(actual)[1].should.equal('five');
    Object.keys(actual)[2].should.equal('six');
    Object.keys(actual)[3].should.equal('seven');
    Object.keys(actual)[4].should.equal('eight');
    Object.keys(actual)[5].should.equal('nine');
    Object.keys(actual)[6].should.equal('ten');
    Object.keys(actual)[7].should.equal('one');
    Object.keys(actual)[8].should.equal('two');
    Object.keys(actual)[9].should.equal('three');
  });

  it('should use a `prop` string to sort on value properties with keys containing `.`', function() {
    var collection = makeCollection('.md');
    var actual = sortObj(collection, { prop: 'data.date' });
    Object.keys(actual)[0].should.equal('four.md');
    Object.keys(actual)[1].should.equal('five.md');
    Object.keys(actual)[2].should.equal('six.md');
    Object.keys(actual)[3].should.equal('seven.md');
    Object.keys(actual)[4].should.equal('eight.md');
    Object.keys(actual)[5].should.equal('nine.md');
    Object.keys(actual)[6].should.equal('ten.md');
    Object.keys(actual)[7].should.equal('one.md');
    Object.keys(actual)[8].should.equal('two.md');
    Object.keys(actual)[9].should.equal('three.md');
  });

  it('should use a `prop` string to sort on value properties in descending order.', function() {
    var collection = makeCollection();
    var actual = sortObj(collection, { prop: 'data.date', sortOrder: 'desc' });
    Object.keys(actual)[0].should.equal('one');
    Object.keys(actual)[1].should.equal('two');
    Object.keys(actual)[2].should.equal('three');
    Object.keys(actual)[3].should.equal('seven');
    Object.keys(actual)[4].should.equal('eight');
    Object.keys(actual)[5].should.equal('nine');
    Object.keys(actual)[6].should.equal('ten');
    Object.keys(actual)[7].should.equal('four');
    Object.keys(actual)[8].should.equal('five');
    Object.keys(actual)[9].should.equal('six');
  });

  it('should use a `prop` string to sort on value properties in ascending order.', function() {
    var collection = makeCollection();
    var actual = sortObj(collection, { prop: 'data.date', sortOrder: 'asc' });
    Object.keys(actual)[0].should.equal('four');
    Object.keys(actual)[1].should.equal('five');
    Object.keys(actual)[2].should.equal('six');
    Object.keys(actual)[3].should.equal('seven');
    Object.keys(actual)[4].should.equal('eight');
    Object.keys(actual)[5].should.equal('nine');
    Object.keys(actual)[6].should.equal('ten');
    Object.keys(actual)[7].should.equal('one');
    Object.keys(actual)[8].should.equal('two');
    Object.keys(actual)[9].should.equal('three');
  });
});
