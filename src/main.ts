import { renderSettings } from './ui/settings.js';
import { generateSecret } from './logic/generateSecret.js';
import { createInitialState } from './logic/state.js';
import { renderGame } from './ui/game.js';
import type { GameState } from './logic/state.js';

const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

const onGameEnd = (state: GameState, elapsedMs: number): void => {
  console.log('WIN!', state, elapsedMs);
};

const onNewGame = (): void => {
  renderSettings(app, onStart);
};

const onStart = (length: number, base: number): void => {
  const secret = generateSecret(length, base);
  const state = createInitialState(length, base, secret, Date.now());
  renderGame(app, state, onGameEnd, onNewGame);
};

renderSettings(app, onStart);
