import { createDigitValidator } from './createDigitValidator.js';
export const isValidGuess = (guess, length, base) => {
    const isValidDigit = createDigitValidator(base);
    const everyDigitValid = [...guess].every(isValidDigit);
    const isValidLength = guess.length === length;
    const setOfGuess = [...new Set(guess.toLocaleLowerCase())];
    const hasNoRepeatedDigits = setOfGuess.length === guess.length;
    return everyDigitValid && isValidLength && hasNoRepeatedDigits;
};
