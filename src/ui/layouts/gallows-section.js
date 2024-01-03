import { BASE_URL } from '../../shared/constants';
import { createElement } from '../../shared/helpers';

const imgContainerClass = 'gallows__image-container';
const parts = ['gallows', 'head', 'body', 'hand-one', 'hand-two', 'leg-one', 'leg-two'];

function createFigurePart(el) {
  const part = createElement('img', el.class);
  part.src = el.src;
  part.alt = el.name;

  return part;
}

function createFigure() {
  const figure = parts.map((el, i) => ({
    id: i + 1,
    name: el,
    class: `${imgContainerClass}_${el}`,
    src: `${BASE_URL}src/img/${el}.svg`,
  }));

  const imgContainer = createElement('div', imgContainerClass);

  figure.forEach((el) => {
    const part = createFigurePart(el);
    imgContainer.append(part);
  });

  return imgContainer;
}

export default function createGallowsSection() {
  const section = createElement('section', 'gallows');

  const imgContainer = createFigure();
  section.append(imgContainer);
  return section;
}
