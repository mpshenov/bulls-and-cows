export const countPossibleSecrets = (() => {
    const cache = new Map(); // cache created
    const calc = (length, base) => {
        const key = `${length},${base}`;
        if (cache.has(key)) {
            return cache.get(key);
        }
        let result;
        if (length === 0) {
            result = 1;
        }
        else if (length > base) {
            result = 0;
        }
        else {
            result = base * calc(length - 1, base - 1);
        }
        cache.set(key, result);
        return result;
    };
    return calc;
})();
