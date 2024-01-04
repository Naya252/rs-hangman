import {
  ALPHABET,
  QUIZ_SECTION_CLASS,
  QUIZ_WORD_CLASS,
  QUIZ_LETTER_CLASS,
  QUIZ_HINT_CLASS,
  QUIZ_HINT_TEXT_CLASS,
  QUIZ_HINT_INFO_CLASS,
  QUIZ_HINT_COUNTER_CLASS,
  QUIZ_KEYBOARD_CLASS,
  QUIZ_KEYBOARD_KEY_CLASS,
  QUIZ_KEYBOARD_OVERLAY_CLASS,
} from '../../shared/constants';
import { createElement, createLetter, removeAllChildren } from '../../shared/helpers';

function createKeyboard() {
  const keyboard = createElement('div', QUIZ_KEYBOARD_CLASS);
  createLetter(ALPHABET, keyboard, QUIZ_KEYBOARD_KEY_CLASS, 'button');
  const overlay = createElement('div', QUIZ_KEYBOARD_OVERLAY_CLASS);
  keyboard.append(overlay);
  return keyboard;
}

export function createQuizSection() {
  const section = createElement('section', QUIZ_SECTION_CLASS);
  const word = createElement('div', QUIZ_WORD_CLASS);
  const hint = createElement('div', QUIZ_HINT_CLASS);
  const keyboard = createKeyboard();

  section.append(word);
  section.append(hint);
  section.append(keyboard);

  return section;
}

export function createWord(word) {
  const parent = removeAllChildren(`.${QUIZ_WORD_CLASS}`);
  createLetter(word, parent, QUIZ_LETTER_CLASS, 'div');
}

export function creteHintContent(text) {
  const parent = removeAllChildren(`.${QUIZ_HINT_CLASS}`);
  const p = createElement('p', QUIZ_HINT_TEXT_CLASS);
  p.innerText = text;
  const infoCounter = createElement('p', QUIZ_HINT_INFO_CLASS);
  infoCounter.innerText = 'Incorrect gueses ';
  const counter = createElement('b', QUIZ_HINT_COUNTER_CLASS);
  infoCounter.append(counter);
  parent.append(p);
  parent.append(infoCounter);
}

export function cleanKeyboard() {
  const keyboard = document.querySelector(`.${QUIZ_KEYBOARD_CLASS}`);
  let count = keyboard.childNodes.length;
  while (count > 0) {
    count -= 1;
    keyboard.childNodes[count].removeAttribute('disabled');
  }
}

export function toggleKeyboardOverly() {
  const overlay = document.querySelector(`.${QUIZ_KEYBOARD_OVERLAY_CLASS}`);
  overlay.classList.toggle('show');
}
