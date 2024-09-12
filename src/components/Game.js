import Rules from "./Rules.js";

class Game {
    #moves; // prevent modification

    constructor(moves) {
        this.#moves = moves;
    }

    // protect moves from direct modification returning a copy
    get moves() {
        return [...this.#moves]; 
    }

}

export default Game;
