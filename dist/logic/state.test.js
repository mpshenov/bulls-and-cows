import { describe, test, expect } from 'vitest';
import { createInitialState, addAttempt, isWon } from './state.js';
const exampleSecret = '0123';
const exampleTime = 1000;
describe('state', () => {
    describe('createInitialState', () => {
        test('returns correct initial state', () => {
            expect(createInitialState(4, 10, exampleSecret, exampleTime)).toEqual({
                secret: exampleSecret,
                length: 4,
                base: 10,
                history: [],
                status: 'playing',
                startedAt: exampleTime,
            });
        });
    });
    describe('addAttempt', () => {
        test('adds attempt to history', () => {
            const state = createInitialState(4, 10, exampleSecret, exampleTime);
            const newState = addAttempt(state, '1243', { bulls: 2, cows: 2 });
            expect(newState.history).toHaveLength(1);
            expect(newState.history[0]).toEqual({ guess: '1243', bulls: 2, cows: 2 });
        });
        test('does not mutate original state', () => {
            const state = createInitialState(4, 10, exampleSecret, exampleTime);
            const newState = addAttempt(state, '1243', { bulls: 2, cows: 2 });
            expect(newState.history).toHaveLength(1);
            expect(state.history).toHaveLength(0);
        });
        test('sets status to won when bulls === length', () => {
            const state = createInitialState(4, 10, exampleSecret, exampleTime);
            const newState = addAttempt(state, exampleSecret, { bulls: 4, cows: 0 });
            expect(newState.status).toBe('won');
        });
        test('keeps status playing when not won', () => {
            const state = createInitialState(4, 10, exampleSecret, exampleTime);
            const newState = addAttempt(state, '1243', { bulls: 2, cows: 2 });
            expect(newState.status).toBe('playing');
        });
        test('grows history with multiple attempts', () => {
            let state = createInitialState(4, 10, exampleSecret, exampleTime);
            state = addAttempt(state, '1111', { bulls: 0, cows: 1 });
            state = addAttempt(state, '1243', { bulls: 2, cows: 2 });
            expect(state.history).toHaveLength(2);
        });
    });
    describe('isWon', () => {
        test("returns false when status is 'playing", () => {
            const state = createInitialState(4, 10, exampleSecret, exampleTime);
            expect(isWon(state)).toBe(false);
        });
        test("returns true when status is 'won", () => {
            const state = createInitialState(4, 10, exampleSecret, exampleTime);
            const wonState = addAttempt(state, exampleSecret, { bulls: 4, cows: 0 });
            expect(isWon(wonState)).toBe(true);
        });
    });
});
