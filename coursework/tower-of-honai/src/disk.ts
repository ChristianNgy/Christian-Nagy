export class Disk {
  private svg = document.getElementById('svg') as unknown as SVGSVGElement;
  private beam = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  private disks: SVGRectElement[] = [];
  private x = 0

  constructor() {
    this.beam.setAttribute('x', '0');
    this.beam.setAttribute('y', '550');
    this.beam.setAttribute('width', '1200');
    this.beam.setAttribute('height', '35');
    this.beam.setAttribute('fill', '#7A4A24');

    this.svg.appendChild(this.beam);

    for (let i = 0; i < 3; i++) {
      const pillar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      pillar.setAttribute('x', String(230 + i * 360));
      pillar.setAttribute('y', '200');
      pillar.setAttribute('width', '20');
      pillar.setAttribute('height', '350');
      pillar.setAttribute('fill', '#94A3B8');

      this.svg.appendChild(pillar);
    }

    const colors = ['#6366F1', '#06B6D4', '#22C55E', '#EAB308'];
    for (let i = 0; i < 4; i++) {
      const disk = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      this.x = 110 + i * 25
      this.disks = []
      disk.setAttribute('x', String(this.x));
      disk.setAttribute('y', String(500 - i * 50));
      disk.setAttribute('width', String(250 - i * 50));
      disk.setAttribute('height', '50');
      disk.setAttribute('rx', '20');
      disk.setAttribute('ry', '20');
      disk.setAttribute('fill', String(colors[i]));
      this.disks.push(disk)

      this.svg.appendChild(disk);
    }
  }

   moveDiskToRight(){
    this.x * 2
  }

     moveDiskToLeft(){
    this.x / 2
  }
}