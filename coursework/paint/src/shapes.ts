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

export class Line extends Shape {
  private lineElement: SVGLineElement
   constructor(
    protected svgContainer: SVGSVGElement,
    protected start: Point,
  ){
    super(svgContainer, start);
    this.lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    svgContainer.appendChild(this.lineElement);
  }

  public override updatePosition(start: Point, end: Point): void {
    
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
    
  }
}

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
    svgContainer.appendChild(this.triangleElement);
  }

  public override updatePosition(start: Point, end: Point): void {
    this.size.whidth = (end.x - start.x) * 2;
    this.size.height = (start.y - end.y) * 2;

    this.position1.x = start.x;
    this.position1.y = start.y;
    this.position2.x = end.x;
    this.position2.y = end.y;
    this.position3.x = this.position2.x - this.size.whidth;
    this.position3.y = end.y;

    this.triangleElement.setAttribute(
      'points',
      `${this.position1.x}, ${this.position1.y}
      ${this.position2.x}, ${this.position2.y} 
      ${this.position3.x}, ${this.position3.y}`,
    );
  }

  public override set tempMode(isTemp: boolean) {
    if (isTemp) {
      this.triangleElement.classList.add('temp');
    } else {
      this.triangleElement.classList.remove('temp');
    }
  }

  public override contains(p: Point): boolean {
    let s: number[][] = [];
    let i: number[][] = [];
    for (let x = this.position3.x; x <= this.position2.x; x++) {
      for (let y = this.position3.y; y >= this.position1.y; y--) {
        if (i[p.x]![p.y]! >= s[x]![y]!) {
          if (x || y) {
            return true;
          }
        }
      }
    }
    return false;

    // if(this.position3.x){

    //   for(let x = this.position3.x; x <= this.position2.x; x ++){
    //     for(let y = this.position3.y; y >= this.position1.y; y --){
    //       const s: Point = {x: x, y: y}
    //       if(p.x >= s.x && p.x <= s.x + this.size.whidth && p.y >= s.y && p.y <= s.y + this.size.height){
    //         return true
    //       } else{
    //         return false
    //       }
    //     }
    //   }
    // }
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
