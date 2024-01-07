/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-syntax */
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
  KEY_INDEXES,
  TEXT,
} from '../../shared/constants';
import { createElement, createLetter, removeAllChildren } from '../../shared/helpers';
import { quiz } from '../../services/quiz-service';

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
  infoCounter.innerText = TEXT[0].counterText[quiz.lang];
  const counter = createElement('b', QUIZ_HINT_COUNTER_CLASS);
  infoCounter.append(counter);
  parent.append(p);
  parent.append(infoCounter);
}

/**
 * Create keys of keyboard
 *
 */
export function changeKeysLang() {
  const lines = document.querySelectorAll('.line');
  let i = 0;
  while (i < lines.length) {
    removeAllChildren(`.quiz__keyboard-line${i + 1}`);

    createLetter(
      ALPHABET.slice(KEY_INDEXES[i].first, KEY_INDEXES[i].last),
      lines[i],
      `${QUIZ_KEYBOARD_KEY_CLASS} btn`,
      'button',
    );
    i += 1;
  }
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
  const line4 = createElement('div', `${QUIZ_KEYBOARD_CLASS}-line4 line`);

  const overlay = createElement('div', QUIZ_KEYBOARD_OVERLAY_CLASS);

  keyboard.append(line1);
  keyboard.append(line2);
  keyboard.append(line3);
  keyboard.append(line4);
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
