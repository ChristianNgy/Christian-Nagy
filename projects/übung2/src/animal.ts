export abstract class Animal{
  public element: HTMLDivElement;
  public readonly box: HTMLDivElement
  public texts: string[] = []

    constructor(text: string){
    this.element = document.createElement('div');
    this.element.className = 'text';
    this.element.style.width = `${200}px`;
    this.element.style.height = `${100}px`;
    this.element.style.backgroundColor = 'black';
    this.texts.push(text)
    }
}

export class Dog extends Animal{
  constructor(text: string){
    super(text)
  }
}

export class Cat extends Animal{
  constructor(text: string){
    super(text)
  }
}