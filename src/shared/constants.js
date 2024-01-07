export const TITLE = 'HANGMAN GAME';

export const { BASE_URL } = import.meta.env;

export const GALLOWS_SECTION_CLASS = 'gallows';
export const GALLOWS_TITLE_CLASS = `${GALLOWS_SECTION_CLASS}__title`;
export const IMAGE_CONTAINER_CLASS = `${GALLOWS_SECTION_CLASS}__image-container`;

const parts = ['gallows', 'head', 'body', 'hand-one', 'hand-two', 'leg-one', 'leg-two', 'crow', 'crow3', 'crow4'];
export const IMAGES_FIGURE_PARTS = parts.map((el, i) => ({
  id: i + 1,
  name: el,
  class: `${IMAGE_CONTAINER_CLASS}_${el}`,
  src: `${BASE_URL}/img/${el}.svg`,
}));

export const QUIZ_SECTION_CLASS = 'quiz';
export const QUIZ_TITLE_CLASS = `${QUIZ_SECTION_CLASS}__title`;

export const QUIZ_WORD_CLASS = `${QUIZ_SECTION_CLASS}__word`;
export const QUIZ_LETTER_CLASS = `${QUIZ_WORD_CLASS}_letter`;

export const QUIZ_HINT_CLASS = `${QUIZ_SECTION_CLASS}__hint`;
export const QUIZ_HINT_TEXT_CLASS = `${QUIZ_HINT_CLASS}_text`;
export const QUIZ_HINT_INFO_CLASS = `${QUIZ_HINT_CLASS}_counter`;
export const QUIZ_HINT_COUNTER_CLASS = `${QUIZ_HINT_CLASS}_counter-value`;

export const QUIZ_KEYBOARD_CLASS = `${QUIZ_SECTION_CLASS}__keyboard`;
export const QUIZ_KEYBOARD_KEY_CLASS = `${QUIZ_KEYBOARD_CLASS}_key`;
export const QUIZ_KEYBOARD_OVERLAY_CLASS = `${QUIZ_KEYBOARD_CLASS}_overlay`;

export const QUIZ_DATA = [
  {
    id: 1,
    word: { en: 'children', ru: 'детей' },
    hint: {
      en: 'Who could be mailed to the US before 1913?',
      ru: 'Кого можно было отправить по почте в США до 1913 года?',
    },
  },
  {
    id: 2,
    word: { en: 'chinese', ru: 'китайский' },
    hint: {
      en: 'This language is the most popular in the world',
      ru: 'Этот язык самый популярный в мире',
    },
  },
  {
    id: 3,
    word: { en: 'antarctica', ru: 'антарктида' },
    hint: {
      en: 'Where the Onyx River flows 60 days a year?',
      ru: 'Где течет река Оникс 60 дней в году?',
    },
  },
  {
    id: 4,
    word: { en: 'jellyfish', ru: 'медуза' },
    hint: {
      en: 'This animal has no brain and no blood vessels',
      ru: 'У этого животного нет мозга и кровеносных сосудов',
    },
  },
  {
    id: 5,
    word: { en: 'cognac', ru: 'коньяк' },
    hint: {
      en: 'Thermometers were filled with this liquid until the 17th century',
      ru: 'Этой жидкостью заполняли термометры до 17 века',
    },
  },
  {
    id: 6,
    word: { en: 'lemon', ru: 'лимон' },
    hint: {
      en: 'This citrus fruit contains more sugar than strawberries',
      ru: 'Этот цитрусовый фрукт содержит больше сахара, чем клубника',
    },
  },
  {
    id: 7,
    word: { en: 'chicken', ru: 'курица' },
    hint: {
      en: 'The longest flight of this bird lasted 13 seconds',
      ru: 'Самый продолжительный полет этой птицы длился 13 секунд',
    },
  },
  {
    id: 8,
    word: { en: 'jupiter', ru: 'юпитер' },
    hint: {
      en: 'It regularly rains diamonds on this planet',
      ru: 'На этой планете регулярно идут дожди из алмазов',
    },
  },
  {
    id: 9,
    word: { en: 'diamond', ru: 'алмаз' },
    hint: {
      en: 'This gem can burn',
      ru: 'Этот драгоценный камень может гореть',
    },
  },
  {
    id: 10,
    word: { en: 'duck', ru: 'утка' },
    hint: {
      en: 'This bird is capable of diving to a depth of 6 meters',
      ru: 'Эта птица способна нырять на глубину до 6 метров',
    },
  },
];

export const ALPHABET = [
  { ru: 'Й', en: 'Q', code: 'KeyQ' },
  { ru: 'Ц', en: 'W', code: 'KeyW' },
  { ru: 'У', en: 'E', code: 'KeyE' },
  { ru: 'К', en: 'R', code: 'KeyR' },
  { ru: 'Е', en: 'T', code: 'KeyT' },
  { ru: 'Н', en: 'Y', code: 'KeyY' },
  { ru: 'Г', en: 'U', code: 'KeyU' },
  { ru: 'Ш', en: 'I', code: 'KeyI' },
  { ru: 'Щ', en: 'O', code: 'KeyO' },
  { ru: 'З', en: 'P', code: 'KeyP' },
  { ru: 'Х', en: null, code: 'BracketLeft' },
  { ru: 'Ъ', en: null, code: 'BracketRight' },
  { ru: 'Ф', en: 'A', code: 'KeyA' },
  { ru: 'Ы', en: 'S', code: 'KeyS' },
  { ru: 'В', en: 'D', code: 'KeyD' },
  { ru: 'А', en: 'F', code: 'KeyF' },
  { ru: 'П', en: 'G', code: 'KeyG' },
  { ru: 'Р', en: 'H', code: 'KeyH' },
  { ru: 'О', en: 'J', code: 'KeyJ' },
  { ru: 'Л', en: 'K', code: 'KeyK' },
  { ru: 'Д', en: 'L', code: 'KeyL' },
  { ru: 'Ж', en: null, code: 'Semicolon' },
  { ru: 'Э', en: null, code: 'Quote' },
  { ru: 'Я', en: 'Z', code: 'KeyZ' },
  { ru: 'Ч', en: 'X', code: 'KeyX' },
  { ru: 'С', en: 'C', code: 'KeyC' },
  { ru: 'М', en: 'V', code: 'KeyV' },
  { ru: 'И', en: 'B', code: 'KeyB' },
  { ru: 'Т', en: 'N', code: 'KeyN' },
  { ru: 'Ь', en: 'M', code: 'KeyM' },
  { ru: 'Б', en: null, code: 'Comma' },
  { ru: 'Ю', en: null, code: 'Period' },
  { ru: 'Ё', en: null, code: 'Backquote' },
  { ru: 'Русский', en: 'English', code: 'Space' },
];

/**
 * KeyA - a on a US keyboard.
 *        q on an AZERTY (e.g., French) keyboard.
 *
 * KeyQ - q on a US keyboard.
 *        a on an AZERTY (e.g., French) keyboard.
 *
 * KeyW - w on a US keyboard.
 *        z on an AZERTY (e.g., French) keyboard.
 *
 * KeyY - y on a US keyboard.
 *        z on a QWERTZ (e.g., German) keyboard.
 *
 * KeyZ - z on a US keyboard.
 *        w on an AZERTY (e.g., French) keyboard.
 *        y on a QWERTZ (e.g., German) keyboard.
 */
export const NON_NORMATIVE_LETTERS = ['KeyA', 'KeyQ', 'KeyW', 'KeyY', 'KeyZ'];

export const KEY_INDEXES = [{ first: 0, last: 12 }, { first: 12, last: 23 }, { first: 23, last: 32 }, { first: 32 }];
