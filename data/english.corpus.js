#!/usr/bin/env node
'use strict';

const fs = require('fs');
const { join } = require('path');
const metaphone = require('../metaphone');

const corpus = {
  words: new Map(),
  morphology: new Map(),
  metaphones: new Map(),
  size: 0
};

const data = fs.readFileSync(join(__dirname, 'english.data'));

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

        const morphology = corpus.morphology.get(root) || [ ];
        if (!morphology.includes(word)) {
          morphology.push(word);
          morphology.sort();
        }

        const metaphones = corpus.metaphones.get(meta) || [ ];
        if (!metaphones.includes(word)) {
          metaphones.push(word);
          metaphones.sort();
        }

        corpus.words.set(word, model);
        corpus.morphology.set(root, morphology);
        corpus.metaphones.set(meta, metaphones);
      }
    }
    start = i + 1;
  }
}

corpus.size = corpus.words.size;

module.exports = corpus;
