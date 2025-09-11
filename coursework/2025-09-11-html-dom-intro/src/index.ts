const counterButton = document.getElementById('counterButton') as HTMLButtonElement;
const counter = document.getElementById('counter') as HTMLParagraphElement;

let clickCount = 0;

counterButton.addEventListener('click', () => {
  clickCount++;
  counter.textContent = `${clickCount}`;
});
