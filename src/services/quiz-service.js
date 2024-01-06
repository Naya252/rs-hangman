/* eslint-disable import/no-cycle */
import {
  QUIZ_DATA,
  ALPHABET,
  IMAGE_CONTAINER_CLASS,
  QUIZ_WORD_CLASS,
  QUIZ_HINT_COUNTER_CLASS,
  QUIZ_KEYBOARD_KEY_CLASS,
} from '../shared/constants';
import { creteHintContent, createWord, cleanKeyboard, toggleKeyboardOverly } from '../ui/layouts/quiz-section';
import { createFigurePart, cleanGallows } from '../ui/layouts/gallows-section';
import { createModal } from '../ui/layouts/modal';

function openModal(val) {
  toggleKeyboardOverly();
  setTimeout(() => {
    createModal(val);
  }, 500);
}
class Quiz {
  constructor(id, word, hint, counter = 0, openedCounter = 0) {
    this.id = id;
    this.word = word;
    this.hint = hint;
    this.counter = counter;
    this.openedCounter = openedCounter;
    this.max = 6;
    this.timeStartClickBtn = null;
    this.passedQuizes = [];
    this.data = [...QUIZ_DATA];
  }

  savePassedQuizes() {
    if (this.passedQuizes.length) {
      localStorage.setItem('passed', JSON.stringify(this.passedQuizes));
    }
  }

  checkLocalStorage() {
    const passed = localStorage.getItem('passed');

    if (passed) {
      const arr = JSON.parse(passed);
      if (arr.length) {
        arr.forEach((el) => {
          this.changePassedQiuz(+el);
        });
      }
    } else {
      const lastId = localStorage.getItem('quizId');
      if (lastId) {
        this.changePassedQiuz(+lastId);
      }
    }

    this.changeId();
  }

  changeData(id) {
    this.data = this.data.filter((el) => el.id !== id);
    if (this.passedQuizes.length === 10) {
      this.data = [...QUIZ_DATA];
    }
  }

  changePassedQiuz(id) {
    this.passedQuizes.push(id);
    this.changeData(id);
    if (this.passedQuizes.length === 10) {
      this.passedQuizes = [];
      this.changeData(id);
      this.changePassedQiuz(id);
    }
  }

  checkPassed() {
    if (this.passedQuizes.length === 0) {
      this.checkLocalStorage();
    } else {
      this.changeId();
    }
  }

  changeId() {
    const idx = Math.floor(Math.random() * this.data.length);
    this.id = this.data[idx].id;

    localStorage.setItem('quizId', this.id);
    this.changePassedQiuz(this.id);
    this.changeWord();
    this.changeHint();
    this.cleanCounter();
  }

  changeWord() {
    this.word = QUIZ_DATA[this.id - 1].wordEn.split('');
    createWord(this.word);
    console.log(this.word.join(''));
  }

  changeHint() {
    this.hint = QUIZ_DATA[this.id - 1].hintEn;
    creteHintContent(this.hint);
  }

  changeCounter() {
    this.counter += 1;
    this.printCounter();
    createFigurePart(this.counter, document.querySelector(`.${IMAGE_CONTAINER_CLASS}`));

    if (this.counter === 6) {
      openModal(false);
    }
  }

  submitModal() {
    this.cleanQuiz();
    cleanGallows();
    cleanKeyboard();
    toggleKeyboardOverly();
  }

  printCounter() {
    const parent = document.querySelector(`.${QUIZ_HINT_COUNTER_CLASS}`);
    parent.innerText = `${this.counter} / ${this.max}`;
  }

  cleanCounter() {
    this.counter = 0;
    this.openedCounter = 0;
    this.printCounter();
  }

  cleanQuiz() {
    this.id = 0;
    this.word = null;
    this.hint = null;
    this.changeId();
  }
}

export const quiz = new Quiz();

function showLetters(letters) {
  const word = document.querySelector(`.${QUIZ_WORD_CLASS}`);
  letters.forEach((el) => {
    word.childNodes[el.idx].innerText = el.value;
  });
  quiz.openedCounter += letters.length;
  if (quiz.openedCounter === quiz.word.length) {
    openModal(true);
  }
}

function checkKey(key, value) {
  if (quiz.word.includes(value.toLowerCase())) {
    const letters = [];
    quiz.word.forEach((el, i) => {
      if (el === value.toLowerCase()) {
        letters.push({
          value,
          idx: i,
        });
      }
    });

    showLetters(letters);
  } else {
    quiz.changeCounter();
  }
  key.setAttribute('disabled', '');
}

function changeKey(key) {
  if (!key.hasAttribute('disabled')) {
    const value = key.getAttributeNode('value');
    key.focus();
    setTimeout(() => {
      checkKey(key, value.value);
    }, 10);
  }
}

function chooseKey(event) {
  if (quiz.counter < 6) {
    let key = null;
    if (event.type === 'click') {
      key = event.target.closest(`.${QUIZ_KEYBOARD_KEY_CLASS}`);
      if (key) {
        changeKey(key);
      }
    }
    if (event.type === 'keydown') {
      const value = event.code.slice(3);
      if (ALPHABET.includes(value)) {
        key = document.querySelector(`.${QUIZ_KEYBOARD_KEY_CLASS}[value=${value}]`);
        changeKey(key);
      }
    }
  }
}

export function checkTimer(event) {
  if (event.type === 'click' || (event.type === 'keydown' && ALPHABET.includes(event.code.slice(3)))) {
    if (!quiz.timeStartClickBtn) {
      quiz.timeStartClickBtn = window.performance.now();
      chooseKey(event);
    } else {
      const timeSecondClick = window.performance.now();
      if (timeSecondClick - quiz.timeStartClickBtn > 10) {
        quiz.timeStartClickBtn = timeSecondClick;
        chooseKey(event);
      }
    }
  }
}
