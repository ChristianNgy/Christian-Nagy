export type Card = {
  color: string;
  num: string;
};

export class Node {
  data: Card;
  next: Node | null = null;
  constructor(data: Card) {
    this.data = data;
  }
}

export class LinkedList {
  head: Node | null = null;

  // returns the first Node in the list with the speciefied color, null if not found
  find(color: string): Node | null {
    let current = this.head;
    while (current !== null) {
      if (current.data.color === color) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  insert(color: string, num: string): boolean {
    // Fall: Liste ist komplett leer
    if (this.head === null) {
      // Wenn Liste leer ist, fügen wir die Karte zu head hinzu
      // TODO: Implementieren
      const newNode = new Node({ color, num });
      newNode.next = this.head;
      this.head = newNode;
      return true;
    }

    // Fall: Liste ist nicht leer, Karte muss ganz am Anfang eingefügt werden
    if (num < this.head.data.num) {
      // TODO: Füge eine neue Karte hinzu
      const newNode = new Node({ color, num });
      newNode.next = this.head;
      this.head = newNode;
      return true;
    }

    // die erste Karte
    let previous = this.head;
    // Die Karte nach dem previous
    let current = this.head?.next;
    //Führe den Code, der drinnen ist aus, wenn current nicht undefiniert ist
    while (current !== null) {
      //Die Karte kann nicht hinzugefügt werden, wenn die Zahl größer ist als current.data.num
      if (current!.data.num >= num) {
        //Die previous und die current werden um eines verschoben
        previous = current;
        current = current.next;
      }
    }
    return false;
  }

  insertAfter(afterColor: string, color: string, num: string): boolean {
    if (this.find(color) !== null) {
      return false;
    }

    const afterNode = this.find(afterColor);
    if (afterNode === null) {
      return false;
    }

    const newNode = new Node({ color, num });
    newNode.next = afterNode.next;
    afterNode.next = newNode;
    return true;
  }

  delete(color: string): boolean {
    if (this.head === null) {
      return false;
    }

    if (this.head.data.color === color) {
      this.head = this.head.next;
      return true;
    }

    let prev = this.head;
    let current = this.head.next;

    while (current !== null) {
      if (current.data.color === color) {
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

  toArray(): Card[] {
    const result: Card[] = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }
}
