/* eslint-disable import/no-cycle */
import { GALLOWS_SECTON, TITLE } from '../../shared/constants';
import { createElement } from '../../shared/helpers';

/**
 * Create image (a part of the image container)
 *
 * @param {Object} item item of images
 * @param {Element} parent image container
 *
 */
export function createFigurePart(item, parent) {
  const img = createElement(item.tag, item.class);
  img.src = item.src;
  img.alt = item.alt;
  img.setAttribute('data-is-default', item.isDefault);

  parent.append(img);
}

/**
 * Create default images
 *
 */
function createDefaultParts() {
  GALLOWS_SECTON.images.forEach((el) => {
    if (el.isDefault) {
      createFigurePart(el, GALLOWS_SECTON.imgContainer.el);
    }
  });
}

/**
 * Remove body parts of the figure
 *
 */
export function cleanGallows() {
  const elements = GALLOWS_SECTON.imgContainer.el.childNodes;
  let i = elements.length;
  while (i > 0) {
    i -= 1;
    if (elements[i].getAttribute('data-is-default') !== 'true') {
      elements[i].remove();
    }
  }
}

/**
 * Create section
 *
 * @return {Element} gallows section
 *
 */
export function createGallowsSection() {
  const section = createElement(GALLOWS_SECTON.section.tag, GALLOWS_SECTON.section.class);
  GALLOWS_SECTON.section.el = section;

  const title = createElement(GALLOWS_SECTON.title.tag, GALLOWS_SECTON.title.class);
  title.innerText = TITLE;
  GALLOWS_SECTON.title.el = title;

  const imgContainer = createElement(GALLOWS_SECTON.imgContainer.tag, GALLOWS_SECTON.imgContainer.class, section);
  GALLOWS_SECTON.imgContainer.el = imgContainer;
  createDefaultParts();

  return GALLOWS_SECTON.section.el;
}
