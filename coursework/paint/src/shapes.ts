export abstract class Shape {
  constructor(
    protected svgContainer: SVGSVGElement,
    protected start: Point,
  ) {}

  public abstract updatePosition(start: Point, end: Point): void;
  public abstract contains(p: Point): boolean;
  public abstract set tempMode(isTemp: boolean);
  public abstract set clicked(clicked: boolean);
}

export type Point = {
  x: number;
  y: number;
};

export class Circle extends Shape {
  private center: Point = { x: 0, y: 0 };
  private radius = 0;
  private circleElement: SVGCircleElement;
  constructor(
    protected svgContainer: SVGSVGElement,
    protected start: Point,
  ) {
    super(svgContainer, start);
    this.circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    svgContainer.appendChild(this.circleElement);
  }

  public override updatePosition(start: Point, end: Point): void {
    this.radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
    this.center = start;

    this.circleElement.setAttribute('cx', `${start.x}`);
    this.circleElement.setAttribute('cy', `${start.y}`);
    this.circleElement.setAttribute('r', `${this.radius}`);
  }

  public override set tempMode(isTemp: boolean) {
    if (isTemp) {
      this.circleElement.classList.add('temp');
    } else {
      this.circleElement.classList.remove('temp');
    }
  }

  public override contains(p: Point): boolean {
    let distance = Math.sqrt((p.x - this.center.x) * (p.x - this.center.x) + (p.y - this.center.y) * (p.y - this.center.y));
    return distance <= this.radius;
  }

  public override set clicked(clicked: boolean) {
    if (clicked) {
      this.circleElement.style.stroke = 'yellow';
    }
  }

  // public setRadiusFromPoint(p: Point): void {
  //   const dx = p.x - this.start.x;
  //   const dy = p.y - this.start.y;
  //   const r = Math.sqrt(dx * dx + dy * dy);
  //   this.radius = r;
  //   this.circleElement.setAttribute('r', `${r}`);
  // }
}

export type Size = {
  whidth: number;
  height: number;
};

export class Rectangle extends Shape {
  private position: Point = { x: 0, y: 0 };
  private size: Size = { whidth: 0, height: 0 };
  private rectElement: SVGRectElement;

  constructor(
    protected svgContainer: SVGSVGElement,
    protected start: Point,
  ) {
    super(svgContainer, start);
    this.rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    svgContainer.appendChild(this.rectElement);
  }

  public override updatePosition(start: Point, end: Point): void {
    this.size.whidth = Math.max(start.x, end.x) - Math.min(start.x, end.x);
    this.size.height = Math.max(start.y, end.y) - Math.min(start.y, end.y);
    this.position.x = Math.min(start.x, end.x);
    this.position.y = Math.min(start.y, end.y);

    this.rectElement.setAttribute('x', `${this.position.x}`);
    this.rectElement.setAttribute('y', `${this.position.y}`);
    this.rectElement.setAttribute('width', `${this.size.whidth}`);
    this.rectElement.setAttribute('height', `${this.size.height}`);
  }
  public override set tempMode(isTemp: boolean) {
    if (isTemp) {
      this.rectElement.classList.add('temp');
    } else {
      this.rectElement.classList.remove('temp');
    }
  }

  public override contains(p: Point): boolean {
    return p.x >= this.start.x && p.x <= this.start.x + this.size.whidth && p.y >= this.start.y && p.y <= this.start.y + this.size.height;
  }

  public override set clicked(clicked: boolean) {
    if (clicked) {
      this.rectElement.classList.add('clicked');
    } else {
      this.rectElement.classList.remove('clicked');
    }
  }
}

//TODO für LF
// Pointer
// line
// dreieck
