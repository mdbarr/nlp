'use strict';

const languages = require('./languages');

const configuration = {
  language: languages.english,
  stripPunctuation: false,
  stripStopwords: false,
};

function configure ({
  language, stripPunctuation, stripStopwords,
} = {}) {
  if (language && languages[language]) {
    configuration.language = languages[language];
  }

  if (stripPunctuation !== undefined) {
    configuration.stripPunctuation = stripPunctuation;
  }

  if (stripStopwords !== undefined) {
    configuration.stripStopwords = stripStopwords;
  }

  return configuration;
}

module.exports = {
  configuration,
  configure,
};
