'use strict';

const nlp = require('../index');

describe('Natural Lanuage Processing - Corpus Test', () => {
  it('should get the description of a word', () => {
    const description = nlp.corpus.describe('left');
    expect(description).toStrictEqual({
        word: 'left',
        roots: [ 'leave', 'left' ],
        metaphone: 'LFT',
        pos: [ 'A', 'Adv', 'N', 'Vpp', 'Vpt' ]
    });
  });

  it('should get the morphological equivalents of a word', () => {
    const equivalents = nlp.corpus.equivalence('testing');
    expect(equivalents).toStrictEqual([ 'test', 'tested', 'testing', 'tests' ]);
  });

  it('should get the parts of speech of a word', () => {
    const pos = nlp.corpus.pos('thoroughly');
    expect(pos).toStrictEqual([ 'Adv' ]);
  });

  it('should get the root forms of a word', () => {
    const root = nlp.corpus.roots('flew');
    expect(root).toStrictEqual([ 'fly' ]);
  });

  it('should get the spelling suggestions for a word', () => {
    const suggestions = nlp.corpus.suggestions('discribe');
    expect(suggestions).toStrictEqual([ 'describe' ]);
  });
});
