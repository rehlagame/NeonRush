// src/config/constants.js

export const CONFIG = {
    // إعدادات السرعة (تم الخفض بشكل كبير لتجربة سلسة)
    BASE_SPEED: 180,        // كانت 280 (البداية الآن بطيئة جداً ومريحة)
    MAX_SPEED: 700,         // كانت 850 (السرعة القصوى أصبحت منطقية أكثر)
    ACCELERATION: 3,        // كانت 6 (زيادة الصعوبة ستكون بطيئة جداً وغير محسوسة)

    // تعديل الجاذبية والقفز (لجعل الحركة متناغمة مع السرعة البطيئة)
    GRAVITY: 2200,          // كانت 2800 (اللاعب سيسقط بنعومة أكثر)
    JUMP_FORCE: -820,       // كانت -950 (قفزة متوازنة مع الجاذبية الجديدة)
    DOUBLE_JUMP_FORCE: -700,// كانت -800

    GROUND_HEIGHT_RATIO: 0.15,
    PLAYER_SIZE_RATIO: 0.08,
    MAX_PLAYER_SIZE: 60,

    THEMES: [
        { name: 'Cyan', main: '#00f3ff', bg: '#050510' },
        { name: 'Magenta', main: '#bc13fe', bg: '#100510' },
        { name: 'Gold', main: '#ffe600', bg: '#101005' },
        { name: 'Toxic', main: '#00ff88', bg: '#051005' }
    ]
};