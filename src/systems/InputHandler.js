// src/systems/InputHandler.js

init() {
    // 1. دعم الحواسيب
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
            this.triggerJump();
        }
    });
    window.addEventListener('mousedown', (e) => {
        // تجاهل النقر إذا كان على زر (لتجنب القفز عند ضغط زر البداية)
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
        this.triggerJump();
    });

    // 2. دعم الهواتف (اللمس) - التعديل الحاسم هنا 👇
    window.addEventListener('touchstart', (e) => {
        // تحقق: هل العنصر الذي تم لمسه هو "زر" أو "داخل زر"؟
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            return; // اخرج فوراً واترك الزر يعمل بشكل طبيعي
        }

        // إذا لم يكن زراً، امنع التمرير ونفذ القفزة
        if (e.cancelable) e.preventDefault();
        this.triggerJump();
    }, { passive: false });
}