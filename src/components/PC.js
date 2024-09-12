class PC {
    constructor(moves) {
        this.moves = moves;
    }

    generateMove() {
        return this.moves[Math.floor(Math.random() * this.moves.length)];
    }
}

export default PC;
