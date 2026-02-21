// src/systems/Storage.js

export class Storage {
    constructor() {
        this.highScore = parseInt(localStorage.getItem('nr_highscore')) || 0;
        this.totalCoins = parseInt(localStorage.getItem('nr_coins')) || 0;
    }

    saveHighScore(score) {
        if (score > this.highScore) {
            this.highScore = score;
            localStorage.setItem('nr_highscore', this.highScore);
            return true; // نعم، تحقق رقم قياسي جديد
        }
        return false;
    }

    addCoins(amount) {
        this.totalCoins += amount;
        localStorage.setItem('nr_coins', this.totalCoins);
    }

    getHighScore() { return this.highScore; }
    getCoins() { return this.totalCoins; }
}