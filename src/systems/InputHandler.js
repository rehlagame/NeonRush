// src/systems/InputHandler.js

export class InputHandler {
    constructor() {
        this.jumpRequested = false;
        this.init();
    }

    init() {
        // 1. دعم الحواسيب (الكيبورد والماوس)
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                this.triggerJump();
            }
        });
        window.addEventListener('mousedown', () => this.triggerJump());

        // 2. دعم الهواتف (اللمس)
        // نستخدم { passive: false } لمنع المتصفح من القيام بحركات افتراضية (مثل التكبير)
        window.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.triggerJump();
        }, { passive: false });
    }

    triggerJump() {
        this.jumpRequested = true;
    }

    // هذه الدالة سيستدعيها محرك اللعبة، وإذا كان هناك قفزة سيعيد true ثم يمسح الطلب
    pollJump() {
        if (this.jumpRequested) {
            this.jumpRequested = false;
            return true;
        }
        return false;
    }
}