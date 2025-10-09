const spalten = document.getElementById('spalten') as HTMLInputElement;
const zeilen = document.getElementById('zeilen') as HTMLInputElement;
const generator = document.getElementById('generator') as HTMLButtonElement;
const svg = document.getElementById('svg') as unknown as SVGSVGElement;

generator.addEventListener('click', () => {
  const zeile = parseInt(`${zeilen.value}`);
  const spalte = parseInt(`${spalten.value}`);
  console.log(zeile);
  console.log(spalten);

  if (zeilen.value === spalten.value) {
    for (let x = 0; x < zeile; x++) {
      for (let y = 0; y < spalte; y++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle') as SVGCircleElement;
        circle.setAttribute('fill', 'white');
        circle.setAttribute('stroke', 'black');
        circle.setAttribute('cx', `${(400 / zeile) * x + 100}`);
        circle.setAttribute('cy', `${(400 / spalte) * y + 100}`);
        circle.setAttribute('r', `${400 / (spalte + zeile)}`);
        svg.appendChild(circle);
        console.log(circle);
      }
    }
  } else {
    for (let x = 0; x < zeile; x++) {
      for (let y = 0; y < spalte; y++) {
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse') as SVGEllipseElement;
        ellipse.setAttribute('fill', 'white');
        ellipse.setAttribute('stroke', 'black');
        ellipse.setAttribute('cx', `${(400 / zeile) * x + 400 / zeile / 2}`);
        ellipse.setAttribute('cy', `${(400 / spalte) * y + 400 / spalte / 2}`);
        ellipse.setAttribute('rx', `${400 / zeile / 2}`);
        ellipse.setAttribute('ry', `${400 / spalte / 2}`);
        svg.appendChild(ellipse);
        console.log(ellipse);
      }
    }
  }
});
