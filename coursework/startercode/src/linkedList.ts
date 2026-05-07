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

  // Insert am Ende -> Erhält Einfügereihenfolge
  insertAtEnd(color: string, num: string): void {
    const node = new Node({ color, num });
    if (this.head === null) {
      this.head = node;
      return;
    }
    let cur = this.head;
    while (cur.next !== null) cur = cur.next;
    cur.next = node;
  }

  // Optional: insert am Anfang
  insertAtBeginning(color: string, num: string): void {
    const node = new Node({ color, num });
    node.next = this.head;
    this.head = node;
  }

  findByColor(color: string): Node | null {
    let cur = this.head;
    while (cur) {
      if (cur.data.color === color) {
        return cur;
      }
      cur = cur.next;
    }
    return null;
  }

  deleteByColor(color: string): boolean {
    if (!this.head) return false;
    if (this.head.data.color === color) {
      this.head = this.head.next;
      return true;
    }
    let prev = this.head;
    let cur = this.head.next;
    while (cur) {
      if (cur.data.color === color) {
        prev.next = cur.next;
        return true;
      }
      prev = cur;
      cur = cur.next;
    }
    return false;
  }

  // Gruppiert die Liste so, dass alle Karten gleicher Farbe zusammenstehen.
  // 'order' bestimmt die Reihenfolge der Farbgruppen. Farben, die nicht in
  // 'order' stehen, werden am Ende in ihrer ursprünglichen Reihenfolge angehängt.
  groupByColor(order: string[]): void {
    if (this.head === null) return;

    // Buckets für jede gewünschte Farbe + Bucket für andere Farben
    const buckets = new Map<string, { head: Node | null; tail: Node | null }>();
    for (const c of order) buckets.set(c, { head: null, tail: null });
    const others = { head: null as Node | null, tail: null as Node | null };

    // Verteilen der Knoten in die Buckets (stabil)
    let cur: Node | null = this.head;
    while (cur !== null) {
      const next = cur.next;
      cur.next = null;
      const color = cur.data.color;
      if (buckets.has(color)) {
        const b = buckets.get(color)!;
        if (b.head === null) b.head = b.tail = cur;
        else {
          b.tail!.next = cur;
          b.tail = cur;
        }
      } else {
        if (others.head === null) others.head = others.tail = cur;
        else {
          others.tail!.next = cur;
          others.tail = cur;
        }
      }
      cur = next;
    }

    // Zusammenfügen der Buckets in der gewünschten Reihenfolge, dann die anderen
    let newHead: Node | null = null;
    let newTail: Node | null = null;
    for (const c of order) {
      const b = buckets.get(c)!;
      if (b.head !== null) {
        if (newHead === null) {
          newHead = b.head;
          newTail = b.tail;
        } else {
          newTail!.next = b.head;
          newTail = b.tail;
        }
      }
    }
    if (others.head !== null) {
      if (newHead === null) {
        newHead = others.head;
        newTail = others.tail;
      } else {
        newTail!.next = others.head;
        newTail = others.tail;
      }
    }

    this.head = newHead;
  }

  toArray(): Card[] {
    const out: Card[] = [];
    let cur = this.head;
    while (cur) {
      out.push(cur.data);
      cur = cur.next;
    }
    return out;
  }

  size(): number {
    let n = 0;
    let cur = this.head;
    while (cur) {
      n++;
      cur = cur.next;
    }
    return n;
  }

  isEmpty(): boolean {
    return this.head === null;
  }
}
