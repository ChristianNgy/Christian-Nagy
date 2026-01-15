import { Circle, Shape, Point } from './shapes';

export class ShapeManager {
  private shapes: Shape[] = [];
  private container: SVGSVGElement;
  
  constructor(svgContainerId: string = 'drawing-canvas') {
    this.container = document.getElementById(svgContainerId) as unknown as SVGSVGElement;
    this.container?.addEventListener('mousedown', (event) => {
      this.handleMouseDown(event);
      console.log('down', event);
    });
    this.container?.addEventListener('mouseup', (event) => {
      console.log('up', event);
    });
    this.container?.addEventListener('mousemove', (event) => {
      console.log('move', event);
    });
    this.container?.addEventListener('mouseleave', (event) => {
      console.log('leave', event);
    });
  }
  
  private clientToSvgPoint(event: MouseEvent): Point {
    if (!this.container) return { x: event.clientX, y: event.clientY };
    const pt = (this.container as SVGSVGElement).createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    const ctm = this.container.getScreenCTM();
    if (!ctm) return { x: pt.x, y: pt.y };
    const svgP = pt.matrixTransform(ctm.inverse());
    return { x: svgP.x, y: svgP.y };
  }
  
  private handleMouseDown(event: MouseEvent): void { 
    if (!this.container) return;
    const start = this.clientToSvgPoint(event);
    const circle = new Circle(this.container, start);
    this.shapes.push(circle);

    const onMove = (e: MouseEvent) => {
      const p = this.clientToSvgPoint(e);
      circle.setRadiusFromPoint(p);
    };

    const onUp = (e: MouseEvent) => {
      // finalisiere (bei Bedarf weitere Logik hier)
      this.container.removeEventListener('mousemove', onMove);
      this.container.removeEventListener('mouseup', onUp);
    };

    this.container.addEventListener('mousemove', onMove);
    this.container.addEventListener('mouseup', onUp);
  }
  
  }
