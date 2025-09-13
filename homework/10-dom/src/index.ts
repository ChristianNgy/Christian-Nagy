const counter = document.getElementById('counter') as HTMLParagraphElement
const first = document.getElementById('first') as HTMLInputElement
const secound = document.getElementById('secound') as HTMLInputElement


let inputNumber = 0
let a = 0
let b = 0

first.addEventListener('click', () => {
    a = parseInt(first.value)
    b = parseInt(secound.value)
    inputNumber = a += b
    
    counter.textContent = `${inputNumber}`
})