import { describe, test, expect } from 'vitest';
import { generateSecret } from './generateSecret';
import { createDigitValidator } from './createDigitValidator';

describe('generateSecrets', () => {
  test('returns string of given length', () => {
    const seq = [0.0, 0.1, 0.2];
    let i = 0;
    const random = () => seq[i++];
    expect(generateSecret(3, 10, random)).toHaveLength(3);
  });
  test('returns unique digits', () => {
    const seq = [0.0, 0.1, 0.2];
    let i = 0;
    const random = () => seq[i++];
    const secret = generateSecret(3, 10, random);
    expect(new Set(secret).size).toBe(secret.length);
  });
  test('all digits valid for base', () => {
    const isValidDigit = createDigitValidator(10);
    const seq = [0.0, 0.1, 0.2];
    let i = 0;
    const random = () => seq[i++];
    const secret = generateSecret(3, 10, random);
    expect([...secret].every(isValidDigit)).toBe(true);
  });
  test('deterministic with same random', () => {
    const random = (seq: number[]): (() => number) => {
      let i = 0;
      return () => {
        return seq[i++] ?? 0;
      };
    };
    const a = generateSecret(3, 10, random([0.1, 0.2, 0.0]));
    const b = generateSecret(3, 10, random([0.1, 0.2, 0.0]));
    expect(a).toBe(b);
  });
  test('preserves leading zero (string, not number)', () => {
    const seq = [0.0, 0.5];
    let i = 0;
    const random = () => seq[i++];
    expect(generateSecret(2, 10, random)).toEqual('05');
  });
});
