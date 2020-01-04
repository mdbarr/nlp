#!/usr/bin/env node
'use strict';

const fs = require('fs');
const { join } = require('path');
const metaphone = require('../metaphone');

const corpus = {
  words: new Map(),
  forms: new Map(),
  metaphones: new Map(),
  size: 0
};

const data = fs.readFileSync(join(__dirname, 'english.data'));
console.log('raw data loaded!');
for (let start = 0, i = 0; i < data.length; i++) {
  if (data[i] === 10) {
    const line = data.subarray(start, i).toString();

    if (line) {
      const [ word, root, pos ] = line.split(/[,:]/);

      if (word && root && pos) {
        const meta = metaphone(word);

        const model = {
          word,
          root,
          metaphone: meta,
          pos
        };

        const forms = corpus.forms.get(root) || [ ];
        if (!forms.includes(word)) {
          forms.push(word);
          forms.sort();
        }

        const metaphones = corpus.metaphones.get(meta) || [ ];
        if (!metaphones.includes(word)) {
          metaphones.push(word);
          metaphones.sort();
        }

        corpus.words.set(word, model);
        corpus.forms.set(root, forms);
        corpus.metaphones.set(meta, metaphones);

        corpus.size++;
      }
    }
    start = i + 1;
  }
}
console.log('corpus built', corpus.size);
