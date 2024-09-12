class Rules {
    getResult(userIndex, computerIndex, numMoves) {
        const winThreshold = Math.floor(numMoves / 2);
        const result = (userIndex - computerIndex + numMoves) % numMoves;

        if (result === 0) return 'Draw';
        if (result <= winThreshold) return 'Win';
        return 'Lose';
    }
}

export default Rules;
