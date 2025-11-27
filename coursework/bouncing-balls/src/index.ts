import './styles.css'

import { BouncingBallGame } from './game'

const game = new BouncingBallGame('box')

game.start();

document.getElementById('addGummy')!.addEventListener('click', () => {
    game.addGummyBall();
});

document.getElementById('addSteel')!.addEventListener('click', () => {
    game.addSteelBall();
});

document.getElementById('addLight')!.addEventListener('click', () => {
    game.addLightBall();
});

document.getElementById('egg')!.addEventListener('click', () => {
    game.addEgg();
});