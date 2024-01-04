import { ALPHABET } from '../../shared/constants';
import { createElement, createLetter, removeAllChildren } from '../../shared/helpers';

function createKeyboard() {
  const keyboard = createElement('div', 'quiz__keyboard');
  createLetter(ALPHABET, keyboard, 'quiz__keyboard_key', 'button');
  const overlay = createElement('div', 'quiz__keyboard_overlay');
  keyboard.append(overlay);
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

export function createWord(word) {
  const parent = removeAllChildren('.quiz__word');
  createLetter(word, parent, 'quiz__word_letter', 'div');
}

export function creteHintContent(text) {
  const parent = removeAllChildren('.quiz__hint');
  const p = createElement('p', 'quiz__hint_text');
  p.innerText = text;
  const infoCounter = createElement('p', 'quiz__hint_counter');
  infoCounter.innerText = 'Incorrect gueses ';
  const counter = createElement('b', 'quiz__hint_counter-value');
  infoCounter.append(counter);
  parent.append(p);
  parent.append(infoCounter);
}

export function cleanKeyboard() {
  const keyboard = document.querySelector('.quiz__keyboard');
  let count = keyboard.childNodes.length;
  while (count > 0) {
    count -= 1;
    keyboard.childNodes[count].removeAttribute('disabled');
  }
}

export function toggleKeyboardOverly() {
  const overlay = document.querySelector('.quiz__keyboard_overlay');
  overlay.classList.toggle('show');
}
