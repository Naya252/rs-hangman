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

export const ALPHABET_EN = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
];

export const ALPHABET_RU = [
  'Й',
  'Ц',
  'У',
  'К',
  'Е',
  'Н',
  'Г',
  'Ш',
  'Щ',
  'З',
  'Х',
  'Ъ',
  'Ф',
  'Ы',
  'В',
  'А',
  'П',
  'Р',
  'О',
  'Л',
  'Д',
  'Ж',
  'Э',
  'Я',
  'Ч',
  'С',
  'М',
  'И',
  'Т',
  'Ь',
  'Б',
  'Ю',
  'Ё',
];

export const QUIZ_DATA = [
  {
    id: 1,
    wordEn: 'children',
    hintEn: 'Who could be mailed to the US before 1913?',
    wordRu: 'детей',
    hintRu: 'Кого можно было отправить по почте в США до 1913 года?',
  },
  {
    id: 2,
    wordEn: 'chinese',
    hintEn: 'This language is the most popular in the world',
    wordRu: 'китайский',
    hintRu: 'Этот язык самый популярный в мире',
  },
  {
    id: 3,
    wordEn: 'antarctica',
    hintEn: 'Where the Onyx River flows 60 days a year?',
    wordRu: 'антарктида',
    hintRu: 'Где течет река Оникс 60 дней в году?',
  },
  {
    id: 4,
    wordEn: 'jellyfish',
    hintEn: 'This animal has no brain and no blood vessels',
    wordRu: 'медуза',
    hintRu: 'У этого животного нет мозга и кровеносных сосудов',
  },
  {
    id: 5,
    wordEn: 'cognac',
    hintEn: 'Thermometers were filled with this liquid until the 17th century',
    wordRu: 'коньяк',
    hintRu: 'Этой жидкостью заполняли термометры до 17 века',
  },
  {
    id: 6,
    wordEn: 'lemon',
    hintEn: 'This citrus fruit contains more sugar than strawberries',
    wordRu: 'лимон',
    hintRu: 'Этот цитрусовый фрукт содержит больше сахара, чем клубника',
  },
  {
    id: 7,
    wordEn: 'chicken',
    hintEn: 'The longest flight of this bird lasted 13 seconds',
    wordRu: 'курица',
    hintRu: 'Самый продолжительный полет этой птицы длился 13 секунд',
  },
  {
    id: 8,
    wordEn: 'jupiter',
    hintEn: 'It regularly rains diamonds on this planet',
    wordRu: 'юпитер',
    hintRu: 'На этой планете регулярно идут дожди из алмазов',
  },
  {
    id: 9,
    wordEn: 'diamond',
    hintEn: 'This gem can burn',
    wordRu: 'алмаз',
    hintRu: 'Этот драгоценный камень может гореть',
  },
  {
    id: 10,
    wordEn: 'duck',
    hintEn: 'This bird is capable of diving to a depth of 6 meters',
    wordRu: 'утка',
    hintRu: 'Эта птица способна нырять на глубину до 6 метров',
  },
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
