import chalk from 'chalk';
import { AsciiTable3 } from 'ascii-table3';
import Rules from './Rules.js';

class HelpTable {
    static #generateTable(moves) {
        // the copy is to apply the color
        let movesCopy = moves.map((m) => chalk.blue(m));
        const rules = new Rules();
        let table = new AsciiTable3().setHeading(`${chalk.yellow('User')} \\ ${chalk.blue('PC')}`, ...movesCopy).setStyle('unicode-single');

        // create a matrix for the rows of the table
        const rows = moves.map((pcMove, i) => {
            return [
                chalk.yellow(pcMove),
                ...moves.map((_, j) => {
                    const result = rules.getResult(i, j, moves.length);

                    if (result === 'Draw') {
                        return chalk.bgGray('Draw');
                    } else if (result === 'Win') {
                        return chalk.bgCyanBright('Win');
                    } else {
                        return chalk.bgRedBright('Lose');
                    }
                })
            ];
        });

        // add the matrix to the table
        table.addRowMatrix(rows);
        // Render the table
        console.log(table.setJustify(true).toString());
    }


    static displayTable(moves) {
        console.log('\n---------------------------------------------');
        console.log('-------------- ℹ️  Help Table 💡 -------------');
        console.log('---------------------------------------------');
        console.log("Here's a guide to see which moves win.\n")
        this.#generateTable(moves);
    }
}


export default HelpTable;
