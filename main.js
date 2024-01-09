import './src/sass/style.module.scss';
import { createGallowsSection } from './src/ui/layouts/gallows-section';
import { createQuizSection } from './src/ui/layouts/quiz-section';
import { changeTitle } from './src/shared/helpers';
import quiz from './src/services/quiz-service';
import { QUIZ_SECTON } from './src/shared/constants';

// Create html
const app = document.createElement('div');
app.className = 'container';
const gallowSection = createGallowsSection();
const quizSection = createQuizSection();
app.append(gallowSection);
app.append(quizSection);
document.querySelector('.body').append(app);

// Change title
let size = window.innerWidth;
changeTitle(size);
window.addEventListener('resize', (event) => {
  changeTitle(event.target.innerWidth, size);
  size = event.target.innerWidth;
});

// Save passed quizes to LocalStorage
window.addEventListener('beforeunload', (event) => quiz.saveToLocalStorage(event));

quiz.init(QUIZ_SECTON.section.el);
