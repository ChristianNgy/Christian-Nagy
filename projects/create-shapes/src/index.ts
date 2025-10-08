const spalten = document.getElementById('spalten') as HTMLInputElement
const zeilen = document.getElementById('zeilen') as HTMLInputElement
const generator = document.getElementById('generator') as HTMLButtonElement
const svg = document.getElementById('svg') as unknown as SVGSVGElement
const select = document.getElementById('shapeForm') as HTMLSelectElement


generator.addEventListener('click', () =>{
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle') as SVGCircleElement;
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect') as SVGRectElement;
    const zeile = 50
    const spalte = 50

    if(select.value === 'round'){
        if(spalten.value === zeilen.value){
            circle.setAttribute('x', `${spalten.value}`)
            circle.setAttribute('y', `${zeilen.value}`)
            circle.setAttribute('r', `${50}`)

        }
    } else if(select.value === 'square'){
        
    }
})