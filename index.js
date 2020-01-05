'use strict';

const {
  configuration, configure
} = require('./configuration');
const corpus = require('./corpus');
const editDistance = require('./editDistance');
const metaphone = require('./metaphone');
const tokenize = require('./tokenize');
const utilities = require('./utilities');

module.exports = {
  configure,
  configuration,
  corpus,
  editDistance,
  metaphone,
  tokenize,
  utilities
};
