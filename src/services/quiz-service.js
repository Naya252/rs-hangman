/* eslint-disable import/no-cycle */
import {
  QUIZ_DATA,
  ALPHABET,
  GALLOWS_SECTON,
  QUIZ_SECTON,
  QUIZ_KEYBOARD_KEY_CLASS,
  NON_NORMATIVE_LETTERS,
} from '../shared/constants';
import {
  creteHintContent,
  createWord,
  cleanKeyboard,
  toggleKeyboardOverly,
  changeKeysLang,
} from '../ui/layouts/quiz-section';
import { createFigurePart, cleanGallows } from '../ui/layouts/gallows-section';
import { createModal } from '../ui/layouts/modal';

/**
 * Open modal
 *
 * @param {Boolean} isWinning game result
 *
 */
function openModal(isWinning) {
  // add overlay
  toggleKeyboardOverly();
  // open modal with pause
  setTimeout(() => {
    createModal(isWinning);
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
    this.lang = null;
  }

  /**
   * Change quiz lang
   *
   */
  changeLang(lang = false) {
    if ((lang && lang === 'ru') || (!lang && this.lang === 'en')) {
      this.lang = 'ru';
      changeKeysLang();
      return;
    }
    if ((lang && lang === 'en') || (!lang && this.lang === 'ru')) {
      this.lang = 'en';
      changeKeysLang();
    }
  }

  /**
   * Save data to localStorage
   *
   */
  saveToLocalStorage() {
    if (this.passedQuizes.length) {
      localStorage.setItem('passed', JSON.stringify(this.passedQuizes));
    }
    if (this.id) {
      localStorage.setItem('quizId', this.id);
    }
    if (this.lang) {
      localStorage.setItem('lang', this.lang);
    }
  }

  /**
   * Check data from localStorage
   *
   */
  checkLocalStorage() {
    const lang = localStorage.getItem('lang');
    if (lang) {
      this.changeLang(lang);
    } else {
      this.changeLang('en');
    }

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
    // Choose quiz id for start game
    this.changeId();
  }

  /**
   * Add quiz id to array with passed id
   *
   * @param {Number} id passed quiz id
   *
   */
  changePassedQiuz(id) {
    this.passedQuizes.push(id);
    this.changeData(id);
    if (this.passedQuizes.length === 10) {
      this.passedQuizes = [];
      this.changeData(id);
      this.changePassedQiuz(id);
    }
  }

  /**
   * Delete passed quiz from data
   *
   * @param {Number} id passed quiz id
   *
   */
  changeData(id) {
    this.data = this.data.filter((el) => el.id !== id);
    if (this.passedQuizes.length === 10) {
      this.data = [...QUIZ_DATA];
    }
  }

  /**
   * Choose quiz id for start game
   *
   */
  changeId() {
    const idx = Math.floor(Math.random() * this.data.length);
    this.id = this.data[idx].id;

    // Add current quiz to passed quizes
    this.changePassedQiuz(this.id);
    // Add data of the new quiz to page
    this.changeWord();
    this.changeHint();
    // add default values to mistake counter
    this.cleanCounter();
  }

  /**
   * Get current item from full list of qiuz data
   *
   */
  getCurrenntQuiz() {
    const data = QUIZ_DATA.filter((el) => el.id === this.id);
    return data[0];
  }

  /**
   * Change quiz word
   *
   */
  changeWord() {
    this.word = this.getCurrenntQuiz().word[this.lang].split('');
    createWord(this.word);
    console.log(this.word.join(''));
  }

  /**
   * Change quiz hint
   *
   */
  changeHint() {
    this.hint = this.getCurrenntQuiz().hint[this.lang];
    creteHintContent(this.hint);
  }

  /**
   * Change quiz mistake counter
   *
   */
  changeCounter() {
    if (this.counter < 7) {
      this.counter += 1;
      this.printCounter();
      createFigurePart(GALLOWS_SECTON.images[this.counter], GALLOWS_SECTON.imgContainer.el);

      if (this.counter === 6) {
        const isWinning = false;
        openModal(isWinning);
      }
    }
  }

  /**
   * Show mistake counter with new value
   *
   */
  printCounter() {
    QUIZ_SECTON.counterValue.el.innerText = `${this.counter} / ${this.max}`;
  }

  /**
   * Add default values to mistake counter
   *
   */
  cleanCounter() {
    this.counter = 0;
    this.openedCounter = 0;
    this.printCounter();
  }

  /**
   * Add default values to quiz
   *
   */
  cleanQuiz() {
    this.id = 0;
    this.word = null;
    this.hint = null;
  }

  /**
   * Result of the submit modal for start new game
   *
   */
  submitModal() {
    // add default values to quiz
    this.cleanQuiz();
    // remove body parts
    cleanGallows();
    // remove disabled
    cleanKeyboard();
    // remove overlay
    toggleKeyboardOverly();
    // choose new quiz id
    this.changeId();
  }
}

export const quiz = new Quiz();

/**
 * Show correct letters of the quiz word
 *
 * @param {Array} letters chosen letter of the keyboard
 *
 */
function showLetters(letters) {
  letters.forEach((el) => {
    QUIZ_SECTON.word.el.childNodes[el.idx].innerText = el.value;
  });
  quiz.openedCounter += letters.length;
  if (quiz.openedCounter === quiz.word.length) {
    const isWinning = true;
    openModal(isWinning);
  }
}

function checkSpaceDisabled() {
  const spaceKey = QUIZ_SECTON.keyboard.el.lastChild.previousSibling.lastChild;
  const notDisabled = !spaceKey.hasAttribute('disabled');
  return { notDisabled, spaceKey };
}

/**
 * Add focus on the key of the quiz keyboard
 *
 * @param {Element} key the key of the quiz keyboard
 * @param {String} value letter (value of key)
 *
 */
function checkKey(key, value) {
  if (value !== 'English' && value !== 'Русский') {
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
      // open correct letters of the quiz word
      showLetters(letters);
    } else {
      // change the mistakes counter
      quiz.changeCounter();
    }
    // add disabled to the selected letter of the quiz keyboard
    key.setAttribute('disabled', '');

    const { notDisabled, spaceKey } = checkSpaceDisabled();
    if (notDisabled) {
      spaceKey.setAttribute('disabled', '');
    }
  }
}

/**
 * Key up on space of the real keyboard
 *
 */
function clickOnSpace() {
  const { notDisabled } = checkSpaceDisabled();
  if (notDisabled) {
    setTimeout(() => {
      quiz.changeLang();
      quiz.changeWord();
      quiz.changeHint();
      quiz.printCounter();
    }, 50);
  }
}

/**
 * Add focus on the key of the quiz keyboard
 *
 * @param {Element} key the key of the quiz keyboard
 *
 */
function changeKey(key) {
  if (key) {
    if (!key.hasAttribute('disabled')) {
      const value = key.getAttribute('value');
      key.focus();

      if (value !== 'English' && value !== 'Русский') {
        setTimeout(() => {
          checkKey(key, value);
        }, 50);
      }
    }
  }
}

/**
 * Check non normative letter
 *
 * @param {Event} event keydown
 *
 */
function checkSpecialKey(event) {
  let letter;
  const key = event.key.toUpperCase();

  if (ALPHABET.some((el) => el.ru === key || el.en === key)) {
    letter = ALPHABET.filter((el) => el.ru === event.key.toUpperCase() || el.en === event.key.toUpperCase());
  } else {
    letter = ALPHABET.filter((el) => el.code === event.code);
  }

  return letter;
}

/**
 * Select the letter (key of keyboard)
 *
 * @param {Event} event click or keydown
 *
 */
function chooseKey(event) {
  if (quiz.counter < 6) {
    let key = null;
    if (event.type === 'click') {
      key = event.target.closest(`.${QUIZ_KEYBOARD_KEY_CLASS}`);
      if (key) {
        changeKey(key);

        if (key.getAttribute('name') === 'Space') {
          clickOnSpace();
        }
      }
    }
    if (event.type === 'keydown') {
      let letter;
      if (NON_NORMATIVE_LETTERS.includes(event.code)) {
        letter = checkSpecialKey(event);
      } else {
        letter = ALPHABET.filter((el) => el.code === event.code);
      }

      if (letter) {
        key = document.querySelector(`.${QUIZ_KEYBOARD_KEY_CLASS}[value=${letter[0][quiz.lang]}]`);
        changeKey(key);
      }
    }
  }
}

/**
 * Check timer between clicks on letters
 *
 */
export function checkTimer(event) {
  if (event.type === 'click' || (event.type === 'keydown' && ALPHABET.some((el) => el.code === event.code))) {
    if (!quiz.timeStartClickBtn) {
      quiz.timeStartClickBtn = window.performance.now();
      chooseKey(event);
    } else {
      const timeSecondClick = window.performance.now();
      if (timeSecondClick - quiz.timeStartClickBtn > 50) {
        quiz.timeStartClickBtn = timeSecondClick;
        chooseKey(event);
      }
    }
  }
  if (event.type === 'keyup' && event.code === 'Space') {
    clickOnSpace();
  }
}
