'use strict';

function dipthongH (character) {
  character = toCharacter(character);

  return character === 'C' ||
    character === 'G' ||
    character === 'P' ||
    character === 'S' ||
    character === 'T';
}

function isAlpha (character) {
  const code = toCharacterCode(character);
  return code >= 65 && code <= 90;
}

function isSoft (character) {
  character = toCharacter(character);
  return character === 'E' || character === 'I' || character === 'Y';
}

function isVowel (character) {
  character = toCharacter(character);

  return character === 'A' ||
        character === 'E' ||
        character === 'I' ||
        character === 'O' ||
        character === 'U';
}

function noGhToF (character) {
  character = toCharacter(character);

  return character === 'B' || character === 'D' || character === 'H';
}

function toCharacter (character) {
  return String(character).
    charAt(0).
    toUpperCase();
}

function toCharacterCode (character) {
  return toCharacter(character).charCodeAt(0);
}

module.exports = function (value) {
  value = String(value || '');

  if (!value) {
    return '';
  }

  //////////

  const sh = 'X';
  const th = '0';

  //////////

  let phonized = '';
  let index = 0;
  let skip;

  const context = {
    phonize: (characters) => {
      phonized += characters;
    },
    at: (offset) => {
      return value.charAt(index + offset).toUpperCase();
    },
    prev: () => {
      return value.charAt(index - 1).toUpperCase();
    },
    current: () => {
      return value.charAt(index).toUpperCase();
    },
    next: () => {
      return value.charAt(index + 1).toUpperCase();
    }
  };

  while (!isAlpha(context.current())) {
    if (!context.current()) {
      return '';
    }

    index++;
  }

  switch (context.current()) {
    case 'A':
      if (context.next() === 'E') {
        context.phonize('E');
        index += 2;
      } else {
        context.phonize('A');
        index++;
      }
      break;
    case 'G':
    case 'K':
    case 'P':
      if (context.next() === 'N') {
        context.phonize('N');
        index += 2;
      }
      break;
    case 'W':
      if (context.next() === 'R') {
        context.phonize(context.next());
        index += 2;
      } else if (context.next() === 'H') {
        context.phonize(context.current());
        index += 2;
      } else if (isVowel(context.next())) {
        context.phonize('W');
        index += 2;
      }
      break;
    case 'X':
      context.phonize('S');
      index++;
      break;
    case 'E':
    case 'I':
    case 'O':
    case 'U':
      context.phonize(context.current());
      index++;
      break;
    default:
      break;
  }

  while (context.current()) {
    skip = 1;

    if (!isAlpha(context.current()) || context.current() === context.prev() && context.current() !== 'C') {
      index += skip;
      continue;
    }

    switch (context.current()) {
      case 'B':
        if (context.prev() !== 'M') {
          context.phonize('B');
        }
        break;
      case 'C':
        if (isSoft(context.next())) {
          if (context.next() === 'I' && context.at(2) === 'A') {
            context.phonize(sh);
          } else if (context.prev() !== 'S') {
            context.phonize('S');
          }
        } else if (context.next() === 'H') {
          context.phonize(sh);
          skip++;
        } else {
          context.phonize('K');
        }
        break;
      case 'D':
        if (context.next() === 'G' && isSoft(context.at(2))) {
          context.phonize('J');
          skip++;
        } else {
          context.phonize('T');
        }
        break;
      case 'G':
        if (context.next() === 'H') {
          if (!(noGhToF(context.at(-3)) || context.at(-4) === 'H')) {
            context.phonize('F');
            skip++;
          }
        } else if (context.next() === 'N') {
          if (!(!isAlpha(context.at(2)) || context.at(2) === 'E' && context.at(3) === 'D')) {
            context.phonize('K');
          }
        } else if (isSoft(context.next()) && context.prev() !== 'G') {
          context.phonize('J');
        } else {
          context.phonize('K');
        }
        break;
      case 'H':
        if (isVowel(context.next()) && !dipthongH(context.prev())) {
          context.phonize('H');
        }
        break;
      case 'K':
        if (context.prev() !== 'C') {
          context.phonize('K');
        }
        break;
      case 'P':
        if (context.next() === 'H') {
          context.phonize('F');
        } else {
          context.phonize('P');
        }
        break;
      case 'Q':
        context.phonize('K');
        break;
      case 'S':
        if (context.next() === 'I' && (context.at(2) === 'O' || context.at(2) === 'A')) {
          context.phonize(sh);
        } else if (context.next() === 'H') {
          context.phonize(sh);
          skip++;
        } else {
          context.phonize('S');
        }
        break;
      case 'T':
        if (context.next() === 'I' && (context.at(2) === 'O' || context.at(2) === 'A')) {
          context.phonize(sh);
        } else if (context.next() === 'H') {
          context.phonize(th);
          skip++;
        } else if (!(context.next() === 'C' && context.at(2) === 'H')) {
          context.phonize('T');
        }
        break;
      case 'V':
        context.phonize('F');
        break;
      case 'W':
        if (isVowel(context.next())) {
          context.phonize('W');
        }
        break;
      case 'X':
        context.phonize('KS');
        break;
      case 'Y':
        if (isVowel(context.next())) {
          context.phonize('Y');
        }
        break;
      case 'Z':
        context.phonize('S');
        break;
      case 'F':
      case 'J':
      case 'L':
      case 'M':
      case 'N':
      case 'R':
        context.phonize(context.current());
        break;
      default:
        break;
    }

    index += skip;
  }

  return phonized;
};
