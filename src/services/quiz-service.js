import { QUIZ_DATA, ALPHABET } from '../shared/constants';
import { creteHintContent, createWord, cleanKeyboard, toggleKeyboardOverly } from '../ui/layouts/quiz-section';
import { createFigurePart, cleanGallows } from '../ui/layouts/gallows-section';

class Quiz {
  constructor(id, word, hint, counter = 0) {
    this.id = id;
    this.word = word;
    this.hint = hint;
    this.counter = counter;
    this.max = 6;
    this.timeStartClickBtn = null;
    this.lastId = null;
  }

  changeId() {
    if (!this.lastId) {
      const lastId = localStorage.getItem('quizId');
      if (lastId) {
        this.lastId = lastId;
      }
    }
    const id = Math.floor(Math.random() * 10);
    if (id + 1 !== +this.lastId) {
      this.id = id + 1;
      this.lastId = this.id;
      localStorage.setItem('quizId', this.lastId);
      this.changeWord();
      this.changeHint();
      this.cleanCounter();
    } else {
      this.changeId();
    }
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
    createFigurePart(this.counter, document.querySelector('.gallows__image-container'));

    if (this.counter === 6) {
      this.showModal();
    }
  }

  showModal() {
    toggleKeyboardOverly();
    setTimeout(() => {
      this.cleanQuiz();
      cleanGallows();
      cleanKeyboard();
      toggleKeyboardOverly();
    }, 1000);
  }

  printCounter() {
    const parent = document.querySelector('.quiz__hint_counter-value');
    parent.innerText = `${this.counter} / ${this.max}`;
  }

  cleanCounter() {
    this.counter = 0;
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
  const word = document.querySelector('.quiz__word');
  letters.forEach((el) => {
    word.childNodes[el.idx].innerText = el.value;
  });
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
    }, 300);
  }
}

function chooseKey(event) {
  if (quiz.counter < 6) {
    let key = null;
    if (event.type === 'click') {
      key = event.target.closest('.quiz__keyboard_key');
      if (key) {
        changeKey(key);
      }
    }
    if (event.type === 'keydown') {
      const value = event.code.slice(3);
      if (ALPHABET.includes(value)) {
        key = document.querySelector(`.quiz__keyboard_key[value=${value}]`);
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
      if (timeSecondClick - quiz.timeStartClickBtn > 310) {
        quiz.timeStartClickBtn = timeSecondClick;
        chooseKey(event);
      }
    }
  }
}
