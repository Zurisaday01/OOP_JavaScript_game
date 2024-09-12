import chalk from 'chalk'; // Add color to the console output
import Game from '../components/Game.js';
import PC from '../components/PC.js';
import { getUserInput } from '../utils/helpers.js';
import Menu from '../components/Menu.js';
import Rules from '../components/Rules.js';
import KeyManager from '../components/KeyManager.js';

class GameController {
    #game;
    #pc;
    #keyManager;
    #rules;
    #computerMove;
    #hmac;

    constructor(moves) {
        this.#game = new Game(moves);
        this.#pc = new PC(moves);
        this.#keyManager = new KeyManager(); 
        this.#rules = new Rules();      
        this.#computerMove = null;
        this.#hmac = null;
        this.roundNum = 1;
    }

    async start() {
        while (true) {
            // 1. generate a key 
            this.#keyManager.generateKey();
            // 2. make a computer move
            this.#computerMove = this.#pc.generateMove();
            // 3. calculate HMAC 
            this.#hmac = this.#keyManager.getHMAC(this.#computerMove);
            // 4. show HMAC
            console.log(chalk.bgWhite(`\n--------------------------------- Round ${this.roundNum} ----------------------------------------------`))
            console.log(chalk.magenta(`\nHMAC: ${this.#hmac}`));

            // display the menu
            Menu.displayMenu(this.#game.moves);
            // 5. get the user move
            const userMove = await this.#getUserMove();
            // use the selectOption method from Menu to process the input
            const option = await Menu.selectOption(userMove, this.#game.moves);
            // return to menu
            if (option === 'help') {
                continue; 
            }
            // start round
            this.#playRound(this.#game.moves[option - 1]);
        }
    }

    async #getUserMove() {
        let validInput = false;
        // store the user input
        let input;
        const numberOfMoves = this.#game.moves.length; 

        // keep asking for input until it is valid
        while (!validInput) {
            input = await getUserInput(`\nEnter your move (from number 1 to ${numberOfMoves}): `);

            if (input === '0' || input === '?') return input;

            // Convert input to a number and check if it is within the valid range
            const moveNumber = parseInt(input, 10);
            if (!isNaN(moveNumber) && moveNumber >= 1 && moveNumber <= numberOfMoves) {
                validInput = true;
            } else {
                console.log(chalk.red(`🛑 Invalid input. Please enter a number between 1 and ${numberOfMoves}.`));
            }
        }

        return input + '\n';
    }

    #playRound(userMove) {
        // Now reveal the computer move and the secret key after the user has made their move
        console.log(`Your move: ${userMove}`);
        console.log(`Computer move: ${this.#computerMove}`);

        const result = this.#rules.getResult(
            this.#game.moves.indexOf(userMove),
            this.#game.moves.indexOf(this.#computerMove),
            this.#game.moves.length
        );
        console.log(chalk.cyan(`You ${result}!`));

        // 6. show original key
        console.log(chalk.magenta(`HMAC key: ${this.#keyManager.secretKey}`)); 
        console.log(chalk.bgWhite('\n----------------------------------------------------------------------------------------'));

        // reset the computer move and HMAC for the next round
        this.#computerMove = null;
        this.#hmac = null;

        // next rount
        this.roundNum++;
    }

}

export default GameController;
