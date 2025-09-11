const increaseButton = document.getElementById('increaseButton') as HTMLButtonElement;
const counter = document.getElementById('counter') as HTMLParagraphElement;
const decreaseButton = document.getElementById('decreaseButton') as HTMLButtonElement;


let clickCount = 0;

increaseButton.addEventListener('click', () => {
  clickCount++;
  counter.textContent = `${clickCount}`;

  if(clickCount >= 0){
    counter.style.color = 'black'
  }
});

decreaseButton.addEventListener('click', () => {
    clickCount--
  counter.textContent = `${clickCount}`;
  if(clickCount < 0){
    counter.style.color = 'red'
  }
})
