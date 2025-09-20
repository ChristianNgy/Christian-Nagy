const counter = document.getElementById('counter') as HTMLParagraphElement;
const first = document.getElementById('first') as HTMLInputElement;
const secound = document.getElementById('secound') as HTMLInputElement;
const calcButton = document.getElementById('calcButton') as HTMLButtonElement;
const select = document.getElementById('select') as HTMLSelectElement;

let operation: string;
let inputNumber = 0;

select.addEventListener('change', () => {
  operation = select.value;
});

calcButton.addEventListener('click', () => {
  if (operation === '+') {
    inputNumber = parseInt(secound.value) + parseInt(first.value);
  } else if (operation === '-') {
    inputNumber = parseInt(secound.value) - parseInt(first.value);
  } else if (operation === '*') {
    inputNumber = parseInt(secound.value) * parseInt(first.value);
  } else if (operation === '/') {
    inputNumber = parseInt(secound.value) / parseInt(first.value);
  }

  counter.textContent = `${inputNumber}`;
});
