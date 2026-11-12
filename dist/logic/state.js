export const createInitialState = (length, base, secret, startedAt) => {
    return {
        secret,
        length,
        base,
        history: [],
        status: 'playing',
        startedAt,
    };
};
export const addAttempt = (state, guess, result) => {
    const attempt = { guess, bulls: result.bulls, cows: result.cows };
    let newStatus;
    if (result.bulls === state.length) {
        newStatus = 'won';
    }
    else {
        newStatus = state.status;
    }
    return { ...state, history: [...state.history, attempt], status: newStatus };
};
export const isWon = (state) => {
    if (state.status === 'won') {
        return true;
    }
    else {
        return false;
    }
};
