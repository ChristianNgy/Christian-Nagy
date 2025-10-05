const month1 = document.getElementById('number1') as HTMLInputElement
const month2 = document.getElementById('number2') as HTMLInputElement
const month3 = document.getElementById('number3') as HTMLInputElement
const month4 = document.getElementById('number4') as HTMLInputElement
const month5 = document.getElementById('number5') as HTMLInputElement
const month6 = document.getElementById('number6') as HTMLInputElement
const month7 = document.getElementById('number7') as HTMLInputElement
const month8 = document.getElementById('number8') as HTMLInputElement
const month9 = document.getElementById('number9') as HTMLInputElement
const month10 = document.getElementById('number10') as HTMLInputElement
const month11 = document.getElementById('number11') as HTMLInputElement
const month12 = document.getElementById('number12') as HTMLInputElement
const diagrammButton = document.getElementById('generate') as HTMLButtonElement
const svg = document.getElementById('svg') as unknown as SVGSVGElement

let monthHeight:number[] = []

diagrammButton.addEventListener('click', () =>{
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect') as SVGRectElement;

    monthHeight.push(parseInt(month1.value))
    monthHeight.push(parseInt(month2.value))
    monthHeight.push(parseInt(month3.value))
    monthHeight.push(parseInt(month4.value))
    monthHeight.push(parseInt(month5.value))
    monthHeight.push(parseInt(month6.value))
    monthHeight.push(parseInt(month7.value))
    monthHeight.push(parseInt(month8.value))
    monthHeight.push(parseInt(month9.value))
    monthHeight.push(parseInt(month10.value))
    monthHeight.push(parseInt(month11.value))
    monthHeight.push(parseInt(month12.value))
    for(let i = 1; i <= 12; i ++){
        rect.setAttribute('fill', 'blue')
        rect.setAttribute('x',`${1 * i * 100}`)
        rect.setAttribute('y',`${550}`)
        rect.setAttribute('whidth',`${90}`)
        rect.setAttribute('x',`${1 * i * 50}`)
        if(i === 1){
            rect.setAttribute('y', `${parseInt(month1.value)}`)
        } else if(i === 1){
            rect.setAttribute('y', `${parseInt(month2.value)}`)
        } else if(i === 2){
            rect.setAttribute('y', `${parseInt(month3.value)}`)
        } else if(i === 3){
            rect.setAttribute('y', `${parseInt(month4.value)}`)
        } else if(i === 4){
            rect.setAttribute('y', `${parseInt(month5.value)}`)
        }else if(i === 5){
            rect.setAttribute('y', `${parseInt(month6.value)}`)
        }else if(i === 6){
            rect.setAttribute('y', `${parseInt(month6.value)}`)
        }else if(i === 7){
            rect.setAttribute('y', `${parseInt(month7.value)}`)
        }else if(i === 8){
            rect.setAttribute('y', `${parseInt(month8.value)}`)
        }else if(i === 9){
            rect.setAttribute('y', `${parseInt(month9.value)}`)
        }else if(i === 10){
            rect.setAttribute('y', `${parseInt(month10.value)}`)
        }else if(i === 11){
            rect.setAttribute('y', `${parseInt(month11.value)}`)
        }else if(i === 12){
            rect.setAttribute('y', `${parseInt(month12.value)}`)
        }

        svg.appendChild(rect)
    }
})