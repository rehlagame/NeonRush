// src/ui/UIManager.js
import { STATES } from '../core/StateManager.js';

export class UIManager {
    constructor(game) {
        this.game = game;

        this.hud = document.getElementById('hud');
        this.scoreEl = document.getElementById('scoreValue');
        this.coinsEl = document.getElementById('coinsValue');

        this.screens = {
            [STATES.LOADING]: document.getElementById('loading-screen'),
            [STATES.MENU]: document.getElementById('menu-screen'),
            [STATES.GAMEOVER]: document.getElementById('game-over-screen')
        };

        // ربط الأزرار
        document.getElementById('start-btn').addEventListener('click', () => this.game.start());
        document.getElementById('restart-btn').addEventListener('click', () => this.game.start());
    }

    updateHUD(score, coins) {
        this.scoreEl.innerText = score;
        this.coinsEl.innerText = coins;
    }

    showScreen(state) {
        // إخفاء جميع الشاشات
        Object.values(this.screens).forEach(screen => {
            if(screen) screen.classList.remove('active');
        });

        // إظهار الشاشة المطلوبة
        if (this.screens[state]) {
            this.screens[state].classList.add('active');
        }

        // إظهار/إخفاء العدادات (HUD) أثناء اللعب فقط
        if (state === STATES.PLAYING) {
            this.hud.classList.remove('hidden');
        } else {
            this.hud.classList.add('hidden');
        }

        // قمنا بحذف كود تحديث GAMEOVER من هنا لأنه موجود في الدالة المخصصة بالأسفل 👇
    }

    updateGameOverScreen(score, coins, highScore, isNewRecord) {
        document.getElementById('finalScore').innerText = score;
        document.getElementById('finalCoins').innerText = coins;

        // منطق الرقم القياسي الجديد
        const title = document.querySelector('#game-over-screen h1');

        if (isNewRecord) {
            title.innerText = "رقم قياسي جديد! 🏆";
            title.classList.add('blink'); // تأثير وميض
            title.style.color = "#ffe600"; // لون ذهبي
        } else {
            title.innerText = "تم التهكير!";
            title.classList.remove('blink');
            title.style.color = "#ff0055"; // لون أحمر
        }

        // يمكنك طباعة الرقم القياسي للتأكد
        console.log(`Game Over. Score: ${score}, HighScore: ${highScore}`);
    }
}