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
    inputNumber = parseInt(first.value) + parseInt(secound.value);
    counter.textContent = `${inputNumber}`;
  } else if (operation === '-') {
    inputNumber = parseInt(first.value) - parseInt(secound.value);
    counter.textContent = `${inputNumber}`;
  } else if (operation === '*') {
    inputNumber = parseInt(first.value) * parseInt(secound.value);
    counter.textContent = `${inputNumber}`;
  } else if (operation === '/') {
    inputNumber = parseInt(first.value) / parseInt(secound.value);
    if (first.value !== '0') {
      counter.textContent = 'Error!';
    } else {
      counter.textContent = `${inputNumber}`;
    }
  }
});
