import { describe, test, expect } from 'vitest';
import { evaluateGuess } from './evaluateGuess';

describe('evaluateGuess', () => {
  describe('bulls', () => {
    test('all bulls', () => {
      expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
    });
    test('3 bulls', () => {
      expect(evaluateGuess('1234', '1235')).toEqual({ bulls: 3, cows: 0 });
    });
    test('2 bulls', () => {
      expect(evaluateGuess('1234', '1256')).toEqual({ bulls: 2, cows: 0 });
    });
    test('1 bulls', () => {
      expect(evaluateGuess('1234', '1567')).toEqual({ bulls: 1, cows: 0 });
    });
  });

  describe('cows', () => {
    test('all cows, no bulls', () => {
      expect(evaluateGuess('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
    });
    test('3 cows, no bulls', () => {
      expect(evaluateGuess('1234', '4325')).toEqual({ bulls: 0, cows: 3 });
    });
    test('2 cows, no bulls', () => {
      expect(evaluateGuess('1234', '4356')).toEqual({ bulls: 0, cows: 2 });
    });
    test('1 cows, no bulls', () => {
      expect(evaluateGuess('1234', '4567')).toEqual({ bulls: 0, cows: 1 });
    });
  });

  describe('mixed', () => {
    test('3 cows, 1 bulls', () => {
      expect(evaluateGuess('1234', '1423')).toEqual({ bulls: 1, cows: 3 });
    });
    test('2 cows, 2 bulls', () => {
      expect(evaluateGuess('1234', '1243')).toEqual({ bulls: 2, cows: 2 });
    });
  });

  describe('nothing guessed', () => {
    test('0 cows, 0 bulls', () => {
      expect(evaluateGuess('1234', '5678')).toEqual({ bulls: 0, cows: 0 });
    });
  });

  describe('hex case-insensitive', () => {
    test("evaluateGuess('abcd', 'abcd') → { bulls: 4, cows: 0 }", () => {
      expect(evaluateGuess('abcd', 'abcd')).toEqual({ bulls: 4, cows: 0 });
    });
    test("evaluateGuess('abcd', 'ABCD') → { bulls: 4, cows: 0 }", () => {
      expect(evaluateGuess('abcd', 'ABCD')).toEqual({ bulls: 4, cows: 0 });
    });
    test("evaluateGuess('a1b2', 'A1B2') → { bulls: 4, cows: 0 }", () => {
      expect(evaluateGuess('a1b2', 'A1B2')).toEqual({ bulls: 4, cows: 0 });
    });
    test("evaluateGuess('abcd', 'badc') → { bulls: 0, cows: 4 }", () => {
      expect(evaluateGuess('abcd', 'badc')).toEqual({ bulls: 0, cows: 4 });
    });
  });
});
