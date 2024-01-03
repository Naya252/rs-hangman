import './src/sass/style.module.scss';
import createGallowsSection from './src/ui/layouts/gallows-section';
import { createQuizSection, creteHintContent, creteWord } from './src/ui/layouts/quiz-section';
import { changeTitle } from './src/shared/helpers';

const app = document.createElement('div');
app.className = 'container';

const gallowSection = createGallowsSection();
const quizSection = createQuizSection();
app.append(gallowSection);
app.append(quizSection);

setTimeout(() => {
  creteHintContent('Hint: Some text');
  creteWord(['w', 'o', 'r', 'd']);
}, 100);

document.querySelector('.body').append(app);

let size = window.innerWidth;
changeTitle(size);

window.addEventListener('resize', (event) => {
  changeTitle(event.target.innerWidth, size);
  size = event.target.innerWidth;
});
