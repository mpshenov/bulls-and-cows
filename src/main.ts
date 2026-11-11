import { el } from './ui/render.js';
import { renderSettings } from './ui/settings.js';
import { generateSecret } from './logic/generateSecret.js';
import { createInitialState } from './logic/state.js';

const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

app.appendChild(el('h1', 'Bulls and Cows'));
app.appendChild(el('p', 'Загрузка...'));

const onStart = (length: number, base: number): void => {
  const secret = generateSecret(length, base);
  const state = createInitialState(length, base, secret, Date.now());
  console.log('state:', state);
};

renderSettings(app, onStart);
