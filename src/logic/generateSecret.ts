export const generateSecret = (
  length: number,
  base: number,
  random: () => number = Math.random,
): string => {
  if (length > base) {
    throw new Error('length cannot exceed base because secret consists of unique digits');
  }
  const digits = '0123456789abcdef'.slice(0, base);
  const result: string[] = [];

  while (result.length < length) {
    const index = Math.floor(base * random());
    const digit = digits[index];
    if (!result.includes(digit)) {
      result.push(digit);
    }
  }
  return result.join('');
};
