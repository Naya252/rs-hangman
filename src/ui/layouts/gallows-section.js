import { BASE_URL } from '../../shared/constants';
import { createElement } from '../../shared/helpers';

const imgContainerClass = 'gallows__image-container';
const parts = ['gallows', 'head', 'body', 'hand-one', 'hand-two', 'leg-one', 'leg-two'];
const figure = parts.map((el, i) => ({
  id: i + 1,
  name: el,
  class: `${imgContainerClass}_${el}`,
  src: `${BASE_URL}src/img/${el}.svg`,
}));

export function createFigurePart(index, parent) {
  const el = figure[index];
  const part = createElement('img', el.class);
  part.src = el.src;
  part.alt = el.name;

  parent.append(part);
}

export function cleanGallows() {
  const parent = document.querySelector('.gallows__image-container');
  parent.innerHTML = '';
  createFigurePart(0, parent);
}

function createFigure() {
  const imgContainer = createElement('div', imgContainerClass);
  createFigurePart(0, imgContainer);

  return imgContainer;
}

export function createGallowsSection() {
  const section = createElement('section', 'gallows');

  const imgContainer = createFigure();
  section.append(imgContainer);
  return section;
}
