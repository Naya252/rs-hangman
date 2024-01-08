/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-syntax */
import { QUIZ_SECTON, TITLE, ALPHABET, TEXT } from '../../shared/constants';
import { createElement, createLetter, removeChildren } from '../../shared/helpers';
import { quiz } from '../../services/quiz-service';

/**
 * Create quiz word
 *
 * @param {Array} word letters of the quiz word
 *
 */
export function createWord(word) {
  removeChildren(QUIZ_SECTON.word.el.childNodes);
  createLetter(word, QUIZ_SECTON.word.el, QUIZ_SECTON.letter.class, QUIZ_SECTON.letter.tag);
}

/**
 * Create hint
 *
 * @param {String} text quiz hint
 *
 */
export function creteHintContent(text) {
  removeChildren(QUIZ_SECTON.hint.el.childNodes);

  const p = createElement(QUIZ_SECTON.text.tag, QUIZ_SECTON.text.class, QUIZ_SECTON.hint.el);
  p.innerText = text;
  QUIZ_SECTON.text.el = p;

  const infoCounter = createElement(QUIZ_SECTON.counter.tag, QUIZ_SECTON.counter.class, QUIZ_SECTON.hint.el);
  infoCounter.innerText = TEXT[0].counterText[quiz.lang];
  QUIZ_SECTON.counter.el = infoCounter;

  const counter = createElement(QUIZ_SECTON.counterValue.tag, QUIZ_SECTON.counterValue.class, QUIZ_SECTON.counter.el);
  QUIZ_SECTON.counterValue.el = counter;
}

/**
 * Create keys of keyboard
 *
 */
export function changeKeysLang() {
  const lines = QUIZ_SECTON.keyboard.el.childNodes;
  let i = 0;
  while (i < lines.length - 1) {
    removeChildren(lines[i].childNodes);
    createLetter(
      ALPHABET.slice(QUIZ_SECTON.lines[i].index.first, QUIZ_SECTON.lines[i].index.last),
      lines[i],
      QUIZ_SECTON.key.class,
      QUIZ_SECTON.key.tag,
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
function createKeyboardContent() {
  QUIZ_SECTON.lines.forEach((el) => {
    createElement(el.tag, el.class, QUIZ_SECTON.keyboard.el);
  });

  const overlay = createElement(QUIZ_SECTON.overlay.tag, QUIZ_SECTON.overlay.class, QUIZ_SECTON.keyboard.el);
  QUIZ_SECTON.overlay.el = overlay;
}

/**
 * Remove disabled from keys of the keyboad
 *
 */
export function cleanKeyboard() {
  const lines = QUIZ_SECTON.keyboard.el.childNodes;
  for (const line of lines) {
    const keys = line.childNodes;
    for (const key of keys) {
      key.removeAttribute('disabled');
    }
  }
}

/**
 * Toggle overlay of the keyboard
 *
 */
export function toggleKeyboardOverly() {
  QUIZ_SECTON.overlay.el.classList.toggle('show');
}

/**
 * Create section
 *
 * @return {Element} qiuz section
 *
 */
export function createQuizSection() {
  const section = createElement(QUIZ_SECTON.section.tag, QUIZ_SECTON.section.class);
  QUIZ_SECTON.section.el = section;

  const title = createElement(QUIZ_SECTON.title.tag, QUIZ_SECTON.title.class);
  title.innerText = TITLE;
  QUIZ_SECTON.title.el = title;

  const word = createElement(QUIZ_SECTON.word.tag, QUIZ_SECTON.word.class, section);
  QUIZ_SECTON.word.el = word;
  const hint = createElement(QUIZ_SECTON.hint.tag, QUIZ_SECTON.hint.class, section);
  QUIZ_SECTON.hint.el = hint;
  const keyboard = createElement(QUIZ_SECTON.keyboard.tag, QUIZ_SECTON.keyboard.class, section);
  QUIZ_SECTON.keyboard.el = keyboard;
  createKeyboardContent();

  return QUIZ_SECTON.section.el;
}
