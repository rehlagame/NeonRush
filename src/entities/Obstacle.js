// src/entities/Obstacle.js

export class Obstacle {
    constructor(startX, groundY, playerSize, isFlying) {
        this.x = startX;

        // حجم العائق عشوائي قليلاً (بين 80% و 120% من حجم اللاعب)
        // لكي تبقى اللعبة متناسقة سواء على الهاتف أو الكمبيوتر
        this.width = playerSize * (0.8 + Math.random() * 0.4);
        this.height = this.width;

        this.isFlying = isFlying;

        // تحديد ارتفاع العائق
        if (isFlying) {
            // عائق طائر: يجبر اللاعب على المرور تحته أو القفز المزدوج فوقه
            this.y = groundY - this.height - (playerSize * 1.5);
        } else {
            // عائق أرضي عادي
            this.y = groundY - this.height;
        }

        this.passed = false; // سنستخدمها لاحقاً لزيادة السكور عندما يتخطاه اللاعب
        this.dangerColor = '#ff0055'; // لون أحمر نيون مميز للخطر
    }

    update(dt, gameSpeed) {
        // تحريك العائق لليسار بناءً على سرعة اللعبة
        this.x -= gameSpeed * dt;
    }

    draw(renderer) {
        // رسم العائق المربع
        renderer.drawNeonRect(
            this.x,
            this.y,
            this.width,
            this.height,
            this.dangerColor,
            15 // توهج أحمر مخيف
        );

        // رسم خطوط داخلية للعائق ليعطي طابعاً ميكانيكياً (Cyberpunk)
        const ctx = renderer.ctx;
        ctx.fillStyle = '#000'; // أسود داخلي
        ctx.fillRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10);
    }
}