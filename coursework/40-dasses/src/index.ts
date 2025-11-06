import './styles.css';

type Player = 'red' | 'yellow';
type Cellstate = Player | 'empty';

class ConnectFourGame {
  private boardElement: HTMLDivElement;
  private currentPlayer: Player = 'red';
  private board: Cellstate[][] = [];
  private cellElements: HTMLDivElement[][] = [];

  constructor() {
    this.boardElement = document.getElementById('colored-rect') as HTMLDivElement;
    this.createColumnControls();
    this.createBoardCells();
    this.createEmptyBoard();
  }
  private createEmptyBoard() {
    for (let row = 0; row < 6; row++) {
      let r: Cellstate[] = [];
      for (let column = 0; column < 7; column++) {
        r.push('empty');
      }
      this.board.push(r);
    }
  }
  private findAvailableRow(column: number): number {
    for (let row = 5; row >= 0; row--) {
      if (this.board[row]![column] === 'empty') {
        return row;
      }
    }
    return -1;
  }
  private createColumnControls() {
    for (let i = 0; i < 7; i++) {
      const control = document.createElement('div');
      control.className = 'column-control';
      control.textContent = '⬇';
      control.addEventListener('click', () => this.handleColumnClick(i));
      this.boardElement.appendChild(control);
    }
  }
  private createBoardCells() {
    // we create 6 rows and 7 columns of white circles(divs)
    for (let row = 0; row < 6; row++) {
      const rowElements: HTMLDivElement[] = [];
      for (let column = 0; column < 7; column++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        this.boardElement.appendChild(cell);
        rowElements.push(cell);
      }
      this.cellElements.push(rowElements);
    }
  }
  private handleColumnClick(columnIndex: number) {
    const targetRow = this.findAvailableRow(columnIndex);
    if (this.currentPlayer === 'red') {
      this.cellElements[targetRow]![columnIndex]!.classList.add('red');
      this.board[targetRow]![columnIndex] = 'red';
      this.switchPlayer()
    }else if (this.currentPlayer === 'yellow') {
      this.cellElements[targetRow]![columnIndex]!.classList.add('yellow');
      this.board[targetRow]![columnIndex] = 'yellow';
      this.switchPlayer()
    }
  }
  private switchPlayer() {
    if ((this.currentPlayer === 'red')) {
      this.currentPlayer = 'yellow';
    } else {
      this.currentPlayer = 'red';
    }
  }
}
const game = new ConnectFourGame();
