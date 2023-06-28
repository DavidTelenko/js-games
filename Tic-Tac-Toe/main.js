function hasConsecutiveBy(arr, amount, step, filter) {
    let last = null
    let count = 0

    for (let i = 0; i < arr.length; i += step) {
        for (let j = i; j < Math.min(i + step, arr.length); j++) {
            const e = arr[j]

            if (filter.includes(e)) {
                last = null
                count = 0
                continue
            }

            if (last != e) {
                last = e
                count = 0
            }

            count++

            if (count >= amount) {
                return last
            }
        }
        last = null
        count = 0
    }

    return null
}

function columnIterator(array, numRows) {
    return {
        [Symbol.iterator]() {
            let index = 0

            return {
                next: () => {
                    if (index == array.length) {
                        return { done: true }
                    }

                    const rowIndex = index % numRows
                    const colIndex = Math.trunc(index / numRows)
                    const value = array[rowIndex * numRows + colIndex]

                    index++
                    return { value, done: false }
                }
            }
        }
    }
}


class Board {
    constructor(size) {
        this.size = size
        this.len = this.size * this.size
        this.data = new Int32Array(this.len)
        this.turn = 1
        this.players = 2
        this.winCondition = 5
    }

    setWinCondition(n) {
        this.winCondition = n
    }

    setPlayerAmount(n) {
        this.players = n
    }

    setStartPlayer(i) {
        if (i < 1 || i > this.players) {
            return
        }
        this.turn = i
    }

    performTurn(i) {
        if (this.data[i]) {
            return 0
        }

        const player = this.turn
        const next = this.turn + 1

        this.turn = next > this.players ? 1 : next
        this.data[i] = player

        this.checkWinCondition()

        return player
    }

    checkWinCondition() {
        const inRows = hasConsecutiveBy(
            this.data,
            this.winCondition,
            this.size, [0]
        )
        const inCols = hasConsecutiveBy(
            columnIterator(this.data, this.size),
            this.winCondition,
            this.size, [0]
        )
        console.log(inRows, inCols);
        return inRows ? inRows : inCols
    }

    index(rowIndex, colIndex) {
        if (rowIndex < 0 || rowIndex >= this.size ||
            colIndex < 0 || colIndex >= this.size) {
            throw new Error(`Invalid indices: (${rowIndex}, ${colIndex})`)
        }

        return rowIndex * this.size + colIndex
    }

    clear() {
        this.data.fill(0)
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

            cell.addEventListener("gameTurn", (event) => {
                cell.classList.add(`player-${event.detail}`)
            })
            cell.classList.add("cell")
            cell.id = i.toString()

            this.board.appendChild(cell)
        }
    }

    clear() {
        for (let cell of this.board.children) {
            cell.classList.remove(cell.classList.item(1))
        }
    }
}

const board = document.querySelector(".board")
let settings = {
    size: 10,
    winCondition: 5,
    startPlayer: 1,
    players: 2
}

let boardView = new HTMLBoardView(board, settings.size)
let boardModel = new Board(settings.size)

boardModel.setStartPlayer(settings.startPlayer)
boardModel.setPlayerAmount(settings.players)
boardModel.setWinCondition(settings.winCondition)

board.addEventListener("click", (event) => {
    const target = event.target

    if (!target.classList.contains("cell")) {
        return
    }

    const gameTurnEvent = new CustomEvent("gameTurn", {
        detail: boardModel.performTurn(Number(target.id))
    })

    target.dispatchEvent(gameTurnEvent)
})

document.getElementById("clear-button").addEventListener("click", (event) => {
    boardModel.clear()
    boardView.clear()
})