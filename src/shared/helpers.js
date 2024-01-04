import {
  TITLE,
  GALLOWS_SECTION_CLASS,
  GALLOWS_TITLE_CLASS,
  QUIZ_SECTION_CLASS,
  QUIZ_TITLE_CLASS,
  QUIZ_KEYBOARD_KEY_CLASS,
} from './constants';

export function createElement(el, className) {
  const element = document.createElement(el);
  element.className = className;
  return element;
}

export function createLetter(arr, parent, className, selector) {
  arr.forEach((el) => {
    const letter = createElement(selector, className);
    if (className === QUIZ_KEYBOARD_KEY_CLASS) {
      letter.innerText = el;
      letter.value = el;
      letter.type = 'button';
    }
    parent.append(letter);
  });
}

function createTitle(className) {
  const element = document.querySelector('h1');
  if (element) {
    element.remove();
  }

  const title = createElement('h1', className);
  title.innerText = TITLE;
  return title;
}

export function changeTitle(curSize, lastSize) {
  if ((curSize >= 781 && !lastSize) || (curSize >= 781 && lastSize <= 780)) {
    const title = createTitle(QUIZ_TITLE_CLASS);
    document.querySelector(`.${QUIZ_SECTION_CLASS}`).prepend(title);
  }
  if ((curSize < 781 && !lastSize) || (curSize < 781 && lastSize >= 781)) {
    const title = createTitle(GALLOWS_TITLE_CLASS);
    document.querySelector(`.${GALLOWS_SECTION_CLASS}`).append(title);
  }
}

export function removeAllChildren(parentSelector) {
  const parent = document.querySelector(`${parentSelector}`);
  parent.innerHTML = '';
  return parent;
}
