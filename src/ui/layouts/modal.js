/* eslint-disable import/no-cycle */
import { createElement } from '../../shared/helpers';
import quiz from '../../services/quiz-service';
import { BASE_URL, TEXT } from '../../shared/constants';

/**
 * Add inert attribute to page (without modal)
 *
 */
function toInert() {
  document.querySelector('.container').setAttribute('inert', true);
}

/**
 * Remove inert attribute from page
 *
 */
function fromInert() {
  document.querySelector('.container').removeAttribute('inert');
}

/**
 * Remove modal from body
 *
 */
export function removeModal() {
  document.querySelector('body').classList.remove('scroll-not-visible');
  const content = document.querySelector('.modal__content');
  content.classList.remove('content--active');

  setTimeout(() => {
    content.innerHTML = ``;
    const modal = document.querySelector('.modal');
    modal.classList.remove('modal--active');
    fromInert();

    setTimeout(() => {
      if (document.querySelector('.modal')) {
        document.querySelector('.modal').remove();
        // Start new game
        quiz.submitModal();
      }
    }, 100);
  }, 100);
}

/**
 * Create modal and add modal to body
 *
 * @param {Boolean} isWinning game result
 *
 */
export function createModal(isWinning) {
  const modal = createElement('div', 'modal');
  const modalWrap = createElement('div', 'modal__wrap');
  const modalContent = createElement('div', 'modal__content');
  const modalTitle = createElement('h3', 'modal__content_title');
  const modalP = createElement('p', 'modal__content_p');
  modalP.innerText = `${TEXT[1].modal.answer[quiz.lang]}: ${quiz.word.join('').toUpperCase()}`;

  if (isWinning) {
    modalTitle.innerText = TEXT[1].modal.win[quiz.lang];
  } else {
    modalTitle.innerText = TEXT[1].modal.loss[quiz.lang];
  }
  const modalBtn = createElement('button', 'modal__content_btn btn');
  modalBtn.innerText = TEXT[1].modal.again[quiz.lang];

  modalContent.append(modalTitle);
  modalContent.append(modalP);
  modalContent.append(modalBtn);
  modalWrap.append(modalContent);
  modal.append(modalWrap);

  const body = document.querySelector('body');
  body.classList.add('scroll-not-visible');
  body.append(modal);

  modal.classList.add('modal--active');
  modalBtn.addEventListener('click', removeModal);

  // Open modal with transition
  setTimeout(() => {
    modalContent.classList.add('content--active');
    // Add crown
    modalContent.style.backgroundImage = `url("${BASE_URL}/img/crow2.svg")`;
    modalContent.style.backgroundSize = '20%';
    modalContent.style.backgroundPosition = '85% 30%';
    modalContent.style.backgroundRepeat = 'no-repeat';
    toInert(modal);
  }, 100);
}
