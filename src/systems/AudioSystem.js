// src/systems/AudioSystem.js

export class AudioSystem {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.isMuted = false;

        // إعداد مشغل الموسيقى الخلفية
        this.bgMusic = new Audio('/assets/audio/music.wav');
        this.bgMusic.loop = true; // تكرار لا نهائي
        this.bgMusic.volume = 0.4; // خفض الصوت قليلاً (40%) لكي تسمع المؤثرات بوضوح
    }

    // تفعيل الصوت (يجب أن يتم بعد تفاعل المستخدم)
    resume() {
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playMusic() {
        if (this.isMuted) return;
        // التأكد من أن الموسيقى لا تعمل مسبقاً
        if (this.bgMusic.paused) {
            this.bgMusic.play().catch(e => console.log("🔊 Interaction required to play music"));
        }
    }

    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0; // إعادة الموسيقى للبداية
    }

    playTone(freq, type, duration, vol = 0.1) {
        if (this.isMuted) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(vol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playJump() {
        this.playTone(400, 'square', 0.1, 0.05);
        setTimeout(() => this.playTone(600, 'square', 0.1, 0.05), 50);
    }

    playCoin() {
        this.playTone(1200, 'sine', 0.1, 0.1);
        setTimeout(() => this.playTone(2000, 'sine', 0.2, 0.05), 50);
    }

    playCrash() {
        this.playTone(100, 'sawtooth', 0.3, 0.2);
        this.playTone(50, 'square', 0.4, 0.2);
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.bgMusic.pause();
        } else {
            this.bgMusic.play();
        }
        return this.isMuted;
    }
}