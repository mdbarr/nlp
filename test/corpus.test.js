'use strict';

const nlp = require('../index');

describe('Natural Lanuage Processing - Corpus Test', () => {
  it('should get the description of a word', () => {
    const description = nlp.corpus.describe('left');
    expect(description).toStrictEqual({ word: 'left', root: 'left', metaphone: 'LFT', pos: 'N' });
  });

  it('should get the morphological equivalents of a word', () => {
    const equivalents =  nlp.corpus.equivalence('testing');
    expect(equivalents).toStrictEqual([ 'test', 'tested', 'testing', 'tests' ]);
  });

  it('should get the part of speech of a word', () => {
    const pos = nlp.corpus.pos('thoroughly');
    expect(pos).toBe('Adv');
  });

  it('should get the root form of a word', () => {
    const root = nlp.corpus.root('flew');
    expect(root).toBe('fly');
  });

  it('should get the spelling suggestions for a word', () => {
    const suggestions = nlp.corpus.suggestions('discribe');
    expect(suggestions).toStrictEqual([ 'describe' ]);
  });
});
