import { QUIZ_DATA, ALPHABET } from '../shared/constants';
import { creteHintContent, createWord } from '../ui/layouts/quiz-section';

class Quiz {
  constructor(id, word, hint, counter = 0) {
    this.id = id;
    this.word = word;
    this.hint = hint;
    this.counter = counter;
    this.max = 6;
  }

  changeId() {
    const id = Math.floor(Math.random() * 10);
    this.id = id + 1;
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
    if (this.counter === 6) {
      this.cleanQuiz();
    }
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

export function chooseKey(event) {
  let key = null;
  if (event.type === 'click') {
    key = event.target.closest('.quiz__keyboard_key');
    if (key) {
      const value = key.getAttributeNode('value');
      checkKey(key, value.value);
    }
  }
  if (event.type === 'keydown') {
    const value = event.code.slice(3);
    if (ALPHABET.includes(value)) {
      key = document.querySelector(`.quiz__keyboard_key[value=${value}]`);
      key.focus();
      key.click();
    }
  }
}
