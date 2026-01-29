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
      this.circleElement.classList.add('clicked');
    } else {
      this.circleElement.classList.remove('clicked');
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
    return p.x >= this.position.x && p.x <= this.position.x + this.size.whidth && p.y >= this.position.y && p.y <= this.position.y + this.size.height;
  }

  public override set clicked(clicked: boolean) {
    if (clicked) {
      this.rectElement.classList.add('clicked');
    } else {
      this.rectElement.classList.remove('clicked');
    }
  }
}

// ...existing code...
export class Line extends Shape {
  private startPoint: Point;
  private endPoint: Point;
  private lineElement: SVGLineElement;
  constructor(
    protected svgContainer: SVGSVGElement,
    protected start: Point,
  ) {
    super(svgContainer, start);
    this.startPoint = start;
    this.endPoint = start;
    this.lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    svgContainer.appendChild(this.lineElement);
  }

  public override updatePosition(start: Point, end: Point): void {
    // wichtig: interne Punkte aktualisieren, sonst contains() arbeitet mit alten Werten
    this.startPoint = start;
    this.endPoint = end;

    this.lineElement.setAttribute('x1', `${start.x}`);
    this.lineElement.setAttribute('y1', `${start.y}`);
    this.lineElement.setAttribute('x2', `${end.x}`);
    this.lineElement.setAttribute('y2', `${end.y}`);
  }

  public override set tempMode(isTemp: boolean) {
    if (isTemp) {
      this.lineElement.classList.add('temp');
    } else {
      this.lineElement.classList.remove('temp');
    }
  }

  public override set clicked(clicked: boolean) {
    if (clicked) {
      this.lineElement.classList.add('clicked');
    } else {
      this.lineElement.classList.remove('clicked');
    }
  }

  public override contains(p: Point): boolean {
    const x1 = this.startPoint.x;
    const y1 = this.startPoint.y;
    const x2 = this.endPoint.x;
    const y2 = this.endPoint.y;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const len2 = dx * dx + dy * dy;

    // Toleranz in SVG-Einheiten (bei Bedarf anpassen)
    const tolerance = 5;
    const tol2 = tolerance * tolerance;

    if (len2 === 0) {
      // Linie hat Länge 0 -> Kreis um den Punkt prüfen
      const dist2 = (p.x - x1) * (p.x - x1) + (p.y - y1) * (p.y - y1);
      return dist2 <= tol2;
    }

    // Projektion von p auf die Linie (parametrisch t in [0,1])
    let t = ((p.x - x1) * dx + (p.y - y1) * dy) / len2;
    t = Math.max(0, Math.min(1, t));

    const projX = x1 + t * dx;
    const projY = y1 + t * dy;

    const dist2 = (p.x - projX) * (p.x - projX) + (p.y - projY) * (p.y - projY);
    return dist2 <= tol2;
  }
}
// ...existing code...

export class Triangle extends Shape {
  private position1: Point = { x: 0, y: 0 };
  private position2: Point = { x: 0, y: 0 };
  private position3: Point = { x: 0, y: 0 };
  private size: Size = { whidth: 0, height: 0 };
  private triangleElement: SVGPolygonElement;
  constructor(
    protected svgContainer: SVGSVGElement,
    protected start: Point,
  ) {
    super(svgContainer, start);
    this.triangleElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    // default styling (sichtbar machen)
    this.triangleElement.setAttribute('stroke', 'black');
    this.triangleElement.setAttribute('fill', 'transparent');
    this.triangleElement.setAttribute('stroke-width', '2');
    svgContainer.appendChild(this.triangleElement);
  }

  public override updatePosition(start: Point, end: Point): void {
    // Erzeuge ein gleichschenkliges Dreieck mit Spitze bei start und Basis symmetrisch um start.x
    this.size.whidth = (end.x - start.x) * 2;
    this.size.height = Math.abs(start.y - end.y) * 2;

    this.position1.x = start.x;
    this.position1.y = start.y;

    this.position2.x = end.x;
    this.position2.y = end.y;

    // linke Basis berechnen (symmetrisch zur position2)
    this.position3.x = this.position2.x - this.size.whidth;
    this.position3.y = end.y;

    this.triangleElement.setAttribute(
      'points',
      `${this.position1.x},${this.position1.y} ${this.position2.x},${this.position2.y} ${this.position3.x},${this.position3.y}`,
    );
  }

  public override set tempMode(isTemp: boolean) {
    if (isTemp) {
      this.triangleElement.classList.add('temp');
    } else {
      this.triangleElement.classList.remove('temp');
    }
  }

  // Punkt-in-Dreieck Test (baryzentrischer / sign test)
  public override contains(p: Point): boolean {
    const a = this.position1;
    const b = this.position2;
    const c = this.position3;

    // falls Degeneriert (keine Fläche) -> false
    const area2 = (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
    if (Math.abs(area2) < 1e-6) return false;

    const sign = (p1: Point, p2: Point, p3: Point) =>
      (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);

    const b1 = sign(p, a, b) < 0.0;
    const b2 = sign(p, b, c) < 0.0;
    const b3 = sign(p, c, a) < 0.0;

    return (b1 === b2) && (b2 === b3);
  }

  public override set clicked(clicked: boolean) {
    if (clicked) {
      this.triangleElement.classList.add('clicked');
    } else {
      this.triangleElement.classList.remove('clicked');
    }
  }
}

//TODO für LF
// line
// dreieck
