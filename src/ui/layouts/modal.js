/* eslint-disable import/no-cycle */
import { createElement } from '../../shared/helpers';
import { quiz } from '../../services/quiz-service';
import { BASE_URL } from '../../shared/constants';

function toInert() {
  document.querySelector('.container').setAttribute('inert', true);
}

function fromInert() {
  document.querySelector('.container').removeAttribute('inert');
}

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
        quiz.submitModal();
      }
    }, 100);
  }, 100);
}

export function createModal(value) {
  const modal = createElement('div', 'modal');
  const modalWrap = createElement('div', 'modal__wrap');
  const modalContent = createElement('div', 'modal__content');
  const modalTitle = createElement('h3', 'modal__content_title');
  const modalP = createElement('p', 'modal__content_p');
  modalP.innerText = `Answer: ${quiz.word.join('').toUpperCase()}`;

  if (value) {
    modalTitle.innerText = 'Winning!';
  } else {
    modalTitle.innerText = 'Losing...';
  }
  const modalBtn = createElement('button', 'modal__content_btn btn');
  modalBtn.innerText = 'Play again';

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

  setTimeout(() => {
    modalContent.classList.add('content--active');
    modalContent.style.backgroundImage = `url("${BASE_URL}/img/crow2.svg")`;
    modalContent.style.backgroundSize = '20%';
    modalContent.style.backgroundPosition = '85% 30%';
    modalContent.style.backgroundRepeat = 'no-repeat';
    toInert(modal);
  }, 100);
}
