'use strict';

const { configuration } = require('./configuration');
const metaphone = require('./metaphone');

const describe = (word) => {
  const corpus = configuration.language.corpus;
  const model = corpus.words.get(word) || corpus.words.get(word.toLowerCase());
  return model ? model : null;
};

const equivalence = (word) => {
  const corpus = configuration.language.corpus;
  const model = corpus.words.get(word) || corpus.words.get(word.toLowerCase());
  if (model) {
    const root = model.root;
    return corpus.morphology.get(root);
  }
  return null;
};

const partOfSpeech = (word) => {
  const corpus = configuration.language.corpus;
  const model = corpus.words.get(word) || corpus.words.get(word.toLowerCase());
  return model ? model.pos : null;
};

const root = (word) => {
  const corpus = configuration.language.corpus;
  const model = corpus.words.get(word) || corpus.words.get(word.toLowerCase());
  return model ? model.root : null;
};

const suggestions = (word) => {
  const corpus = configuration.language.corpus;
  const meta = metaphone(word);
  const metaphones = corpus.metaphones.get(meta);
  return metaphones ? metaphones : null;
};

module.exports = {
  describe,
  equivalence,
  partOfSpeech,
  pos: partOfSpeech,
  root,
  stem: root,
  suggest: suggestions,
  suggestions
};
