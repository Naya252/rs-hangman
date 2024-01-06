import { IMAGES_FIGURE_PARTS, GALLOWS_SECTION_CLASS, IMAGE_CONTAINER_CLASS } from '../../shared/constants';
import { createElement, removeAllChildren } from '../../shared/helpers';

/**
 * Create image (a part of the image container)
 *
 * @param {Number} index index of the image
 * @param {Element} parent image container
 *
 */
export function createFigurePart(index, parent) {
  const el = IMAGES_FIGURE_PARTS[index];
  const part = createElement('img', el.class);
  part.src = el.src;
  part.alt = el.name;

  parent.append(part);
}

/**
 * Create default images
 *
 * @param {Element} parent image container
 *
 */
function createDefaultParts(parent) {
  createFigurePart(0, parent);
  createFigurePart(7, parent);
  createFigurePart(8, parent);
  createFigurePart(9, parent);
}

/**
 * Remove body parts of the figure
 *
 */
export function cleanGallows() {
  const parent = removeAllChildren(`.${IMAGE_CONTAINER_CLASS}`);
  createDefaultParts(parent);
}

/**
 * Create image container
 *
 * @return {Element} image container
 *
 */
function createFigure() {
  const imgContainer = createElement('div', IMAGE_CONTAINER_CLASS);
  createDefaultParts(imgContainer);

  return imgContainer;
}

/**
 * Create section
 *
 * @return {Element} gallows section
 *
 */
export function createGallowsSection() {
  const section = createElement('section', GALLOWS_SECTION_CLASS);

  const imgContainer = createFigure();
  section.append(imgContainer);
  return section;
}
