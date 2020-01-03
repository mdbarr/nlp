'use strict';

const { configuration } = require('./configuration');
const {
  isNotPunctuation, isNotStopword
} = require('./utilities');

//////////

const tokenize = function (string, {
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

//////////

const contractions = [
  /\b(can)(not)\b/i,
  /\b(d)('ye)\b/i,
  /\b(gim)(me)\b/i,
  /\b(gon)(na)\b/i,
  /\b(got)(ta)\b/i,
  /\b(lem)(me)\b/i,
  /\b(more)('n)\b/i,
  /\b(wan)(na) /i,
  /\s('t)(is)\b/i,
  /\s('t)(was)\b/i
];

const treebank = function (value) {
  value = value.
    replace(/^"/, '``').
    replace(/([ (\[{<])"/g, '$1 `` '). // eslint-disable-line no-useless-escape
    replace(/\.\.\./g, ' ... ').
    replace(/[;@#$%&]/g, ' $& ').
    replace(/([^.])(\.)([\]\)}>"']*)\s*$/g, '$1 $2$3 '). // eslint-disable-line no-useless-escape
    replace(/[?!]/g, ' $& ').
    replace(/[\]\[()\{\}<>]/g, ' $& '). // eslint-disable-line no-useless-escape
    replace(/--/g, ' -- ');

  value = ` ${ value } ` .
    replace(/"/g, ' \'\' ').
    replace(/([^'])' /g, '$1 \' ').
    replace(/'([sSmMdD]) /g, ' \'$1 ').
    replace(/('ll|'LL|'re|'RE|'ve|'VE|n't|N'T) /g, ' $1 ');

  for (const contraction of contractions) {
    value = value.replace(contraction, ' $1 $2 ');
  }

  value = value.
    replace(/\s\s+/g, ' ').
    replace(/^\s|\s$/g, '');

  return value.split(' ');
};

tokenize.treebank = treebank;

//////////

module.exports = tokenize;
