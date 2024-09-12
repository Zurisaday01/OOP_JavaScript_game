import readline from 'readline';

// More info: https://nodejs.org/en/learn/command-line/accept-input-from-the-command-line-in-nodejs
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const getUserInput = (prompt) =>{
    // use a promise to avoid callback hell
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
}

// the the arguments must not be duplicate
export const areAnyDuplicate = (moves) => {
    const movesSet = new Set();

    for (let move of moves){
        if(movesSet.has(move)) return true;

        movesSet.add(move);
    }

    return false;
}

// it accepts an odd number ≥ 3 non-repeating strings
export const areValidMoveArguments = (moves) => {
    return moves.length >= 3 && moves.length % 2 === 1;
}


