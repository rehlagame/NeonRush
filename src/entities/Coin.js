// src/entities/Coin.js
import { Physics } from '../systems/Physics.js';

export class Coin {
    constructor(startX, groundY, playerSize) {
        this.x = startX;
        this.size = playerSize * 0.4; // العملة أصغر من اللاعب

        // ارتفاع أساسي عشوائي (أرضي أو طائر)
        this.baseY = groundY - (Math.random() * playerSize * 2) - this.size;
        this.y = this.baseY;

        this.angle = Math.random() * Math.PI * 2; // زاوية التموج
        this.color = '#ffe600'; // لون ذهبي نيون
        this.collected = false;
    }

    update(dt, speed) {
        this.x -= speed * dt;
        this.angle += 5 * dt; // سرعة التموج

        // حركة تموجية للأعلى والأسفل بمقدار 15 بكسل
        this.y = this.baseY + Math.sin(this.angle) * 15;
    }

    draw(renderer) {
        if (this.collected) return;
        const ctx = renderer.ctx;
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;

        // رسم العملة كمعين (Rhombus) ليعطي طابعاً مستقبلياً
        ctx.translate(this.x + this.size/2, this.y + this.size/2);
        ctx.rotate(45 * Math.PI / 180);
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        ctx.restore();
    }
}