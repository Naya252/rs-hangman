/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-syntax */
import { QUIZ_KEYBOARD_CLASS, QUIZ_KEYBOARD_KEY_CLASS, ALPHABET, NON_NORMATIVE_LETTERS } from '../shared/constants';
import { createElement, removeChildren } from '../shared/helpers';

const KEY_INDEXES = [
  { first: 0, last: 12 },
  { first: 12, last: 23 },
  { first: 23, last: 32 },
  { first: 32, last: 34 },
];

export default class Keyboard {
  constructor(className = QUIZ_KEYBOARD_CLASS, lang = 'en', max = null, timeStartClickBtn = null) {
    this.keyboardTag = 'div';
    this.keyboardClass = className;
    this.keyboard = null;
    this.keyboardLines = null;
    this.keyboardKey = { tag: 'button', class: QUIZ_KEYBOARD_KEY_CLASS };
    this.overlay = { tag: 'div', class: `${className}_overlay` };
    this.lang = lang;
    this.timeStartClickBtn = timeStartClickBtn;
    this.max = max;
    this.alphabet = ALPHABET;
  }

  initKeyboard(parent) {
    const newKeyboard = createElement(this.keyboardTag, this.keyboardClass);
    this.keyboard = newKeyboard;

    this.keyboardLines = [1, 2, 3, 4].map((el) => ({
      tag: 'div',
      class: `${this.keyboardClass}-line${el} line`,
      index: KEY_INDEXES[el - 1],
    }));

    this.keyboardLines.forEach((el, i) => {
      const element = createElement(el.tag, el.class, this.keyboard);
      this.keyboardLines[i].el = element;
    });

    this.overlay.el = createElement(this.overlay.tag, this.overlay.class, this.keyboard);

    parent.append(this.keyboard);
  }

  /**
   * Create keys of keyboard
   *
   */
  createKeys() {
    let i = 0;
    while (i < this.keyboardLines.length) {
      const line = this.keyboardLines[i];
      removeChildren(line.el.childNodes);
      const letters = this.alphabet.slice(line.index.first, line.index.last);
      letters.forEach((letter) => {
        if (letter[this.lang]) {
          const key = createElement(this.keyboardKey.tag, this.keyboardKey.class);
          key.type = 'button';
          key.innerText = letter[this.lang];
          key.value = letter[this.lang];
          key.name = letter.code;
          key.classList.add('btn');
          line.el.append(key);
        }
      });
      i += 1;
    }
  }

  /**
   * Check timer between clicks on letters
   *
   */
  checkTimer(event) {
    let isChangedLanguage;
    let key;

    if (event.type === 'click' || (event.type === 'keydown' && this.alphabet.some((el) => el.code === event.code))) {
      if (!this.timeStartClickBtn) {
        this.timeStartClickBtn = window.performance.now();
        const data = this.chooseKey(event);
        isChangedLanguage = data.isChangedLanguage;
        key = data.key;
      } else {
        const timeSecondClick = window.performance.now();
        if (timeSecondClick - this.timeStartClickBtn > 50) {
          this.timeStartClickBtn = timeSecondClick;
          const data = this.chooseKey(event);
          isChangedLanguage = data.isChangedLanguage;
          key = data.key;
        }
      }
    }

    if (event.type === 'keyup' && event.code === 'Space') {
      isChangedLanguage = this.clickOnSpace();
    }

    return { isChangedLanguage, key };
  }

  /**
   * Key up on space of the real keyboard
   *
   */
  clickOnSpace() {
    const { notDisabled } = this.checkSpaceDisabled();
    if (notDisabled) {
      setTimeout(() => {
        this.createKeys();
      }, 50);
    }
    return !notDisabled;
  }

  checkSpaceDisabled() {
    const spaceKey = this.keyboard.lastChild.previousSibling.lastChild;
    const notDisabled = !spaceKey.hasAttribute('disabled');
    return { notDisabled, spaceKey };
  }

  /**
   * Select the letter (key of keyboard)
   *
   * @param {Event} event click or keydown
   *
   */
  chooseKey(event) {
    let key = null;
    let isChangedLanguage = null;

    if (event.type === 'click') {
      key = event.target.closest(`.${this.keyboardKey.class}`);
      if (key) {
        this.addKeyFocus(key);

        if (key.getAttribute('name') === 'Space') {
          isChangedLanguage = this.clickOnSpace();
        }
      }
    }
    if (event.type === 'keydown') {
      let letter;
      if (NON_NORMATIVE_LETTERS.includes(event.code)) {
        letter = this.checkSpecialKey(event);
      } else {
        letter = this.alphabet.filter((el) => el.code === event.code);
      }

      if (letter) {
        key = document.querySelector(`.${this.keyboardKey.class}[value=${letter[0][this.lang]}]`);
        this.addKeyFocus(key);
      }
    }

    return { isChangedLanguage, key };
  }

  /**
   * Check non normative letter
   *
   * @param {Event} event keydown
   *
   */
  checkSpecialKey(event) {
    let letter;
    const key = event.key.toUpperCase();

    if (this.alphabet.some((el) => el.ru === key || el.en === key)) {
      letter = this.alphabet.filter((el) => el.ru === event.key.toUpperCase() || el.en === event.key.toUpperCase());
    } else {
      letter = this.alphabet.filter((el) => el.code === event.code);
    }

    return letter;
  }

  /**
   * Add focus on the key of the quiz keyboard
   *
   * @param {Element} key the key of the quiz keyboard
   *
   */
  addKeyFocus(key) {
    if (key) {
      if (!key.hasAttribute('disabled')) {
        const value = key.getAttribute('value');
        key.focus();
        // add disabled to the selected letter of the quiz keyboard
        setTimeout(() => {
          if (value !== 'English' && value !== 'Русский') {
            key.setAttribute('disabled', '');
          } else {
            const { notDisabled, spaceKey } = this.checkSpaceDisabled();
            if (notDisabled) {
              spaceKey.setAttribute('disabled', '');
            }
          }
        }, 50);
      }
    }
  }

  /**
   * Remove disabled from keys of the keyboad
   *
   */
  cleanKeyboard() {
    const lines = this.keyboard.childNodes;
    for (const line of lines) {
      const keys = line.childNodes;
      for (const key of keys) {
        key.removeAttribute('disabled');
      }
    }
    this.toggleKeyboardOverly();
  }

  /**
   * Toggle overlay of the keyboard
   *
   */
  toggleKeyboardOverly() {
    this.overlay.el.classList.toggle('show');
  }
}
