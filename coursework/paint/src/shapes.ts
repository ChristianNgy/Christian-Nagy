export abstract class Shape {
  constructor(protected svgContainer: SVGSVGElement, protected start: Point) {}
}

export type Point = {
  x: number;
  y: number;
};

export class Circle extends Shape {
  private center: Point = { x: 0, y: 0 };
  private radius = 0
  private circleElement: SVGCircleElement;
  constructor(protected svgContainer: SVGSVGElement, protected start: Point) {
    super(svgContainer, start);
    this.circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.circleElement.setAttribute('cx', `${start.x}`);
    this.circleElement.setAttribute('cy', `${start.y}`);
    this.circleElement.setAttribute('fill', 'red');
    svgContainer.appendChild(this.circleElement);
  }

  public setRadiusFromPoint(p: Point): void {
    const dx = p.x - this.start.x;
    const dy = p.y - this.start.y;
    const r = Math.sqrt(dx * dx + dy * dy);
    this.radius = r;
    this.circleElement.setAttribute('r', `${r}`);
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
