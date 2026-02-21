// src/systems/InputHandler.js

export class InputHandler {
    constructor() {
        this.jumpRequested = false;
        this.init();
    }

    init() {
        // 1. دعم الحواسيب (كيبورد)
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                this.triggerJump();
            }
        });

        // 2. استخدام pointerdown لتوحيد اللمس والماوس بذكاء
        window.addEventListener('pointerdown', (e) => {
            // تحقق: هل النقر على زر؟ إذا نعم، لا تقفز
            if (e.target.closest('button') || e.target.tagName === 'BUTTON') {
                return;
            }

            // إذا لم يكن زراً، نفذ القفزة
            this.triggerJump();
        }, { passive: true });
    }

    triggerJump() {
        this.jumpRequested = true;
    }

    pollJump() {
        if (this.jumpRequested) {
            this.jumpRequested = false;
            return true;
        }
        return false;
    }
}