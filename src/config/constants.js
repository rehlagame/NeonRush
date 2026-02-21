// src/config/constants.js

export const CONFIG = {
    // إعدادات الفيزياء والسرعة
    BASE_SPEED: 400,        // السرعة الابتدائية
    MAX_SPEED: 1000,        // السرعة القصوى
    ACCELERATION: 10,       // معدل زيادة السرعة كل ثانية
    GRAVITY: 2800,          // قوة الجاذبية (رقم كبير لضمان سقوط سريع ومحكم)
    JUMP_FORCE: -950,       // قوة القفزة الأولى (بالسالب لأن Y للأعلى)
    DOUBLE_JUMP_FORCE: -800,// قوة القفزة الثانية

    // أبعاد نسبية
    GROUND_HEIGHT_RATIO: 0.15, // الأرض تأخذ 15% من الشاشة من الأسفل
    PLAYER_SIZE_RATIO: 0.08,   // حجم اللاعب 8% من عرض الشاشة (ليتناسب مع أي هاتف)
    MAX_PLAYER_SIZE: 60,       // أقصى حجم للاعب على شاشات التابلت/الحاسوب

    // الثيمات والألوان (Neon Cyberpunk)
    THEMES: [
        { name: 'Cyan', main: '#00f3ff', bg: '#050510' },
        { name: 'Magenta', main: '#bc13fe', bg: '#100510' },
        { name: 'Gold', main: '#ffe600', bg: '#101005' },
        { name: 'Toxic', main: '#00ff88', bg: '#051005' }
    ]
};