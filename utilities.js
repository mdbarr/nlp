'use strict';

const { configuration } = require('./configuration');

function isNotPunctuation (string) {
  return configuration.language.punctuationRegExp.test(string) === false;
}

function isNotStopword (word) {
  return configuration.language.stopwordsRegExp.test(word) === false;
}

function isPunctuation (string) {
  return configuration.language.punctuationRegExp.test(string);
}

function isStopword (word) {
  return configuration.language.stopwordsRegExp.test(word);
}

function toCamelCase (string) {
  return string.toLowerCase().
    replace(/[^a-zA-Z0-9]+(.)/g, (match, character) => {
      return character.toUpperCase();
    });
}

function toKebabCase (string) {
  return string.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).
    map(word => { return word.toLowerCase(); }).
    join('-');
}

function toPascalCase (string) {
  return string.replace(/\w\S*/g, (word) => {
    return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
  });
}

function toSentenceCase (string) {
  return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
}

function toSnakeCase (string) {
  return string.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).
    map(word => { return word.toLowerCase(); }).
    join('_');
}

module.exports = {
  isNotPunctuation,
  isNotStopword,
  isPunctuation,
  isStopword,
  toCamelCase,
  toKebabCase,
  toPascalCase,
  toSentenceCase,
  toSnakeCase
};
