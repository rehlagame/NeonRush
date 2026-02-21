// src/core/Game.js
import { StateManager, STATES } from './StateManager.js';
import { Renderer } from './Renderer.js';
import { InputHandler } from '../systems/InputHandler.js';
import { AudioSystem } from '../systems/AudioSystem.js'; // جديد
import { Storage } from '../systems/Storage.js';         // جديد
import { Physics } from '../systems/Physics.js';
import { UIManager } from '../ui/UIManager.js';
import { Player } from '../entities/Player.js';
import { Obstacle } from '../entities/Obstacle.js';
import { Coin } from '../entities/Coin.js';
import { Particle } from '../entities/Particle.js';
import { CONFIG } from '../config/constants.js';

export class Game {
    constructor() {
        this.renderer = new Renderer('gameCanvas');
        this.stateManager = new StateManager();
        this.input = new InputHandler();
        this.audio = new AudioSystem(); // تشغيل الصوت
        this.storage = new Storage();   // تشغيل الحفظ
        this.ui = new UIManager(this);

        this.lastTime = 0;
        this.isRunning = false;

        this.currentThemeIndex = 0;
        this.currentTheme = CONFIG.THEMES[this.currentThemeIndex];

        // التعريفات لتجنب الأخطاء
        this.obstacles = [];
        this.coins = [];
        this.particles = [];
        this.distance = 0;
        this.score = 0;
        this.coinsCollected = 0;
        this.groundY = this.renderer.height * (1 - CONFIG.GROUND_HEIGHT_RATIO);

        this.initEntities();
    }

    initEntities() {
        const rawSize = this.renderer.width * CONFIG.PLAYER_SIZE_RATIO;
        this.playerSize = Math.min(rawSize, CONFIG.MAX_PLAYER_SIZE);
        const playerX = this.renderer.width * 0.15;
        this.player = new Player(playerX, this.playerSize);
    }

    start() {
        // تفعيل الصوت عند أول تفاعل (مهم للمتصفحات)
        this.audio.resume();
        this.audio.playMusic(); // 🎵 تشغيل الموسيقى هنا


        this.speed = CONFIG.BASE_SPEED;
        this.distance = 0;
        this.score = 0;
        this.coinsCollected = 0;

        this.obstacles = [];
        this.coins = [];
        this.particles = [];

        this.obstacleTimer = 2;
        this.coinTimer = 1;

        this.player.y = this.renderer.height * (1 - CONFIG.GROUND_HEIGHT_RATIO) - this.playerSize;
        this.player.vy = 0;

        this.currentThemeIndex = 0;
        this.currentTheme = CONFIG.THEMES[this.currentThemeIndex];

        this.stateManager.setState(STATES.PLAYING);
        this.ui.showScreen(STATES.PLAYING);
        this.ui.updateHUD(this.score, this.coinsCollected);

        if (!this.isRunning) {
            this.isRunning = true;
            requestAnimationFrame((timestamp) => this.loop(timestamp));
        }
    }

    loop(timestamp) {
        if (!this.isRunning) return;
        let dt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        if (dt > 0.1) dt = 0.1;

        if (this.stateManager.is(STATES.PLAYING)) {
            this.update(dt);
        }

        this.draw(); // الرسم دائماً
        requestAnimationFrame((t) => this.loop(t));
    }

    update(dt) {
        this.groundY = this.renderer.height * (1 - CONFIG.GROUND_HEIGHT_RATIO);

        if (this.speed < CONFIG.MAX_SPEED) {
            this.speed += CONFIG.ACCELERATION * dt;
        }
        this.distance += this.speed * dt;
        this.score = Math.floor(this.distance / 10);

        let calculatedTheme = Math.floor(this.score / 500) % CONFIG.THEMES.length;
        if (calculatedTheme !== this.currentThemeIndex) {
            this.currentThemeIndex = calculatedTheme;
            this.currentTheme = CONFIG.THEMES[this.currentThemeIndex];
        }

        if (this.input.pollJump()) {
            this.player.jump();
            this.audio.playJump(); // صوت القفز 🔊
            this.spawnParticles(this.player.x + this.playerSize/2, this.player.y + this.playerSize, '#ffffff', 5);
        }
        this.player.update(dt, this.groundY);

        this.handleObstacles(dt);
        this.handleCoins(dt);

        this.particles.forEach(p => p.update(dt));
        this.particles = this.particles.filter(p => p.life > 0);

        this.ui.updateHUD(this.score, this.coinsCollected);
    }

    handleObstacles(dt) {
        this.obstacleTimer -= dt;
        if (this.obstacleTimer <= 0) {
            const isFlying = Math.random() > 0.7;
            this.obstacles.push(new Obstacle(this.renderer.width, this.groundY, this.playerSize, isFlying));
            const safeGap = this.playerSize * (5 + Math.random() * 3);
            this.obstacleTimer = safeGap / this.speed;
        }

        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            let obs = this.obstacles[i];
            obs.update(dt, this.speed);

            if (Physics.checkCollision(this.player, obs)) {
                this.gameOver();
                return;
            }
            if (obs.x + obs.width < 0) this.obstacles.splice(i, 1);
        }
    }

    handleCoins(dt) {
        this.coinTimer -= dt;
        if (this.coinTimer <= 0) {
            this.coins.push(new Coin(this.renderer.width, this.groundY, this.playerSize));
            this.coinTimer = 1 + Math.random();
        }

        for (let i = this.coins.length - 1; i >= 0; i--) {
            let coin = this.coins[i];
            coin.update(dt, this.speed);

            if (Physics.checkCollision(this.player, {x: coin.x, y: coin.y, width: coin.size, height: coin.size}, 0)) {
                this.coinsCollected++;
                this.score += 20;
                this.audio.playCoin(); // صوت العملة 🔊
                this.spawnParticles(coin.x, coin.y, '#ffe600', 15);
                this.coins.splice(i, 1);
                continue;
            }
            if (coin.x + coin.size < 0) this.coins.splice(i, 1);
        }
    }

    spawnParticles(x, y, color, count, speed = 1) {
        for(let i=0; i<count; i++) {
            this.particles.push(new Particle(x, y, color, speed));
        }
    }

    gameOver() {
        this.audio.playCrash(); // صوت الانفجار 🔊

        // حفظ النتائج 💾
        const isNewRecord = this.storage.saveHighScore(this.score);
        this.storage.addCoins(this.coinsCollected);

        this.stateManager.setState(STATES.GAMEOVER);

        // تمرير البيانات لواجهة المستخدم
        this.ui.updateGameOverScreen(
            this.score,
            this.coinsCollected,
            this.storage.getHighScore(),
            isNewRecord
        );
        this.ui.showScreen(STATES.GAMEOVER);

        // اهتزاز الشاشة
        this.renderer.canvas.style.transform = "translate(10px, 10px)";
        setTimeout(() => this.renderer.canvas.style.transform = "translate(-10px, -10px)", 50);
        setTimeout(() => this.renderer.canvas.style.transform = "translate(0, 0)", 100);
    }

    draw() {
        this.renderer.clear(this.currentTheme.bg);

        const gridOffset = (this.distance * 0.5) % 50;
        const ctx = this.renderer.ctx;
        ctx.strokeStyle = "rgba(255,255,255,0.03)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for(let i = 0; i < this.renderer.width + 50; i += 50) {
            const x = i - gridOffset;
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.groundY);
        }
        ctx.stroke();

        this.renderer.drawNeonRect(0, this.groundY, this.renderer.width, 5, this.currentTheme.main, 15);

        this.coins.forEach(coin => coin.draw(this.renderer));
        this.obstacles.forEach(obs => obs.draw(this.renderer));

        if (this.stateManager.is(STATES.PLAYING) || this.stateManager.is(STATES.MENU)) {
            this.player.draw(this.renderer, this.currentTheme);
        }

        this.particles.forEach(p => p.draw(this.renderer));
    }
}