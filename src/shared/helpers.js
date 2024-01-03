import { TITLE } from './constants';

export function createElement(el, className) {
  const element = document.createElement(el);
  element.className = className;
  return element;
}

export function createLetter(arr, parent, className, selector) {
  arr.forEach((el) => {
    const letter = createElement(selector, className);
    if (className !== 'quiz__word_letter') {
      letter.innerText = el;
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
  if ((curSize >= 780 && !lastSize) || (curSize >= 780 && lastSize < 780)) {
    const title = createTitle('quiz__title');
    document.querySelector('.quiz').prepend(title);
  }
  if ((curSize < 780 && !lastSize) || (curSize < 780 && lastSize >= 780)) {
    const title = createTitle('gallows__title');
    document.querySelector('.gallows').append(title);
  }
}
