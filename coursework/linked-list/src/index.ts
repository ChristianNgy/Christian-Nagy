type Song = {
  title: string;
  artist: string;
};

class Node {
  data: Song;
  next: Node | null;

  constructor(data: Song) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  head: Node | null = null;
  public insertAtBeginning(data: Song): void {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  public find(title: string): Node | null {
    let current = this.head;
    while (current !== null) {
      if (current.data.title === title) {
        return current;
      } else {
        current = current.next;
      }
      return null;
    }
  }

  public insertAfter(index: number, data: Song): boolean {
    let findIndex = this.head;
    for (let i = 0; i <= index; i++) {
      if (findIndex!.data !== data) {
        findIndex = findIndex!.next;
      }
    }
    if (findIndex !== null) {
      return false;
    } else {
      return true;
    }
  }
}
