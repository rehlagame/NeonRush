// src/systems/Physics.js

export class Physics {
    // التحقق من التصادم بين مربعين مع نسبة تسامح (Padding)
    static checkCollision(player, obstacle, paddingRatio = 0.2) {
        // paddingRatio = 0.2 تعني أننا سنقلص صندوق التصادم بنسبة 20% من الحجم الحقيقي

        const pShrink = player.size * paddingRatio;
        const px = player.x + pShrink;
        const py = player.y + pShrink;
        const pw = player.size - (pShrink * 2);
        const ph = player.size - (pShrink * 2);

        const oShrink = obstacle.width * paddingRatio;
        const ox = obstacle.x + oShrink;
        const oy = obstacle.y + oShrink;
        const ow = obstacle.width - (oShrink * 2);
        const oh = obstacle.height - (oShrink * 2);

        // خوارزمية AABB للتصادم ثنائي الأبعاد
        return (
            px < ox + ow &&
            px + pw > ox &&
            py < oy + oh &&
            py + ph > oy
        );
    }
}