const counterButton = document.getElementById('counterButton') as HTMLButtonElement;
const counter = document.getElementById('counter') as HTMLParagraphElement;
const decreaseButton = document.getElementById('deleteButton') as HTMLButtonElement;


let clickCount = 0;

counterButton.addEventListener('click', () => {
  clickCount++;
  counter.textContent = `${clickCount}`;
});

decreaseButton.addEventListener('click', () => {
    clickCount--
  counter.textContent = `${clickCount}`;
})
