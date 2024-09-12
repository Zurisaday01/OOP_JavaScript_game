import { randomBytes, createHmac } from 'crypto';

class KeyManager {
    #secretKey;

    // Reset the secret key for a new round
    generateKey() {
        this.#secretKey = randomBytes(32).toString('hex');
    }

    getHMAC(message) {
        const hmac = createHmac('sha256', this.#secretKey);
        hmac.update(message);
        return hmac.digest('hex');
    }
    // getter for the secret key, so it can be displayed to the user
    get secretKey() {
        return this.#secretKey;
    }
}

export default KeyManager;
