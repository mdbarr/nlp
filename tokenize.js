'use strict';

const { configuration } = require('./configuration');
const {
  isNotPunctuation, isNotStopword
} = require('./utilities');

module.exports = function (string, {
  tokenizer = configuration.language.tokenizerRegExp,
  stripPunctuation = configuration.stripPunctuation,
  stripStopwords = configuration.stripStopwords
} = {}) {
  let tokens = string.toString().
    match(tokenizer) || [];

  if (stripPunctuation) {
    tokens = tokens.filter(token => { return isNotPunctuation(token); });
  }

  if (stripStopwords) {
    tokens = tokens.filter(token => { return isNotStopword(token); });
  }

  return tokens;
};
