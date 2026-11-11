export const evaluateGuess = (secret: string, guess: string): { bulls: number; cows: number } => {
  const s = secret.toLowerCase();
  const g = guess.toLowerCase();

  const bulls = [...s].filter((element, index) => {
    if (element === g[index]) {
      return true;
    } else {
      return false;
    }
  });
  const cows = [...g].filter((element, index) => {
    if (element !== s[index] && s.includes(element)) {
      return true;
    } else {
      return false;
    }
  });

  const bullsLength = bulls.length;
  const cowsLength = cows.length;

  return { bulls: bullsLength, cows: cowsLength };
};
