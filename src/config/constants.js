// src/config/constants.js

export const CONFIG = {
    // إعدادات الفيزياء والسرعة (تم تعديلها لتكون أبطأ وأمتع)
    BASE_SPEED: 280,        // كانت 400 (الآن أبطأ بـ 30% لبداية هادئة)
    MAX_SPEED: 850,         // كانت 1000 (لضمان عدم وصول اللعبة لسرعة مستحيلة)
    ACCELERATION: 6,        // كانت 10 (زيادة السرعة ستكون ألطف وأبطأ)

    GRAVITY: 2800,
    JUMP_FORCE: -950,
    DOUBLE_JUMP_FORCE: -800,

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