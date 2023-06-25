function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min
}

class Board {
    constructor(size) {
        this.size = size
        this.len = this.size * this.size
        this.data = new Int32Array(this.len)
        this.init()
    }

    generateNew() {
        return Math.random() > 0.25 ? 1 : 2
    }

    init() {
        this.data.fill(0)

        for (let i = 0; i < Math.round(getRandomInRange(2, 4)); i++) {
            const index = Math.round(getRandomInRange(0, this.len - 1))
            this.data[index] = this.generateNew()
        }
    }

    moveLeft() {

    }

    moveRight() {

    }

    moveUp() {

    }

    moveDown() {

    }

    get(rowIndex, colIndex) {
        const index = this.index(rowIndex, colIndex)
        return super[index]
    }

    set(rowIndex, colIndex, value) {
        const index = this.index(rowIndex, colIndex)
        super[index] = value
    }

    index(rowIndex, colIndex) {
        // Make sure the row and column indices are valid
        if (rowIndex < 0 || rowIndex >= this.size ||
            colIndex < 0 || colIndex >= this.size) {
            throw new Error(`Invalid indices: (${rowIndex}, ${colIndex})`)
        }

        // Calculate the one-dimensional index from the row and column indices
        return rowIndex * this.size + colIndex
    }

    update(view) {
        view.update(this.data)
    }
}

class HTMLBoardView {
    constructor(htmlBoard, size) {
        this.board = htmlBoard
        this.size = size
        this.len = this.size * this.size
        this.init()
    }

    init() {
        this.board.style.gridTemplateColumns = `repeat(${this.size}, minmax(0, 1fr))`

        for (let i = 0; i < this.len; i++) {
            const cell = document.createElement("div")
            cell.classList.add("cell")
            cell.id = i.toString()
            this.board.appendChild(cell)
        }
    }

    update(data) {
        for (let i = 0; i < this.len; i++) {
            const id = i.toString()
            let cell = document.getElementById(id)
            if (data[i] == 0) {
                continue
            }
            const value = Math.pow(2, data[i])
            cell.textContent = value.toString()
            cell.classList.add(`num${value}`)
        }
    }
}

function initBoard() {
    const board = document.querySelector(".board")
    const size = 4
    let boardView = new HTMLBoardView(board, size)
    let boardModel = new Board(size)

    boardModel.update(boardView)
}

initBoard()