// src/main.js
import { Game } from './core/Game.js';
import { STATES } from './core/StateManager.js';

window.addEventListener('load', () => {
    setTimeout(() => {
        const game = new Game();
        game.ui.showScreen(STATES.MENU); // إظهار القائمة بدلاً من بدء اللعبة
        game.isRunning = true;
        requestAnimationFrame((t) => game.loop(t));
    }, 500);
});