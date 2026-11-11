import { el } from './ui/render.js';

const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

app.appendChild(el('h1', 'Bulls and Cows'));
app.appendChild(el('p', 'Загрузка...'));
