import { IMAGES_FIGURE_PARTS, GALLOWS_SECTION_CLASS, IMAGE_CONTAINER_CLASS } from '../../shared/constants';
import { createElement, removeAllChildren } from '../../shared/helpers';

export function createFigurePart(index, parent) {
  const el = IMAGES_FIGURE_PARTS[index];
  const part = createElement('img', el.class);
  part.src = el.src;
  part.alt = el.name;

  parent.append(part);
}

export function cleanGallows() {
  const parent = removeAllChildren(`.${IMAGE_CONTAINER_CLASS}`);
  createFigurePart(0, parent);
}

function createFigure() {
  const imgContainer = createElement('div', IMAGE_CONTAINER_CLASS);
  createFigurePart(0, imgContainer);

  return imgContainer;
}

export function createGallowsSection() {
  const section = createElement('section', GALLOWS_SECTION_CLASS);

  const imgContainer = createFigure();
  section.append(imgContainer);
  return section;
}
