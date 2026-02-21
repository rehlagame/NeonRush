// src/core/Renderer.js
import { CONFIG } from '../config/constants.js';

export class Renderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d', { alpha: false }); // تحسين الأداء بمنع الشفافية الكاملة للخلفية

        this.width = 0;
        this.height = 0;

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        // دعم الهواتف والشاشات ذات الدقة العالية (Retina Displays)
        const dpr = window.devicePixelRatio || 1;

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;

        // تعديل الـ Scale ليتناسب مع دقة الشاشة
        this.ctx.scale(dpr, dpr);

        // لجعل اللعبة متجاوبة في CSS
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
    }

    clear(color = '#050510') {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    // دالة مساعدة لرسم الأشكال المشعة (النيون)
    drawNeonRect(x, y, w, h, color, blur = 15) {
        this.ctx.save();
        this.ctx.shadowBlur = blur;
        this.ctx.shadowColor = color;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
        this.ctx.restore();
    }
}