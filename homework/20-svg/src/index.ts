const select = document.getElementById('shape') as HTMLSelectElement
const button = document.getElementById('shapeButton') as HTMLButtonElement

let shapeForm = ''

select.addEventListener('change', ()=> {
    shapeForm = select.value
})

button.addEventListener('click', () =>{
    if(shapeForm === 'circle'){

    } else if(shapeForm === 'rect'){
        
    } else if(shapeForm === 'triangle'){
        
    }
})