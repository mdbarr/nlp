'use strict';

const { configuration } = require('./configuration');
const { isNotPunctuation, isNotStopword } = require('./utilities');

//////////

const tokenize = function (string, {
  tokenizer = configuration.language.tokenizerRegExp,
  stripPunctuation = configuration.stripPunctuation,
  stripStopwords = configuration.stripStopwords,
} = {}) {
  let tokens = string.toString().
    match(tokenizer) || [];

  if (stripPunctuation) {
    tokens = tokens.filter(token => isNotPunctuation(token));
  }

  if (stripStopwords) {
    tokens = tokens.filter(token => isNotStopword(token));
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
  /\s('t)(was)\b/i,
];

const treebank = function (string, { stripPunctuation = configuration.stripPunctuation,
  stripStopwords = configuration.stripStopwords } = {}) {
  string = string.
    replace(/^"/, '``').
    replace(/([ (\[{<])"/g, '$1 `` '). // eslint-disable-line no-useless-escape
    replace(/\.\.\./g, ' ... ').
    replace(/[;@#$%&]/g, ' $& ').
    replace(/([^.])(\.)([\]\)}>"']*)\s*$/g, '$1 $2$3 '). // eslint-disable-line no-useless-escape
    replace(/[?!]/g, ' $& ').
    replace(/[\]\[()\{\}<>]/g, ' $& '). // eslint-disable-line no-useless-escape
    replace(/--/g, ' -- ');

  string = ` ${ string } ` .
    replace(/"/g, ' \'\' ').
    replace(/([^'])' /g, '$1 \' ').
    replace(/'([sSmMdD]) /g, ' \'$1 ').
    replace(/('ll|'LL|'re|'RE|'ve|'VE|n't|N'T) /g, ' $1 ');

  for (const contraction of contractions) {
    string = string.replace(contraction, ' $1 $2 ');
  }

  string = string.
    replace(/\s\s+/g, ' ').
    trim();

  let tokens = string.split(/\s+/) || [];

  if (stripPunctuation) {
    tokens = tokens.filter(token => isNotPunctuation(token));
  }

  if (stripStopwords) {
    tokens = tokens.filter(token => isNotStopword(token));
  }

  return tokens;
};

tokenize.treebank = treebank;

//////////

function sentences (value) {
  value = value.replace(/\n+/, ' ').
    replace(/(\.+|:|!|\?)("*|'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, '$1$2\n').
    split(/\n+/);

  return value;
}
tokenize.sentences = sentences;

module.exports = tokenize;
