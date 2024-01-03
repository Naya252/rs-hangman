import { QUIZ_DATA } from '../shared/constants';
import { creteHintContent, creteWord } from '../ui/layouts/quiz-section';

class Quiz {
  constructor(id, word, hint) {
    this.id = id;
    this.word = word;
    this.hint = hint;
  }
}

const quiz = new Quiz();

function getId() {
  const id = Math.floor(Math.random() * 10);
  return id + 1;
}

export default function chooseWord() {
  const id = getId();
  quiz.id = id;
  quiz.word = QUIZ_DATA[id - 1].wordEn.split('');
  quiz.hint = QUIZ_DATA[id - 1].hintEn;

  creteHintContent(quiz.hint);
  creteWord(quiz.word);
}
