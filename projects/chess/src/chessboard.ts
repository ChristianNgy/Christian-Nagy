class Chessboard {
  constructor() {
    const chessboard = document.getElementById('chessboard') as HTMLDivElement;
    for (let y = 0; y <= 8; y++) {
      for (let x = 0; x <= 8; x++) {
        const boards = document.createElement('div');
        if (x % 2 === 1) {
          boards.className = 'whiteboards';
        } else {
          boards.className = 'blackboards';
        }
        chessboard.appendChild(boards);
      }
    }
  }
}