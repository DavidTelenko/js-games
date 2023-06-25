class Int32Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = new Int32Array(rows * cols);
    }

    get(rowIndex, colIndex) {
        const index = this.index(rowIndex, colIndex);
        return this.data[index];
    }

    set(rowIndex, colIndex, value) {
        const index = this.index(rowIndex, colIndex);
        this.data[index] = value;
    }

    index(rowIndex, colIndex) {
        // Make sure the row and column indices are valid
        if (rowIndex < 0 || rowIndex >= this.rows ||
            colIndex < 0 || colIndex >= this.cols) {
            throw new Error(`Invalid indices: (${rowIndex}, ${colIndex})`);
        }

        // Calculate the one-dimensional index from the row and column indices
        return rowIndex * this.cols + colIndex;
    }
}

class Board {
    constructor(size) {
        this.size = size;
        this.data = new Int32Matrix(size, size);
    }

    moveLeft() {

    }

    moveRight() {

    }

    moveUp() {

    }

    moveDown() {

    }

    render(view) {
        view.render(this.data)
    }

    update(view) {
        view.update(this.data)
    }
}

class HTMLBoardView {
    constructor(htmlBoard, size) {
        this.board = htmlBoard
        this.size = size
        this.init()
    }

    init() {
        this.board.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;

        for (let i = 0; i < this.size * this.size; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            this.board.appendChild(cell);
        }
    }

    render(data) {

    }

    update(data) {

    }
}

function initBoard() {
    const board = document.querySelector(".board");
    const size = 4
    let boardView = new HTMLBoardView(board, size)
    let boardModel = new Board(size)
}

initBoard()