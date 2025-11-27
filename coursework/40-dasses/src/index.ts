import './styles.css';

type Player = 'red' | 'blue'
type Cellstate = Player | 'empty'

class ConnectFourGame {
  private boardElement: HTMLDivElement;
  private currentPlayer: Player = 'red'
  private board: Cellstate[][] = []
  private cellElements: HTMLDivElement

  constructor(){
    this.createEmptyBoard()
  }

  private createEmptyBoard(){
    for(let row = 0; row < 6; row ++){
      let r: Cellstate[] = []
      for(let column = 0; column < 7; column ++){
        r.push('empty')
      }
      this.board.push(r)
    }
  }

    private findAvailableRow(column: number): number{
      for(let row = 0; row < 6; row ++){
        if(this.board[row]![column] === 'empty'){
          return row
        }
      }
      return -1
    }
  
    
}