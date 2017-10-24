module.exports = class Board{
    constructor(numberOfRows, numberOfColumns, numberOfBombs){
        this._numberOfBombs = numberOfBombs;
        /*this._numberOfRows = numberOfRows;
        this._numberOfColumns = numberOfColumns;*/
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }
    get playerBoard(){
        return this._playerBoard;
    }
    flipTile(rowIndex, columnIndex) {
        const content = this._playerBoard[rowIndex][columnIndex];
        if (content != ' ') {
            console.log('This tile has already been flipped');
            return;
        } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            console.log("Bombs " + this.getNumberofNeighborBombs(rowIndex, columnIndex));
            this._playerBoard[rowIndex][columnIndex] = this.getNumberofNeighborBombs(rowIndex, columnIndex);
        }
        this._numberOfTiles -=1;
    }
    getNumberofNeighborBombs (rowIndex, columnIndex) {
        const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        const numberOfRows = this._bombBoard.length;

        const numberOfColumns = this._bombBoard[0].length;
        let numberOfBombs = 0;
        neighborOffsets.forEach(offset => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColIndex = columnIndex + offset[1];
            if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColIndex >= 0 && neighborColIndex <= numberOfColumns) {
                if (this._bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
                    numberOfBombs++;
                }
            }
        });

        return numberOfBombs;
    }
    hasSafeTiles(){
        return (this._numberOfTiles != this._numberOfBombs);
    }
    print(){
        console.log(this._playerBoard.map(row => row.join('|')).join('\n'));
    }

    static generatePlayerBoard (numberOfRows, numberOfColumns) {
        let board = [];
        for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
            let row = [];
            for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
                row.push(' ');
            }
            board.push(row);
        }
        return board;
    }

    static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
        let board = [];
        for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
            let row = [];
            for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
                row.push(null);
            }
            board.push(row);
        }
        let numberOfBombsPlaced = 0;
        while (numberOfBombsPlaced < numberOfBombs) {
            let randomRowIndex = Math.floor(Math.random() * numberOfRows);
            let randomColIndex = Math.floor(Math.random() * numberOfColumns);
            // Fixme: Now it can placed bombs on the same place as before
            //"Antes de las bombas" +  console.log(`Putting bomb on row: ${randomRowIndex} column: ${randomColIndex}`)
            if (board[randomRowIndex][randomColIndex] != 'B') {
                board[randomRowIndex][randomColIndex] = 'B';
                numberOfBombsPlaced++;
            }
        }
        return board;
    }

};