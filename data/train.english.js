#!/usr/bin/env node
'use strict';

const fs = require('fs');
const { join } = require('path');
const metaphone = require('../metaphone');

const writer = fs.createWriteStream(join(__dirname, '../dist/english.corpus.js'));
writer.write(`'use strict';

const wa = [`);

const corpus = {
  words: new Map(),
  forms: new Map(),
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

        if (corpus.words.size > 0) {
          writer.write(',\n');
        }

        corpus.words.set(word, model);
        corpus.forms.set(root, forms);
        corpus.metaphones.set(meta, metaphones);

        const entry = `["${ word }",{r:"${ root }",m:"${ meta }",p:"${ pos }"}]`;
        writer.write(entry);

        corpus.size++;
      }
    }
    start = i + 1;
  }
}
writer.write(']\;\nconst w = new Map(wa);\n');

writer.write('const fa = [');
let size = 0;
corpus.forms.forEach((value, key) => {
  const entry = `["${ key }",["${ value.join('","') }"]]`;
  writer.write(entry);
  size++;

  if (size < corpus.forms.size) {
    writer.write(',\n');
  }
});
writer.write(']\;\nconst f = new Map(fa);\n');

writer.write('const ma = [');
size = 0;
corpus.metaphones.forEach((value, key) => {
  const entry = `["${ key }",["${ value.join('","') }"]]`;
  writer.write(entry);
  size++;

  if (size < corpus.metaphones.size) {
    writer.write(',\n');
  }
});
writer.write(']\;\nconst m = new Map(ma);\n');

writer.write(`
module.exports = {
  words: w,
  forms: f,
  metaphones: m,
  size: w.size
};
`);

module.exports = corpus;
