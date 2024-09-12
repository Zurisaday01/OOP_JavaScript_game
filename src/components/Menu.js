import chalk from "chalk";
import { getUserInput } from '../utils/helpers.js';
import HelpTable from "../components/HelpTable.js";

class Menu {
    static displayMenu(moves) {
        console.log('\n---------------------------------------------');
        console.log('------------ 🎮 Available moves 🕹️ -----------');
        console.log('---------------------------------------------\n');
        // display moves with their number options
        moves.forEach((move, idx) => console.log(`${chalk.bgBlue.bold(idx + 1)} - ${chalk.blue(move)}`));
        console.log(`${chalk.bgGreen.bold('0')} - ${chalk.green('Exit')}`);
        console.log(`${chalk.bgYellow.bold('?')} - ${chalk.yellow('Help')}`);
    }

    static async selectOption(option, gameMoves) {
        if (option === '0') {
            console.log('👋 See you later...');
            console.log(chalk.green('\n😊 If you want to check the HMAC yourself, you can use the following online tool:'));
            console.log(chalk.green('https://www.devglan.com/online-tools/hmac-sha256-online'));
            console.log('\nIn the input field labeled "Enter Plain Text to Compute Hash", insert the "Computer move" from your round.');
            console.log('In the input field labeled "Enter the Secret Key", insert the "HMAC key" shown at the end of your round.');
            console.log('The generated "Hashed Output" should match the "HMAC" shown at the start of the round. This verifies that the computer did not cheat! 😎');
            process.exit();
        }

        if (option === '?') {
            HelpTable.displayTable(gameMoves);
            console.log('\nPress Enter to return to the main menu...');
            await getUserInput('');  // Wait for user to press Enter
            return 'help';
        }

        return option;
    }
}

export default Menu;