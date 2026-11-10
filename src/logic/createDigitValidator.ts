export const createDigitValidator = (base: number) => {
  const digits = '0123456789abcdef'.slice(0, base);
  return (char: string): boolean => {
    if (char.length !== 1) return false;
    return digits.includes(char.toLowerCase());
  };
};
