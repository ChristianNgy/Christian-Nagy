const month1 = document.getElementById('number1') as HTMLInputElement;
const month2 = document.getElementById('number2') as HTMLInputElement;
const month3 = document.getElementById('number3') as HTMLInputElement;
const month4 = document.getElementById('number4') as HTMLInputElement;
const month5 = document.getElementById('number5') as HTMLInputElement;
const month6 = document.getElementById('number6') as HTMLInputElement;
const month7 = document.getElementById('number7') as HTMLInputElement;
const month8 = document.getElementById('number8') as HTMLInputElement;
const month9 = document.getElementById('number9') as HTMLInputElement;
const month10 = document.getElementById('number10') as HTMLInputElement;
const month11 = document.getElementById('number11') as HTMLInputElement;
const month12 = document.getElementById('number12') as HTMLInputElement;
const diagrammButton = document.getElementById('generate') as HTMLButtonElement;
const svg = document.getElementById('svg') as unknown as SVGSVGElement;

let monthHeight: number[] = [];

diagrammButton.addEventListener('click', () => {
    monthHeight.push(parseInt(month1.value) *  600 / 13);
    monthHeight.push(parseInt(month2.value) *  600 / 13);
    monthHeight.push(parseInt(month3.value) *  600 / 13);
    monthHeight.push(parseInt(month4.value) *  600 / 13);
    monthHeight.push(parseInt(month5.value) *  600 / 13);
    monthHeight.push(parseInt(month6.value) *  600 / 13);
    monthHeight.push(parseInt(month7.value) *  600 / 13);
    monthHeight.push(parseInt(month8.value) *  600 / 13);
    monthHeight.push(parseInt(month9.value) *  600 / 13);
    monthHeight.push(parseInt(month10.value) *  600 / 13);
    monthHeight.push(parseInt(month11.value) *  600 / 13);
    monthHeight.push(parseInt(month12.value) *  600 / 13);
    
    for (let i = 1; i <= 12; i++) {
    if(`${monthHeight[i - 1]}` === ''){
        monthHeight[i - 1] = 0
    }
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect') as SVGRectElement;
    rect.setAttribute('fill', 'blue');
    rect.setAttribute('x', `${1 * i * 100}`);
    rect.setAttribute('y', `${550}`);
    rect.setAttribute('width', `${90}`);
    rect.setAttribute('height', `${monthHeight[i - 1]}`);
    svg.appendChild(rect);
    console.log(rect)
}
});