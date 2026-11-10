import { describe, test, expect } from 'vitest';
import { createDigitValidator } from './createDigitValidator';

describe('createDigitValidator', () => {
  describe('bin (base = 2)', () => {
    const isValid = createDigitValidator(2); // каррирование 1 параметр определен
    test("'0' → true", () => {
      expect(isValid('0')).toBe(true);
    });
    test("'1' → true", () => {
      expect(isValid('1')).toBe(true);
    });
    test("'2' → false", () => {
      expect(isValid('2')).toBe(false);
    });
    test("'a' → false", () => {
      expect(isValid('a')).toBe(false);
    });
  });

  describe('oct (base = 8)', () => {
    const isValid = createDigitValidator(8); // каррирование 1 параметр определен
    test("'0' → true", () => {
      expect(isValid('0')).toBe(true);
    });
    test("'7' → true", () => {
      expect(isValid('7')).toBe(true);
    });
    test("'8' → false", () => {
      expect(isValid('8')).toBe(false);
    });
    test("'a' → false", () => {
      expect(isValid('a')).toBe(false);
    });
  });

  describe('dec (base = 10)', () => {
    const isValid = createDigitValidator(10); // каррирование 1 параметр определен
    test("'0' → true", () => {
      expect(isValid('0')).toBe(true);
    });
    test("'9' → true", () => {
      expect(isValid('9')).toBe(true);
    });
    test("'a' → false", () => {
      expect(isValid('a')).toBe(false);
    });
    test("'10' → false", () => {
      expect(isValid('10')).toBe(false);
    });
  });

  describe('hex (base = 16)', () => {
    const isValid = createDigitValidator(16); // каррирование 1 параметр определен
    test("'0' → true", () => {
      expect(isValid('0')).toBe(true);
    });
    test("'9' → true", () => {
      expect(isValid('9')).toBe(true);
    });
    test("'a' → true", () => {
      expect(isValid('a')).toBe(true);
    });
    test("'f' → true", () => {
      expect(isValid('f')).toBe(true);
    });
    test("'A' → true", () => {
      expect(isValid('A')).toBe(true);
    });
    test("'F' → true", () => {
      expect(isValid('F')).toBe(true);
    });
    test("'g' → false", () => {
      expect(isValid('g')).toBe(false);
    });
  });
});
