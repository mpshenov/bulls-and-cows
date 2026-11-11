import { countPossibleSecrets } from './countPossibleSecrets';
import { describe, test, expect } from 'vitest';

describe('countPossibleSecrets', () => {
  describe('basic', () => {
    test('length === 0 → 1', () => {
      expect(countPossibleSecrets(0, 10)).toBe(1);
    });
    test('length > base → 0', () => {
      expect(countPossibleSecrets(10, 2)).toBe(0);
    });
    test('length === base', () => {
      expect(countPossibleSecrets(2, 2)).toBe(2);
    });
  });
  describe('regular', () => {
    test('countPossibleSecrets(1, 10) → 10', () => {
      expect(countPossibleSecrets(1, 10)).toBe(10);
    });
    test('countPossibleSecrets(2, 10) → 90', () => {
      expect(countPossibleSecrets(2, 10)).toBe(90);
    });
    test('countPossibleSecrets(4, 10) → 5040', () => {
      expect(countPossibleSecrets(4, 10)).toBe(5040);
    });
    test('countPossibleSecrets(2, 2) → 2', () => {
      expect(countPossibleSecrets(2, 2)).toBe(2);
    });
    test('countPossibleSecrets(4, 16) → 43680', () => {
      expect(countPossibleSecrets(4, 16)).toBe(43680);
    });
  });
});
