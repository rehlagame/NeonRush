// src/entities/Player.js
import { CONFIG } from '../config/constants.js';

export class Player {
    constructor(x, size) {
        this.size = size;
        this.x = x;
        this.y = 0; // سيتم تحديدها بناءً على الأرض لاحقاً

        this.vy = 0; // السرعة العمودية (Velocity Y)
        this.jumps = 2; // عدد القفزات المسموحة (القفز المزدوج)
        this.isGrounded = false;
        this.rotation = 0; // زاوية الدوران أثناء القفز
    }

    jump() {
        if (this.jumps > 0) {
            // القفزة الأولى أقوى قليلاً من القفزة الثانية
            this.vy = (this.jumps === 2) ? CONFIG.JUMP_FORCE : CONFIG.DOUBLE_JUMP_FORCE;
            this.jumps--;
            this.isGrounded = false;
            console.log(`[Player] Jumped! Remaining jumps: ${this.jumps}`);
        }
    }

    update(dt, groundY) {
        // 1. تطبيق الجاذبية على السرعة العمودية
        this.vy += CONFIG.GRAVITY * dt;

        // 2. تحديث موقع اللاعب بناءً على السرعة
        this.y += this.vy * dt;

        // 3. التحقق من الاصطدام بالأرض
        // إذا كان أسفل اللاعب (y + size) أكبر من أو يساوي مستوى الأرض
        if (this.y + this.size >= groundY) {
            this.y = groundY - this.size; // تثبيت اللاعب فوق الأرض تماماً
            this.vy = 0; // تصفير سرعة السقوط
            this.isGrounded = true;
            this.jumps = 2; // إعادة شحن القفزات المزدوجة

            // تسوية الدوران ليعود المربع لوضعه المستقيم عند الهبوط
            this.rotation = Math.round(this.rotation / 90) * 90;
        } else {
            this.isGrounded = false;
            // دوران مستمر وسريع في الهواء
            this.rotation += 360 * dt;
        }
    }

    draw(renderer, theme) {
        const ctx = renderer.ctx;

        ctx.save();
        // نقل نقطة ارتكاز الرسم إلى مركز اللاعب لكي يدور حول نفسه وليس حول زاويته
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
        ctx.rotate((this.rotation * Math.PI) / 180);

        // رسم توهج اللاعب الخارجي (اللون الأساسي)
        renderer.drawNeonRect(
            -this.size / 2,
            -this.size / 2,
            this.size,
            this.size,
            theme.main,
            20 // قوة توهج النيون
        );

        // رسم القلب الداخلي الساطع (أبيض) ليعطي إحساساً بالطاقة
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-this.size / 4, -this.size / 4, this.size / 2, this.size / 2);

        ctx.restore();
    }
}