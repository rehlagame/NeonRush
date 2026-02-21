// src/core/StateManager.js

export const STATES = {
    LOADING: 'LOADING',
    MENU: 'MENU',
    PLAYING: 'PLAYING',
    GAMEOVER: 'GAMEOVER',
    SHOP: 'SHOP'
};

export class StateManager {
    constructor() {
        this.currentState = STATES.LOADING;
    }

    setState(newState) {
        this.currentState = newState;
        console.log(`[State Changed]: ${newState}`);
        // هنا سنقوم بربط الواجهة (UI) لاحقاً لتتغير بتغير الحالة
    }

    is(state) {
        return this.currentState === state;
    }
}