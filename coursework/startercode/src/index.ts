import { LinkedList, Card as CardData } from './linkedList';
import './styles.css';

class UnoCard {
  data: CardData;
  constructor(data: CardData) { this.data = data; }
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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cardForm') as HTMLFormElement | null;
  const select = document.getElementById('color') as HTMLSelectElement | null;
  const input = document.getElementById('num') as HTMLInputElement | null;
  const stack = document.getElementById('stack') as HTMLDivElement | null;

  if (!form || !select || !input || !stack) {
    console.error('Benötigte Elemente (form, color, num, stack) fehlen in der HTML.');
    return;
  }

  const list = new LinkedList();

  function renderList() {
    stack.innerHTML = '';
    // Ausgabe in Listenreihenfolge (head -> tail)
    const arr = list.toArray();
    for (const cardData of arr) {
      const card = new UnoCard(cardData);
      stack.appendChild(card.render());
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const color = (select.value || '').trim();
    const num = (input.value || '').trim();
    if (!color || !num) return;

    // füge in die verkettete Liste (Ende) ein
    list.insertAtEnd(color, num);
    renderList();

    input.value = '';
    input.focus();
  });

  // initial render (falls Liste vorbefüllt wird)
  renderList();
});
