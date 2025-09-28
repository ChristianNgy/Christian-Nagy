const svg = document.getElementById('svg') as unknown as SVGSVGElement;
const add = document.getElementById('add') as HTMLButtonElement;

add.addEventListener('click', () => {
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle') as SVGCircleElement;

  circle.setAttribute('fill', 'lime');
  circle.setAttribute('stroke', 'green');
  circle.setAttribute('cx', `${Math.random() * 200}`);
  circle.setAttribute('cy', `${Math.random() * 200}`);
  circle.setAttribute('r', `${Math.random() * 50}`);

  svg.appendChild(circle);
});