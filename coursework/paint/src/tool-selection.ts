export enum ToolType {
  CIRCLE,
  RECTANGLE,
  POINTER,
  TRIANGLE,
  LINE,
}

type ToolChangeCallback = (tool: ToolType) => void;

export class ToolSelection {
  private toolContainer: HTMLDivElement;

  constructor(private callback: ToolChangeCallback, toolComtainerId: string = 'tool-container') {
    this.toolContainer = document.getElementById(toolComtainerId) as HTMLDivElement;

    this.toolContainer.appendChild(this.createToolButton(ToolType.CIRCLE, 'Circle'));
    this.toolContainer.appendChild(this.createToolButton(ToolType.RECTANGLE, 'Rectangle'));
    this.toolContainer.appendChild(this.createToolButton(ToolType.TRIANGLE, 'Triangle'));
    this.toolContainer.appendChild(this.createToolButton(ToolType.LINE, 'Line'));
    this.toolContainer.appendChild(this.createToolButton(ToolType.POINTER, 'Pointer'));
  }

  private createToolButton(toolType: ToolType, label: string, isSelected: boolean = false): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = label;
    button.addEventListener('click', () => {
      this.unselectAll();
      button.className = 'selected';
      this.callback(toolType);
    });

    if (isSelected) {
      button.className = 'selected';
      this.callback(toolType);
    }

    return button;
  }

  private unselectAll() {
    //Iterate over all children of tool container and remove all CSS classes
    for (const child of this.toolContainer.children) {
      child.className = '';
    }
  }
}
