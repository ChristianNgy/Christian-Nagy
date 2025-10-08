const spalten = document.getElementById('spalten') as HTMLInputElement;
const zeilen = document.getElementById('zeilen') as HTMLInputElement;
const generator = document.getElementById('generator') as HTMLButtonElement;
const svg = document.getElementById('svg') as unknown as SVGSVGElement;
const select = document.getElementById('shapeForm') as HTMLSelectElement;

generator.addEventListener('click', () => {
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle') as SVGCircleElement;
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect') as SVGRectElement;
  const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse') as SVGEllipseElement;
  const zeile = 50;
  const spalte = 50;

  if (select.value === 'round') {
    if (spalten.value === zeilen.value) {
      circle.setAttribute('fill', 'white');
      circle.setAttribute('stroke', 'black');
      circle.setAttribute('cx', `${200}`);
      circle.setAttribute('cy', `${200}`);
      circle.setAttribute('r', `${zeile * parseInt(`${zeilen.value}`)}`);
      svg.appendChild(circle);
    } else {
      ellipse.setAttribute('fill', 'white');
      ellipse.setAttribute('stroke', 'black');
      ellipse.setAttribute('cx', `${200}`);
      ellipse.setAttribute('cy', `${200}`);
      ellipse.setAttribute('rx', `${spalte * parseInt(`${zeilen.value}`)}`);
      ellipse.setAttribute('ry', `${zeile * parseInt(`${spalten.value}`)}`);
      svg.appendChild(ellipse);
    }
  } else if (select.value === 'square') {
    rect.setAttribute('fill', 'white');
    rect.setAttribute('stroke', 'black');
    rect.setAttribute('x', `${200 - zeile * parseInt(`${zeilen.value}`)}`);
    rect.setAttribute('y', `${200 - spalte * parseInt(`${spalten.value}`)}`);
    rect.setAttribute('whidth', `${zeile * parseInt(`${zeilen.value}`)}`);
    rect.setAttribute('height', `${spalte * parseInt(`${spalten.value}`)}`);
    svg.appendChild(rect);
  }
});
