const select = document.getElementById('shapeForm') as HTMLSelectElement;
const button = document.getElementById('add') as HTMLButtonElement;
const shape = document.getElementById('svg') as unknown as SVGSVGElement;
const shapecounter = document.getElementById('shapeCounter') as HTMLParagraphElement;

let shapeForm = '';
let counter = 0;

select.addEventListener('change', () => {
  shapeForm = select.value;
});

button.addEventListener('click', () => {
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle') as SVGCircleElement;
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect') as unknown as SVGRectElement;
  const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'triangle') as SVGRectElement;
  function randomColor(): string {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    );
  }
  if (shapeForm === 'circle') {
    circle.setAttribute('fill', randomColor());
    circle.setAttribute('stroke', randomColor());
    circle.setAttribute('cx', `${Math.random() * 600}`);
    circle.setAttribute('cy', `${Math.random() * 400}`);
    circle.setAttribute('r', `${Math.random() * 50}`);
    counter++;
    shape.appendChild(circle);
  } else if (shapeForm === 'rect') {
    rect.setAttribute('fill', randomColor());
    rect.setAttribute('stroke', randomColor());
    rect.setAttribute('x', `${Math.random() * 600}`);
    rect.setAttribute('y', `${Math.random() * 400}`);
    rect.setAttribute('width', `${Math.random() * 100}`);
    rect.setAttribute('height', `${Math.random() * 80}`);
    counter++;
    shape.appendChild(rect);
  } else if (shapeForm === 'triangle') {
    triangle.setAttribute('fill', randomColor());
    triangle.setAttribute('stroke', randomColor());
    triangle.setAttribute('x1', `${Math.random() * 600}`);
    triangle.setAttribute('y1', `${Math.random() * 400}`);
    triangle.setAttribute('x2', `${Math.random() * 600}`);
    triangle.setAttribute('y2', `${Math.random() * 400}`);
    triangle.setAttribute('x3', `${Math.random() * 600}`);
    triangle.setAttribute('y3', `${Math.random() * 400}`);
    shape.appendChild(triangle);
  }
  shapecounter.textContent = `${counter}`;
});