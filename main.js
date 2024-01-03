import './src/sass/style.module.scss';
import createGallowsSection from './src/ui/layouts/gallows-section';
import { createQuizSection } from './src/ui/layouts/quiz-section';
import { changeTitle } from './src/shared/helpers';
import { quiz, chooseKey } from './src/services/quiz-service';

const app = document.createElement('div');
app.className = 'container';

const gallowSection = createGallowsSection();
const quizSection = createQuizSection();
app.append(gallowSection);
app.append(quizSection);

document.querySelector('.body').append(app);

let size = window.innerWidth;
changeTitle(size);

window.addEventListener('resize', (event) => {
  changeTitle(event.target.innerWidth, size);
  size = event.target.innerWidth;
});

const keyboard = document.querySelector('.quiz__keyboard');
keyboard.addEventListener('click', (event) => chooseKey(event));
window.addEventListener('keydown', (event) => chooseKey(event));

setTimeout(() => {
  quiz.changeId();
}, 100);
