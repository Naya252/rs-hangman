import {
  TITLE,
  GALLOWS_SECTION_CLASS,
  GALLOWS_TITLE_CLASS,
  QUIZ_SECTION_CLASS,
  QUIZ_TITLE_CLASS,
  QUIZ_KEYBOARD_KEY_CLASS,
} from './constants';

/**
 * Create element for DOM
 *
 * @param {String} selector html tag
 * @param {String} className class/es for new element
 * @return {Element} created element
 *
 */
export function createElement(selector, className) {
  const element = document.createElement(selector);
  element.className = className;
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
    const letter = createElement(selector, className);
    if (className.includes(QUIZ_KEYBOARD_KEY_CLASS)) {
      letter.innerText = el;
      letter.value = el;
      letter.type = 'button';
    }
    parent.append(letter);
  });
}

/**
 * Create h1
 *
 * @param {String} className class of the h1
 * @return {Element} created h1
 *
 */
function createTitle(className) {
  const element = document.querySelector('h1');
  if (element) {
    element.remove();
  }

  const title = createElement('h1', className);
  title.innerText = TITLE;
  return title;
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
    const title = createTitle(QUIZ_TITLE_CLASS);
    document.querySelector(`.${QUIZ_SECTION_CLASS}`).prepend(title);
  }
  if ((curSize < 781 && !lastSize) || (curSize < 781 && lastSize >= 781)) {
    const title = createTitle(GALLOWS_TITLE_CLASS);
    document.querySelector(`.${GALLOWS_SECTION_CLASS}`).prepend(title);
  }
}

/**
 * Remove all children of the DOM element
 *
 * @param {String} parentSelector selector of the DOM element
 * @return {Element} DOM element without child
 *
 */
export function removeAllChildren(parentSelector) {
  const parent = document.querySelector(`${parentSelector}`);
  parent.innerHTML = '';
  return parent;
}
