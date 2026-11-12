export const countPossibleSecrets = (() => {
  const cache = new Map<string, number>(); // cache created
  const calc = (length: number, base: number): number => {
    const key = `${length},${base}`;
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    let result: number;
    if (length === 0) {
      result = 1;
    } else if (length > base) {
      result = 0;
    } else {
      result = base * calc(length - 1, base - 1);
    }
    cache.set(key, result);
    return result;
  };
  return calc;
})();
