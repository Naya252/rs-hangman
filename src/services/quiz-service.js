/* eslint-disable import/no-cycle */
import { QUIZ_DATA, GALLOWS_SECTON, QUIZ_SECTON } from '../shared/constants';
import Keyboard from './keyboard-service';
import { creteHintContent, createWord } from '../ui/layouts/quiz-section';
import { createFigurePart, cleanGallows } from '../ui/layouts/gallows-section';
import { createModal } from '../ui/layouts/modal';

class Quiz extends Keyboard {
  constructor(id, word, hint) {
    super();
    this.id = id;
    this.word = word;
    this.hint = hint;
    this.counter = 0;
    this.openedCounter = 0;
    this.max = 6;
    this.passedQuizes = [];
    this.data = [...QUIZ_DATA];
    this.isWinning = null;
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

  init(parent) {
    this.initKeyboard(parent);
    this.checkLocalStorage();

    this.keyboard.addEventListener('click', (event) => this.eventKey(event));
    document.addEventListener('keydown', (event) => this.eventKey(event));
    document.addEventListener('keyup', (event) => this.eventKey(event));
  }

  eventKey(event) {
    if (
      (this.counter < this.max && this.isWinning === null) ||
      (this.openedCounter !== this.word.length && this.isWinning)
    ) {
      const { isChangedLanguage, key } = this.checkTimer(event);

      if (isChangedLanguage && this.counter === 0) {
        setTimeout(() => {
          this.changeLang();
          this.changeWord();
          this.changeHint();
          this.printCounter();
        }, 50);
      }
      if (key) {
        setTimeout(() => {
          this.checkQuizLetter(key, key.getAttribute('value'));
        }, 50);
      }
    }
  }

  /**
   * Check key of the quiz keyboard
   *
   * @param {Element} key the key of the quiz keyboard
   * @param {String} value letter (value of key)
   *
   */
  checkQuizLetter(key, value) {
    if (!key.hasAttribute('disabled')) {
      if (value !== 'English' && value !== 'Русский') {
        if (this.word.includes(value.toLowerCase())) {
          const letters = [];
          this.word.forEach((el, i) => {
            if (el === value.toLowerCase()) {
              letters.push({
                value,
                idx: i,
              });
            }
          });
          // open correct letters of the quiz word
          this.showLetters(letters);
        } else {
          // change the mistakes counter
          this.changeCounter();
        }
        // // add disabled to the selected letter of the quiz keyboard
        key.setAttribute('disabled', '');

        const { notDisabled, spaceKey } = this.checkSpaceDisabled();
        if (notDisabled) {
          spaceKey.setAttribute('disabled', '');
        }
      }
    }
  }

  /**
   * Change quiz lang
   *
   */
  changeLang(lang = false) {
    if ((lang && lang === 'ru') || (!lang && this.lang === 'en')) {
      this.lang = 'ru';
      this.createKeys();
      return;
    }
    if ((lang && lang === 'en') || (!lang && this.lang === 'ru')) {
      this.lang = 'en';
      this.createKeys();
    }
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
        this.isWinning = false;
        this.overGame(this.isWinning);
      }
    }
  }

  /**
   * Show correct letters of the quiz word
   *
   * @param {Array} letters chosen letter of the keyboard
   *
   */
  showLetters(letters) {
    letters.forEach((el) => {
      QUIZ_SECTON.word.el.childNodes[el.idx].innerText = el.value;
      QUIZ_SECTON.word.el.childNodes[el.idx].classList.add('show');
    });
    this.openedCounter += letters.length;
    if (this.openedCounter === this.word.length) {
      this.isWinning = true;
      this.overGame(this.isWinning);
    }
  }

  /**
   * Open modal
   *
   * @param {Boolean} isWinning game result
   *
   */
  overGame(isWinning) {
    // add overlay
    this.toggleKeyboardOverly();
    // open modal with pause
    setTimeout(() => {
      createModal(isWinning);
    }, 500);
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
    this.isWinning = null;
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
    this.cleanKeyboard();
    // choose new quiz id
    this.changeId();
  }
}

const quiz = new Quiz();
export default quiz;
