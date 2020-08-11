#!/usr/bin/env node
'use strict';

const fs = require('fs');
const { join } = require('path');
const metaphone = require('../metaphone');

const corpus = {
  words: new Map(),
  morphology: new Map(),
  metaphones: new Map(),
  size: 0,
};

let loaded = false;

module.exports = () => {
  if (loaded) {
    return corpus;
  }

  const data = fs.readFileSync(join(__dirname, 'english.data'));

  for (let start = 0, i = 0; i < data.length; i++) {
    if (data[i] === 10) {
      const line = data.subarray(start, i).toString();

      if (line) {
        const [ word, root, pos ] = line.split(/[,:]/);

        if (word && root && pos) {
          const model = corpus.words.get(word) || {
            word,
            roots: [ ],
            metaphone: metaphone(word),
            pos: [ ],
          };

          if (!model.roots.includes(root)) {
            model.roots.push(root);
            model.roots.sort();
          }

          if (!model.pos.includes(pos)) {
            model.pos.push(pos);
            model.pos.sort();
          }
          corpus.words.set(word, model);

          const morphology = corpus.morphology.get(root) || [ ];
          if (!morphology.includes(word)) {
            morphology.push(word);
            morphology.sort();
          }
          corpus.morphology.set(root, morphology);

          const metaphones = corpus.metaphones.get(model.metaphone) || [ ];
          if (!metaphones.includes(word)) {
            metaphones.push(word);
            metaphones.sort();
          }
          corpus.metaphones.set(model.metaphone, metaphones);
        }
      }
      start = i + 1;
    }
  }

  corpus.size = corpus.words.size;

  loaded = true;

  return corpus;
};
