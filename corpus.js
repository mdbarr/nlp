'use strict';

const { configuration } = require('./configuration');
const metaphone = require('./metaphone');

const describe = (word) => {
  const corpus = configuration.language.corpus();
  const model = corpus.words.get(word) || corpus.words.get(word.toLowerCase());
  return model ? model : null;
};

const equivalence = (word) => {
  const corpus = configuration.language.corpus();
  const model = corpus.words.get(word) || corpus.words.get(word.toLowerCase());
  if (model) {
    const roots = model.roots;
    const equivs = new Set();
    for (const root of roots) {
      const morphs = corpus.morphology.get(root);
      if (morphs) {
        morphs.forEach(item => { return equivs.add(item); });
      }
    }
    return Array.from(equivs).sort();
  }
  return null;
};

const load = () => {
  return configuration.language.corpus();
};

const partsOfSpeech = (word) => {
  const corpus = configuration.language.corpus();
  const model = corpus.words.get(word) || corpus.words.get(word.toLowerCase());
  return model ? model.pos : null;
};

const roots = (word) => {
  const corpus = configuration.language.corpus();
  const model = corpus.words.get(word) || corpus.words.get(word.toLowerCase());
  return model ? model.roots : null;
};

const suggestions = (word) => {
  const corpus = configuration.language.corpus();
  const meta = metaphone(word);
  const metaphones = corpus.metaphones.get(meta);
  return metaphones ? metaphones : null;
};

module.exports = {
  describe,
  equivalence,
  load,
  partsOfSpeech,
  pos: partsOfSpeech,
  roots,
  stems: roots,
  suggest: suggestions,
  suggestions
};
