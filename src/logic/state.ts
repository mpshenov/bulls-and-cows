export type Attempt = {
  guess: string;
  bulls: number;
  cows: number;
};

export type GameState = {
  secret: string;
  length: number;
  base: number;
  history: Attempt[];
  status: 'playing' | 'won';
  startedAt: number;
};

export const createInitialState = (
  length: number,
  base: number,
  secret: string,
  startedAt: number,
): GameState => {
  return {
    secret,
    length,
    base,
    history: [],
    status: 'playing',
    startedAt,
  };
};

export const addAttempt = (
  state: GameState,
  guess: string,
  result: { bulls: number; cows: number },
) => {
  const attempt = { guess, bulls: result.bulls, cows: result.cows };
  let newStatus: 'playing' | 'won';
  if (result.bulls === state.length) {
    newStatus = 'won';
  } else {
    newStatus = state.status;
  }
  return { ...state, history: [...state.history, attempt], status: newStatus };
};

export const isWon = (state: GameState) => {
  if (state.status === 'won') {
    return true;
  } else {
    return false;
  }
};
