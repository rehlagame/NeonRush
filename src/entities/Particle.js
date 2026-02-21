// src/entities/Particle.js

export class Particle {
    constructor(x, y, color, speedMultiplier = 1) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.color = color;

        // سرعة عشوائية في جميع الاتجاهات (انفجار)
        this.vx = (Math.random() - 0.5) * 400 * speedMultiplier;
        this.vy = (Math.random() - 0.5) * 400 * speedMultiplier;

        this.life = 1.0; // عمر الجسيم (من 1 إلى 0)
        this.decay = Math.random() * 1.5 + 1.5; // سرعة اختفاء الجسيم
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.life -= this.decay * dt;
    }

    draw(renderer) {
        if (this.life <= 0) return;
        const ctx = renderer.ctx;
        ctx.save();
        ctx.globalAlpha = this.life;
        renderer.drawNeonRect(this.x, this.y, this.size, this.size, this.color, 10);
        ctx.restore();
    }
}