import { renderSettings } from './ui/settings.js';
import { generateSecret } from './logic/generateSecret.js';
import { createInitialState } from './logic/state.js';
import { renderGame } from './ui/game.js';
import type { GameState } from './logic/state.js';
import { saveRecord } from './ui/records.js';
import { renderWin } from './ui/game.js';

const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

const onNewGame = (): void => {
  renderSettings(app, onStart);
};

const onStart = (length: number, base: number): void => {
  const secret = generateSecret(length, base);
  const state = createInitialState(length, base, secret, Date.now());
  renderGame(app, state, onGameEnd, onNewGame);
};

const onGameEnd = (state: GameState, elapsedMs: number): void => {
  saveRecord(state.length, state.base, {
    attempts: state.history.length,
    timeMs: elapsedMs,
    date: new Date().toISOString(),
  });

  renderWin(app, state, elapsedMs, onNewGame);
};

renderSettings(app, onStart);
