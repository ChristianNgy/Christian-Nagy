const select = document.getElementById('shapeForm') as HTMLSelectElement;
const button = document.getElementById('add') as HTMLButtonElement;
const shape = document.getElementById('svg') as unknown as SVGSVGElement;

let shapeForm = '';

select.addEventListener('change', () => {
  shapeForm = select.value;
});

button.addEventListener('click', () => {
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle') as SVGCircleElement;
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect') as unknown as SVGCircleElement;
  const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'triangle') as SVGCircleElement;
  function randomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}
  
  if (shapeForm === 'circle') {
    circle.setAttribute('fill', randomColor());
    circle.setAttribute('stroke', randomColor());
    circle.setAttribute('cx', `${Math.random() * 200}`);
    circle.setAttribute('cy', `${Math.random() * 200}`);
    circle.setAttribute('r', `${Math.random() * 50}`);
    shape.appendChild(circle);
  } else if (shapeForm === 'rect') {
    rect.setAttribute('fill', randomColor());
    rect.setAttribute('stroke', randomColor());
    rect.setAttribute('x', `${Math.random() * 200}`);
    rect.setAttribute('y', `${Math.random() * 200}`);
    rect.setAttribute('width', `${Math.random() * 100}`);
    rect.setAttribute('height', `${Math.random() * 80}`);
    shape.appendChild(rect);
  } else if (shapeForm === 'triangle') {
    triangle.setAttribute('fill', randomColor());
    triangle.setAttribute('stroke', randomColor());
    triangle.setAttribute('x1', `${Math.random() * 200}`);
    triangle.setAttribute('y1', `${Math.random() * 200}`);
    triangle.setAttribute('x2', `${Math.random() * 200}`);
    triangle.setAttribute('y2', `${Math.random() * 200}`);
    triangle.setAttribute('x3', `${Math.random() * 200}`);
    triangle.setAttribute('y3', `${Math.random() * 200}`);
    shape.appendChild(triangle);
  }
});
