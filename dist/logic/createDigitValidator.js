export const createDigitValidator = (base) => {
    const digits = '0123456789abcdef'.slice(0, base);
    return (char) => {
        if (char.length !== 1)
            return false;
        return digits.includes(char.toLowerCase());
    };
};
