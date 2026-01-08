export abstract class Shape {
  constructor(protected svgContainer: SVGSVGElement, protected start: Point) {}
}

export type Point = {
  x: number;
  y: number;
};

export class Circle extends Shape {
  private center: Point = { x: 0, y: 0 };
  private radius = 0;
  
  constructor(protected svgContainer: SVGSVGElement, protected start: Point) {
    super(svgContainer, start);
    const circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circleElement.setAttribute('cx', `${start.x}`);
    circleElement.setAttribute('cy', `${start.y}`);
    circleElement.setAttribute('color', 'red');
    circleElement.setAttribute('r', '100');
    svgContainer.appendChild(circleElement);
  }
}

export type Size = {
  whidth: number;
  height: number;
};

export class Rectangle extends Shape {
  private position: Point = { x: 0, y: 0 };
  private size: Size = { whidth: 0, height: 0 };

  constructor(protected svgContainer: SVGSVGElement, protected start: Point) {
    super(svgContainer, start);
    const circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    svgContainer.appendChild(circleElement);
  }
}

export class Pointer extends Shape {}
