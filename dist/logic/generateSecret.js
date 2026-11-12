export const generateSecret = (length, base, random = Math.random) => {
    if (length > base) {
        throw new Error('length cannot exceed base because secret consists of unique digits');
    }
    const digits = '0123456789abcdef'.slice(0, base);
    const result = [];
    while (result.length < length) {
        const index = Math.floor(base * random());
        const digit = digits[index];
        if (!result.includes(digit)) {
            result.push(digit);
        }
    }
    return result.join('');
};
