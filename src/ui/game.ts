import { el, clear } from './render.js';
import type { GameState } from '../logic/state.js';

export type OnGameEnd = (state: GameState, elapsedMs: number) => void;
export type OnNewGame = () => void;

export const renderGame = (
  container: HTMLElement,
  state: GameState,
  onGameEnd: OnGameEnd,
  onNewGame: OnNewGame,
): void => {
  clear(container);

  container.append(el('h1', 'Cows and Bulls Game', 'heading-1'));

  container.appendChild(el('p', `Длина: ${state.length}, Система: ${state.base}`));

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = `Введите ${state.length} цифр`;
  input.maxLength = state.length;
  container.appendChild(input);

  const checkButton = document.createElement('button');
  checkButton.textContent = 'Проверить';
  checkButton.addEventListener('click', () => {
    console.log('input:', input.value);
  });
  container.appendChild(checkButton);

  const historyContainer = document.createElement('div');
  historyContainer.id = 'history';
  container.appendChild(historyContainer);

  const newGameButton = document.createElement('button');
  newGameButton.textContent = 'Новая игра';
  newGameButton.addEventListener('click', () => onNewGame());
  container.appendChild(newGameButton);

  void onGameEnd;
};
