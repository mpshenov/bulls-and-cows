import { describe, test, expect } from 'vitest';
import { isValidGuess } from './isValidGuess.js';

describe('isValidGuess', () => {
  describe('valid guesses', () => {
    test("isValidGuess('0123', 4, 10) → true", () => {
      expect(isValidGuess('0123', 4, 10)).toBe(true);
    });
    test("isValidGuess('01', 2, 2) → true", () => {
      expect(isValidGuess('01', 2, 2)).toBe(true);
    });
    test("isValidGuess('aB3f', 4, 16) → true", () => {
      expect(isValidGuess('aB3f', 4, 16)).toBe(true);
    });
    test("isValidGuess('1456', 4, 8) → true", () => {
      expect(isValidGuess('1456', 4, 8)).toBe(true);
    });
  });

  describe('invalid guesses', () => {
    test("isValidGuess('012', 4, 10) → false", () => {
      expect(isValidGuess('012', 4, 10)).toBe(false);
    });
    test("isValidGuess('01234', 4, 10) → false", () => {
      expect(isValidGuess('01234', 4, 10)).toBe(false);
    });
    test("isValidGuess('012a', 4, 10) → false", () => {
      expect(isValidGuess('012a', 4, 10)).toBe(false);
    });
    test("isValidGuess('02', 2, 2) → false", () => {
      expect(isValidGuess('02', 2, 2)).toBe(false);
    });
    test("isValidGuess('0112', 4, 10) → false", () => {
      expect(isValidGuess('0112', 4, 10)).toBe(false);
    });
    test("isValidGuess('aA', 2, 16) → false", () => {
      expect(isValidGuess('aA', 2, 16)).toBe(false);
    });
    test("isValidGuess('', 4, 10) → false", () => {
      expect(isValidGuess('', 4, 10)).toBe(false);
    });
  });
});
