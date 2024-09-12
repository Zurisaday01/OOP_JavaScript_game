import chalk from 'chalk'; // Add color to the console output
import GameController from './controllers/GameController.js';
import { areValidMoveArguments, areAnyDuplicate } from './utils/helpers.js';

// set user input
const args = process.argv.slice(2);

// validate the arguments
if (areAnyDuplicate(args) || !areValidMoveArguments(args)) {
    if (areAnyDuplicate(args)) console.error(chalk.red('🛑 The moves must be non-repetitive strings. For example, "Rock Paper Lizard"❗'));

    if (!areValidMoveArguments(args)) console.error(chalk.red('🛑 The number of moves must be an odd number greater or equal to 3 (3, 5, 7, 9, 11, 13...)❗'));

    process.exit(1); 
}

const gameController = new GameController(args);

// start the game
gameController.start();
