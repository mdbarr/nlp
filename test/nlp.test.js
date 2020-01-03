'use strict';

const nlp = require('../index');

describe('Natural Lanuage Processing Tools Test', () => {
  it('should test string to metaphone transformations', () => {
    expect(nlp.metaphone('Filipowitz')).toBe('FLPWTS');
    expect(nlp.metaphone('Xavier')).toBe('SFR');
    expect(nlp.metaphone('acceptingness')).toBe('AKSPTNKNS');
    expect(nlp.metaphone('allegrettos')).toBe('ALKRTS');
    expect(nlp.metaphone('considerations')).toBe('KNSTRXNS');
    expect(nlp.metaphone('crevalle')).toBe('KRFL');
    expect(nlp.metaphone('delicious')).toBe('TLSS');
    expect(nlp.metaphone('detestable')).toBe('TTSTBL');
    expect(nlp.metaphone('michael')).toBe('MXL');
  });

  it('should test string edit distance', () => {
    expect(nlp.editDistance('foo', 'bar')).toBe(3);
  });

  it('should test simple tokenization', () => {
    const tokens = nlp.tokenize('This is a test.');
    expect(tokens).toStrictEqual([ 'This', 'is', 'a', 'test', '.' ]);
  });

  it('should test simple tokenization with stopword removal', () => {
    const tokens = nlp.tokenize('This is a test.', {
      stripPunctuation: true,
      stripStopwords: true
    });
    expect(tokens).toStrictEqual([ 'test' ]);
  });

  it('should test complicated tokenization', () => {
    const tokens = nlp.tokenize(
      'Hello Mr. Barr, how are you doing today? The weather is great at 71.5 degrees, and ' +
        'JavaScript is awesome. The sky is pinkish-blue. You shouldn\'t eat cardboard.',
      { stripPunctuation: false });

    expect(tokens).toStrictEqual([ 'Hello', 'Mr.', 'Barr', ',', 'how', 'are', 'you', 'doing',
      'today', '?', 'The', 'weather', 'is', 'great', 'at', '71.5', 'degrees', ',', 'and',
      'JavaScript', 'is', 'awesome', '.', 'The', 'sky', 'is', 'pinkish-blue', '.',
      'You', "shouldn't", 'eat', 'cardboard', '.' ]);
  });

  it('should test camel casing', () => {
    expect(nlp.utilities.toCamelCase('this is a test.')).toBe('thisIsATest.');
  });

  it('should test kebab casing', () => {
    expect(nlp.utilities.toKebabCase('this is a test.')).toBe('this-is-a-test');
  });

  it('should test pascal casing', () => {
    expect(nlp.utilities.toPascalCase('this is a test.')).toBe('This Is A Test.');
  });

  it('should test sentence casing', () => {
    expect(nlp.utilities.toSentenceCase('this is a test.')).toBe('This is a test.');
  });

  it('should test snake casing', () => {
    expect(nlp.utilities.toSnakeCase('this is a test.')).toBe('this_is_a_test');
  });
});
