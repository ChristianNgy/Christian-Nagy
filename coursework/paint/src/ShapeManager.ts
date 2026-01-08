import {Circle, Shape} from './shapes'

export class ShapeManager{
    private shapes: Shape[] = []
    private container: SVGSVGElement;

    constructor(svgContainerId:string = "drawing-canvas"){
        this.container = document.getElementById(svgContainerId) as unknown as SVGSVGElement;
        this.container?.addEventListener("mousedown",(event)=>{
            this.handleMouseDown(event)
            console.log("down",event);
        })
        this.container?.addEventListener("mouseup",(event)=>{
            console.log("up",event);
        })
        this.container?.addEventListener("mousemove",(event)=>{
            console.log("move",event);
        });
        this.container?.addEventListener("mouseleave",(event)=>{
            console.log("leave",event);
        })
    }

    private handleMouseDown(event: MouseEvent): void{
        const circle = new Circle(this.container, { x: event.x, y:event.y})
        this.shapes.push(circle)
    }
}