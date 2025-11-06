import "./styles.css";

// ⚠️ LEARN SOMETHING NEW:
// Until now, we learned about the string data type in TypeScript.
// It can hold ANY text. However, TypeScript can also define custom data types
// that can only hold a specific set of values.
// Here: Player can only be "red" or "yellow". CellState can be "red", "yellow", or "empty".
type Player = "red" | "yellow";
type CellState = Player | "empty";

// ⚠️ LEARN SOMETHING NEW:
// In classes, we can store data that is specific to the instance of the class.
// Additionally, we can add methods that use this data. So we can say:
// A class combines data and associated behavior.
class ConnectFourGame {
    // Constants defining the dimensions of the board.
    private readonly ROWS = 6;
    private readonly COLUMNS = 7;

    // State of the game
    // 2D array of CellState objects representing the board.
    private board: CellState[][] = [];

    // Current player whose turn it is.
    private currentPlayer: Player = "red";

    // Whether the game is over.
    private isGameOver = false;

    // References to the HTML elements of the game.
    // We store them in variables so we can easily access them later.
    private readonly boardElement: HTMLDivElement;
    private readonly messageElement: HTMLDivElement;
    private readonly columnControls: HTMLDivElement[] = [];
    private readonly cellElements: HTMLDivElement[][] = [];

    constructor() {
        // ⚠️ LEARN SOMETHING NEW:
        // If we want to access the member variables of the class, we must use the "this" keyword.

        // Get references to the important parts of the HTML document.
        this.boardElement = document.getElementById("board") as HTMLDivElement;
        this.messageElement = document.getElementById("message") as HTMLDivElement;

        // Prepare the data structure that remembers the state of each cell.
        this.createEmptyBoard();

        // Create the visual representation of the grid and the column controls.
        this.setupBoardView();

        // Show the initial message so players know who begins.
        this.updateMessage(`${this.formatPlayerName(this.currentPlayer)} starts the game.`);
    }

    // ⚠️ LEARN SOMETHING NEW:
    // If a method is "private", it means that it is only accessible
    // within the class. Nobody outside the class can call it.
    // If a method should be accessible outside the class, we can 
    // make it "public".

    /**
     * Creates an empty board by initializing the board array with empty cells.
     */
    private createEmptyBoard(): void {
        this.board = [];
        for (let row = 0; row < this.ROWS; row += 1) {
            const rowData: CellState[] = [];
            for (let column = 0; column < this.COLUMNS; column += 1) {
                rowData.push("empty");
            }
            this.board.push(rowData);
        }
    }

    private setupBoardView(): void {
        // ⚠️ LEARN SOMETHING NEW:
        // We can remove all the children of an element by setting the 
        // innerHTML to an empty string.
        this.boardElement.innerHTML = "";

        // ⚠️ LEARN SOMETHING NEW:
        // We can set the length of an array to 0 to clear it.
        this.columnControls.length = 0;
        this.cellElements.length = 0;

        // Create the column controls and the board cells.
        this.createColumnControls();
        this.createBoardCells();
    }

    private createColumnControls(): void {
        for (let column = 0; column < this.COLUMNS; column++) {
            const control = document.createElement("div");
            control.className = "column-control";
            control.textContent = "⬇";
            // Note: The title is usually displayed as a tooltip
            // when the user hovers over the control with the mouse
            control.title = `Drop stone into column ${column + 1}`;
            control.addEventListener("click", () => this.handleColumnClick(column));

            // Add the control to the DOM
            this.boardElement.appendChild(control);

            // Add the control to the array of column controls
            // so we can easily access it later.
            this.columnControls.push(control);
        }
    }

    private createBoardCells(): void {
        for (let row = 0; row < this.ROWS; row++) {
            const rowElements: HTMLDivElement[] = [];
            for (let column = 0; column < this.COLUMNS; column++) {
                const cell = document.createElement("div");
                cell.className = "cell";

                // Add the cell to the DOM
                this.boardElement.appendChild(cell);

                // Add the cell to the array of row elements
                // so we can easily access it later.
                rowElements.push(cell);
            }

            // Add the row elements to the array of cell elements
            // so we can easily access it later.
            this.cellElements.push(rowElements);
        }
    }

    private handleColumnClick(column: number): void {
        if (this.isGameOver) {
            // If the game is over, ignore the click.
            return;
        }

        const targetRow = this.findAvailableRow(column);

        if (targetRow === -1) {
            this.updateMessage("That column is already full. Please choose a different one.");
            return;
        }

        this.setCellState(targetRow, column, this.currentPlayer);
        this.updateCellAppearance(targetRow, column, this.currentPlayer);

        if (this.checkForWin(targetRow, column)) {
            this.endGame(`${this.formatPlayerName(this.currentPlayer)} wins!`);
            return;
        }

        if (this.isBoardFull()) {
            this.endGame("It is a draw. Nobody wins this time.");
            return;
        }

        this.switchPlayer();
    }

    private findAvailableRow(column: number): number {
        // Start at the bottom and work upwards until we find an empty cell.
        for (let row = this.ROWS - 1; row >= 0; row--) {
            const rowData = this.board[row];
            if (rowData && rowData[column] === "empty") {
                return row;
            }
        }
        return -1;
    }

    private updateCellAppearance(row: number, column: number, player: Player): void {
        const cell = this.getCellElement(row, column);

        // Just to make sure, 
        cell.classList.remove("red", "yellow");
        cell.classList.add(player);
    }

    private checkForWin(row: number, column: number): boolean {
        // Check the four possible directions (horizontal, vertical, and the two diagonals).
        return (
            this.countConnectedCells(row, column, 0, 1) >= 4 || // Horizontal
            this.countConnectedCells(row, column, 1, 0) >= 4 || // Vertical
            this.countConnectedCells(row, column, 1, 1) >= 4 || // Diagonal down-right
            this.countConnectedCells(row, column, 1, -1) >= 4 // Diagonal down-left
        );
    }

    private countConnectedCells(row: number, column: number, rowStep: number, columnStep: number): number {
        // Count how many stones of the same player we can find in one direction.
        let count = 1; // Include the current stone.
        const player = this.getCellState(row, column);
        if (player === "empty") {
            return 0;
        }

        // Look forward from the current cell.
        count += this.countDirection(row, column, rowStep, columnStep, player);
        // Look backward from the current cell.
        count += this.countDirection(row, column, -rowStep, -columnStep, player);

        return count;
    }

    private countDirection(row: number, column: number, rowStep: number, columnStep: number, player: Player): number {
        let count = 0;
        let currentRow = row + rowStep;
        let currentColumn = column + columnStep;

        // Continue stepping in the given direction while we stay within the board.
        while (
            currentRow >= 0 &&
            currentRow < this.ROWS &&
            currentColumn >= 0 &&
            currentColumn < this.COLUMNS &&
            this.getCellState(currentRow, currentColumn) === player
        ) {
            count += 1;
            currentRow += rowStep;
            currentColumn += columnStep;
        }

        return count;
    }

    private isBoardFull(): boolean {
        for (let row = 0; row < this.ROWS; row += 1) {
            const rowData = this.board[row];
            if (rowData) {
                for (let column = 0; column < this.COLUMNS; column += 1) {
                    if (rowData[column] === "empty") {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private switchPlayer(): void {
        this.currentPlayer = this.currentPlayer === "red" ? "yellow" : "red";
        //this.updateMessage(`It is now ${this.formatPlayerName(this.currentPlayer)}'s turn.`);
    }

    private endGame(message: string): void {
        this.isGameOver = true;
        this.updateMessage(message);
    }

    private updateMessage(newMessage: string): void {
        this.messageElement.textContent = newMessage;
    }

    private formatPlayerName(player: Player): string {
        return player === "red" ? "Player Red" : "Player Yellow";
    }

    private getCellElement(row: number, column: number): HTMLDivElement {
        const rowElements = this.cellElements[row];
        if (!rowElements) {
            throw new Error("Tried to access a row that does not exist.");
        }
        const cell = rowElements[column];
        if (!cell) {
            throw new Error("Tried to access a column that does not exist.");
        }
        return cell;
    }

    private getCellState(row: number, column: number): CellState {
        const rowData = this.board[row];
        if (!rowData) {
            throw new Error("WAAAAT? Why is the row data undefined? This should never happen!");
        }
        const cellValue = rowData[column];
        if (cellValue === undefined) {
            throw new Error("WAAAAT? Why is the cell value undefined? This should never happen!");
        }
        return cellValue;
    }

    private setCellState(row: number, column: number, value: CellState): void {
        const rowData = this.board[row];
        if (!rowData) {
            throw new Error("WAAAAT? Why is the row data undefined? This should never happen!");
        }
        rowData[column] = value;
    }
}

new ConnectFourGame();
