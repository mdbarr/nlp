'use strict';

const {
  configuration, configure
} = require('./configuration');
const editDistance = require('./editDistance');
const metaphone = require('./metaphone');
const tokenize = require('./tokenize');
const utilities = require('./utilities');

module.exports = {
  configure,
  configuration,
  editDistance,
  metaphone,
  tokenize,
  utilities
};
