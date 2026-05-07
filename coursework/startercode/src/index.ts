import { LinkedList, Node, Card as CardData } from './linkedList';
import './styles.css';

class UnoCard {
  data: CardData;
  constructor(data: CardData) {
    this.data = data;
  }
  render(): HTMLElement {
    const el = document.createElement('div');
    el.className = 'uno-card';
    el.textContent = this.data.num;
    el.style.background = this.data.color;
    el.style.color = textColorFor(this.data.color);
    return el;
  }
}

function textColorFor(bg: string) {
  return bg === 'yellow' || bg === 'white' ? '#000' : '#fff';
}

// Hilfsfunktion: hängt eine Node ans Ende der gegebenen LinkedList
function appendToList(list: LinkedList, color: string, num: string) {
  const node = new Node({ color, num });
  if (list.head === null) {
    list.head = node;
    return;
  }
  let cur = list.head;
  while (cur.next !== null) cur = cur.next;
  cur.next = node;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cardForm') as HTMLFormElement | null;
  const select = document.getElementById('color') as HTMLSelectElement | null;
  const input = document.getElementById('num') as HTMLInputElement | null;
  const stack = document.getElementById('stack') as HTMLDivElement | null;

  if (!form || !select || !input || !stack) {
    console.error('Benötigte Elemente (form, color, num, stack) fehlen in der HTML.');
    return;
  }

  const stackEl = stack as HTMLDivElement;

  // Beschränke Eingabe auf eine einzelne Ziffer 0-9
  input.inputMode = 'numeric';
  input.maxLength = 1;
  input.addEventListener('input', () => {
    input.value = (input.value || '').replace(/\D/g, '').slice(0, 1);
  });

  const list = new LinkedList();

  function renderList() {
    // Gruppierte Anzeige in Reihen (pro Farbe eine Reihe)
    stackEl.innerHTML = '';

    const arr = list.toArray(); // preserves linked list order (head -> tail)
    const groups = new Map<string, CardData[]>();
    for (const c of arr) {
      const col = c.color;
      if (!groups.has(col)) groups.set(col, []);
      groups.get(col)!.push(c);
    }

    // Gewünschte Reihenfolge der Farben
    const order = ['red', 'yellow', 'green', 'blue', 'black', 'white'];

    // Für jede Farbe: eine Reihe erstellen (auch wenn leer kann weggelassen werden)
    for (const color of order) {
      const cards = groups.get(color) ?? [];
      if (cards.length === 0) continue; // leere Reihen nicht anzeigen
      const row = document.createElement('div');
      row.className = 'row';

      const title = document.createElement('div');
      title.className = 'row-title';
      title.textContent = color;
      title.style.color = textColorFor(color);
      row.appendChild(title);

      const rowCards = document.createElement('div');
      rowCards.className = 'row-cards';
      for (const cd of cards) {
        const card = new UnoCard(cd);
        const el = card.render();
        el.classList.add('small'); // kleinere Darstellung für Reihen
        rowCards.appendChild(el);
      }
      row.appendChild(rowCards);
      stackEl.appendChild(row);
    }

    // Karten mit Farben, die nicht in 'order' sind, am Ende als eigene Reihen anzeigen
    const others = arr.filter((c) => !order.includes(c.color));
    if (others.length > 0) {
      const grouped: Record<string, CardData[]> = {};
      for (const c of others) {
        grouped[c.color] = grouped[c.color] || [];
        grouped[c.color]!.push(c);
      }
      for (const color of Object.keys(grouped)) {
        const cards = grouped[color] ?? [];
        if (cards.length === 0) continue;
        const row = document.createElement('div');
        row.className = 'row';
        const title = document.createElement('div');
        title.className = 'row-title';
        title.textContent = color;
        title.style.color = textColorFor(color);
        row.appendChild(title);
        const rowCards = document.createElement('div');
        rowCards.className = 'row-cards';
        for (const cd of cards) {
          const el = new UnoCard(cd).render();
          el.classList.add('small');
          rowCards.appendChild(el);
        }
        row.appendChild(rowCards);
        stackEl.appendChild(row);
      }
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const color = (select.value || '').trim();
    const num = (input.value || '').trim();

    if (!/^[0-9]$/.test(num)) {
      input.classList.add('invalid');
      input.focus();
      return;
    } else {
      input.classList.remove('invalid');
    }

    // benutze appendToList um ans Ende zu hängen (ohne linkedList.ts zu ändern)
    appendToList(list, color, num);
    renderList();

    input.value = '';
    input.focus();
  });

  renderList();
});
