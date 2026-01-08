import './styles.css'

import {Animal, Cat, Dog } from './animal'

document.getElementById('dog')!.addEventListener('click', () => {
    new Dog('wuff')
});

document.getElementById('cat')!.addEventListener('click', () => {
    new Cat('miau')
});

document.getElementById('speak')!.addEventListener('click', () => {
    this.box.appendChild(this.texts)
});