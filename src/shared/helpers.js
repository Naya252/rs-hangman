/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-cycle */
import { GALLOWS_SECTON, QUIZ_SECTON, QUIZ_KEYBOARD_KEY_CLASS } from './constants';
import { quiz } from '../services/quiz-service';

/**
 * Create element for DOM
 *
 * @param {String} selector html tag
 * @param {String} className class/es for new element
 * @param {Element} parent parent of the new element
 * @return {Element} created element
 *
 */
export function createElement(selector, className, parent) {
  const element = document.createElement(selector);
  element.className = className;
  if (parent) {
    parent.append(element);
  }
  return element;
}

/**
 * Create letters of the keyboard/qiuz word
 *
 * @param {Array} arr alphabet/quiz word
 * @param {Element} parent DOM element - parent of the letter
 * @param {String} className class name of the letter
 * @param {String} selector html tag of the letter
 *
 */
export function createLetter(arr, parent, className, selector) {
  arr.forEach((el) => {
    let letter;
    if (!className.includes(QUIZ_KEYBOARD_KEY_CLASS)) {
      letter = createElement(selector, className);
    }
    if (className.includes(QUIZ_KEYBOARD_KEY_CLASS) && el[quiz.lang]) {
      letter = createElement(selector, className);
      letter.type = 'button';
      if (letter.hasAttribute('type')) {
        letter.innerText = el[quiz.lang];
        letter.value = el[quiz.lang];
        letter.name = el.code;
      }
    }
    if (letter) {
      parent.append(letter);
    }
  });
}

/**
 * Remove h1
 *
 */
function removeTitle(className) {
  const title = document.querySelector('h1');
  let value = false;
  if (!title || (title && title.classList.contains(className))) {
    if (title) {
      title.remove();
    }
    value = true;
  }
  return value;
}

/**
 * Toggle h1
 *
 * @param {Number} curSize current size of the page
 * @param {Number} lastSize page saze before resize
 *
 */
export function changeTitle(curSize, lastSize) {
  if ((curSize >= 781 && !lastSize) || (curSize >= 781 && lastSize <= 780)) {
    const notTitle = removeTitle(QUIZ_SECTON.title.class);
    if (notTitle) {
      QUIZ_SECTON.section.el.prepend(QUIZ_SECTON.title.el);
    }
  }
  if ((curSize < 781 && !lastSize) || (curSize < 781 && lastSize >= 781)) {
    const notTitle = removeTitle(GALLOWS_SECTON.title.class);
    if (notTitle) {
      GALLOWS_SECTON.section.el.prepend(GALLOWS_SECTON.title.el);
    }
  }
}

/**
 * Remove all children of the DOM element
 *
 */
export function removeChildren(elements) {
  let i = elements.length;
  while (i > 0) {
    i -= 1;
    elements[i].remove();
  }
}
