'use strict';

const editDistance = require('./editDistance');
const metaphone = require('./metaphone');
const tokenize = require('./tokenize');

Object.defineProperty(String.prototype, '$editDistance', {
  value (string) {
    return editDistance(this, string);
  },
  enumerable: false,
  configurable: true,
});

Object.defineProperty(String.prototype, '$metaphone', {
  value () {
    return metaphone(this);
  },
  enumerable: false,
  configurable: true,
});

Object.defineProperty(String.prototype, '$tokenize', {
  value (regExp) {
    return tokenize(this, regExp);
  },
  enumerable: false,
  configurable: true,
});

Object.defineProperty(String.prototype, '$treebank', {
  value () {
    return tokenize.treebank(this);
  },
  enumerable: false,
  configurable: true,
});
