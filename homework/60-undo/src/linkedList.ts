import './undo'



class UndoStack<T> {
  push(item: T): void;
  pop(): T | null;       // returns null when empty
  // You may add: isEmpty(), size(), and a way to iterate for display.
}


export class Node <T> {
  data: T;
  next: T | null = null;

  constructor(data: Song) {
    this.data = data;
  }
}





export type Song = {
  title: string;
  artist: string;
};


export class LinkedList {
  head: Node | null = null;

  find(title: string): Node | null {
    let current = this.head;
    while (current !== null) {
      if (current.data.title === title) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  insertAtBeginning(title: string, artist: string): boolean {
    if (this.find(title) !== null) {
      return false;
    }

    const newNode = new Node({ title, artist });
    newNode.next = this.head;
    this.head = newNode;
    return true;
  }

  insertAfter(afterTitle: string, title: string, artist: string): boolean {
    if (this.find(title) !== null) {
      return false;
    }

    const afterNode = this.find(afterTitle);
    if (afterNode === null) {
      return false;
    }

    const newNode = new Node({ title, artist });
    newNode.next = afterNode.next;
    afterNode.next = newNode;
    return true;
  }

  delete(title: string): boolean {
    if (this.head === null) {
      return false;
    }

    if (this.head.data.title === title) {
      this.head = this.head.next;
      return true;
    }

    let prev = this.head;
    let current = this.head.next;

    while (current !== null) {
      if (current.data.title === title) {
        prev.next = current.next;
        return true;
      }
      prev = current;
      current = current.next;
    }

    return false;
  }

  size(): number {
    let count = 0;
    let current = this.head;
    while (current !== null) {
      count++;
      current = current.next;
    }
    return count;
  }

  isEmpty(): boolean {
    return this.head === null;
  }

  toArray(): Song[] {
    const result: Song[] = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }
}
