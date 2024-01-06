/* eslint-disable no-restricted-syntax */
import {
  ALPHABET_EN,
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

/**
 * Create quiz word
 *
 * @param {Array} word letters of the quiz word
 *
 */
export function createWord(word) {
  const parent = removeAllChildren(`.${QUIZ_WORD_CLASS}`);
  createLetter(word, parent, QUIZ_LETTER_CLASS, 'div');
}

/**
 * Create hint
 *
 * @param {String} text quiz hint
 *
 */
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

/**
 * Create keyboard
 *
 * @return {Element} keyboard
 *
 */
function createKeyboard() {
  const keyboard = createElement('div', QUIZ_KEYBOARD_CLASS);
  const line1 = createElement('div', `${QUIZ_KEYBOARD_CLASS}-line1 line`);
  const line2 = createElement('div', `${QUIZ_KEYBOARD_CLASS}-line2 line`);
  const line3 = createElement('div', `${QUIZ_KEYBOARD_CLASS}-line3 line`);

  createLetter(ALPHABET_EN.slice(0, 10), line1, `${QUIZ_KEYBOARD_KEY_CLASS} btn`, 'button');
  createLetter(ALPHABET_EN.slice(10, 19), line2, `${QUIZ_KEYBOARD_KEY_CLASS} btn`, 'button');
  createLetter(ALPHABET_EN.slice(19), line3, `${QUIZ_KEYBOARD_KEY_CLASS} btn`, 'button');

  const overlay = createElement('div', QUIZ_KEYBOARD_OVERLAY_CLASS);

  keyboard.append(line1);
  keyboard.append(line2);
  keyboard.append(line3);
  keyboard.append(overlay);
  return keyboard;
}

/**
 * Remove disabled from keys of the keyboad
 *
 */
export function cleanKeyboard() {
  const keys = document.querySelectorAll(`.${QUIZ_KEYBOARD_KEY_CLASS}[disabled]`);
  for (const key of keys) {
    key.removeAttribute('disabled');
  }
}

/**
 * Toggle overlay of the keyboard
 *
 */
export function toggleKeyboardOverly() {
  const overlay = document.querySelector(`.${QUIZ_KEYBOARD_OVERLAY_CLASS}`);
  overlay.classList.toggle('show');
}

/**
 * Create section
 *
 * @return {Element} qiuz section
 *
 */
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
