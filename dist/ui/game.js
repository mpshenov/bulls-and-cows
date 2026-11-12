import { el, clear } from './render.js';
import { isValidGuess } from '../logic/isValidGuess.js';
import { evaluateGuess } from '../logic/evaluateGuess.js';
import { addAttempt, isWon } from '../logic/state.js';
import { createDigitValidator } from '../logic/createDigitValidator.js';
import { renderRecords } from './records.js';
export const renderGame = (container, initialState, onGameEnd, onNewGame) => {
    let state = initialState;
    const startedAt = initialState.startedAt;
    clear(container);
    const title = el('h1', 'Bulls and Cows');
    const info = el('p', `Длина: ${state.length}, Система: ${state.base}`);
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `Введите ${state.length} цифр`;
    input.maxLength = state.length;
    const checkButton = document.createElement('button');
    checkButton.textContent = 'Проверить';
    const errorContainer = el('p', '', 'error');
    const historyContainer = document.createElement('div');
    historyContainer.id = 'history';
    const newGameButton = document.createElement('button');
    newGameButton.textContent = 'Новая игра';
    const isValidDigit = createDigitValidator(state.base);
    input.addEventListener('input', () => {
        input.value = [...input.value].filter(isValidDigit).join('');
    });
    const renderHistory = () => {
        clear(historyContainer);
        for (const attempt of state.history) {
            historyContainer.appendChild(el('p', `${attempt.guess} → ${attempt.bulls} быков, ${attempt.cows} коров`));
        }
    };
    checkButton.addEventListener('click', () => {
        const guess = input.value;
        if (!isValidGuess(guess, state.length, state.base)) {
            errorContainer.textContent = 'Неверный ввод: длина, символы, уникальность';
            return;
        }
        errorContainer.textContent = '';
        const result = evaluateGuess(state.secret, guess);
        state = addAttempt(state, guess, result);
        input.value = '';
        renderHistory();
        if (isWon(state)) {
            const elapsedMs = Date.now() - startedAt;
            onGameEnd(state, elapsedMs);
        }
    });
    newGameButton.addEventListener('click', () => onNewGame());
    container.appendChild(title);
    container.appendChild(info);
    container.appendChild(input);
    container.appendChild(checkButton);
    container.appendChild(errorContainer);
    container.appendChild(historyContainer);
    container.appendChild(newGameButton);
};
export const renderWin = (container, state, elapsedMs, onNewGame) => {
    clear(container);
    container.appendChild(el('h1', 'Победа!'));
    container.appendChild(el('p', `Попыток: ${state.history.length}`));
    container.appendChild(el('p', `Время: ${(elapsedMs / 1000).toFixed(1)} сек`));
    renderRecords(container, state.length, state.base);
    const newGameButton = document.createElement('button');
    newGameButton.textContent = 'Новая игра';
    newGameButton.addEventListener('click', () => onNewGame());
    container.appendChild(newGameButton);
};
