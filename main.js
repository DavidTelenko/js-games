function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min
}

class Board {
    constructor(size) {
        this.size = size
        this.len = this.size * this.size
        this.data = new Int32Array(this.len)
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
        for (let x = 0; x < this.size; x++) {
            for (let y = 1; y < this.size; y++) {
                this.swap(x, y, x, y - 1)
            }
        }
    }

    moveRight() {
    }

    moveUp() {
    }

    moveDown() {
    }

    swap(x1, y1, x2, y2) {
        const i1 = this.index(x1, y1)
        const i2 = this.index(x2, y2)
        const tmp = this.data[i1]
        this.data[i1] = this.data[i2]
        this.data[i2] = tmp
    }

    get(rowIndex, colIndex) {
        const index = this.index(rowIndex, colIndex)
        return this.data[index]
    }

    set(rowIndex, colIndex, value) {
        const index = this.index(rowIndex, colIndex)
        this.data[index] = value
    }

    index(rowIndex, colIndex) {
        if (rowIndex < 0 || rowIndex >= this.size ||
            colIndex < 0 || colIndex >= this.size) {
            throw new Error(`Invalid indices: (${rowIndex}, ${colIndex})`)
        }

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
                cell.textContent = ""

                if (cell.classList.length > 1) {
                    cell.classList.remove(cell.classList.item(1))
                }

                continue
            }

            const value = Math.pow(2, data[i])
            cell.textContent = value.toString()

            if (cell.classList.length > 1) {
                cell.classList.replace(cell.classList.item(1), `num${value}`);
                continue
            }

            cell.classList.add(`num${value}`)
        }
    }
}

const board = document.querySelector(".board")
const size = 4
let boardView = new HTMLBoardView(board, size)
let boardModel = new Board(size)

boardModel.init()
boardModel.update(boardView)

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case "a":
        case "ArrowLeft":
            boardModel.moveLeft()
            boardModel.update(boardView)
            break
        case "w":
        case "ArrowUp":
            boardModel.moveUp()
            boardModel.update(boardView)
            break
        case "s":
        case "ArrowDown":
            boardModel.moveDown()
            boardModel.update(boardView)
            break
        case "d":
        case "ArrowRight":
            boardModel.moveRight()
            boardModel.update(boardView)
            break
    }
});