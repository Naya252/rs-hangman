import { ALPHABET } from '../../shared/constants';
import { createElement, createLetter } from '../../shared/helpers';

function createKeyboard() {
  const keyboard = createElement('div', 'quiz__keyboard');
  createLetter(ALPHABET, keyboard, 'quiz__keyboard_key', 'button');
  return keyboard;
}

export function createQuizSection() {
  const section = createElement('section', 'quiz');
  const word = createElement('div', 'quiz__word');
  const hint = createElement('div', 'quiz__hint');
  const keyboard = createKeyboard();

  section.append(word);
  section.append(hint);
  section.append(keyboard);

  return section;
}

export function creteWord(word) {
  const parent = document.querySelector('.quiz__word');
  createLetter(word, parent, 'quiz__word_letter', 'div');
}

export function creteHintContent(text) {
  const parent = document.querySelector('.quiz__hint');
  const p = createElement('p', 'quiz__hint_text');
  p.innerText = text;
  const counter = createElement('p', 'quiz__hint_counter');
  counter.innerText = 'Incorrect gueses 0/6';
  parent.append(p);
  parent.append(counter);
}
