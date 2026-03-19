import './index.css';
import { Train, TrainPart } from './train';

const PART_OPTIONS = [
    { label: 'Add locomotive (2400 kW)', value: 'locomotive' },
    { label: 'Add passenger wagon (48 seats)', value: 'passenger' },
    { label: 'Add cargo wagon (35 t)', value: 'cargo' },
    { label: 'Add dining wagon (8 tables)', value: 'dining' },
    { label: 'Add caboose (2 crew)', value: 'caboose' }
];
const train = new Train()
buildPartGrid('partGrid');
document.getElementById('undoBtn')!.addEventListener('click', () => console.log('Undo'));

function buildPartGrid(parentId: string): void {
    const grid = document.getElementById(parentId)!;

    for (const option of PART_OPTIONS) {
        const button = document.createElement('button');
        button.textContent = option.label;
        button.addEventListener('click', () => {train.addPart(option.value)});
        grid.appendChild(button);
    }
}
