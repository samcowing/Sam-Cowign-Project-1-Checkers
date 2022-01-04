// Pseudocoding for JS

// To win:
// a. Either all number 12 and below OR 13 and up must be gone from the game board.
// b. If a player has no more moves, they lose

// Needs: 
// - make a representation of the board on the back-end (use an array object)
// - make DOM variables
// - create turns and scores


const start = document.querySelector('#start')
const squares = document.querySelectorAll('td.inPlay')
const bPieces = document.querySelectorAll('.blackPiece')
const rPieces = document.querySelectorAll('.redPiece')
const board = [
    null, 1, null, 2, null, 3, null, 4,
    5, null, 6, null, 7, null, 8, null,
    null, 9, null, 10, null, 11, null, 12,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    13, null, 14, null, 15, null, 16, null,
    null, 17, null, 18, null, 19, null, 20,
    21, null, 22, null, 23, null, 24, null
]
let turn = true
// 1
start.addEventListener("click", switchTurn) 
// 2 

console.log(turn)

function playerTurn() {
    if (turn === true) {
        for (let i = 0; i < 12; i++) {
            rPieces[i].addEventListener("click", clickHandler)
            console.log("test red turn")
        }
    } else {
        for (let i = 0; i < 12; i++) {
            bPieces[i].addEventListener("click", clickHandler)
            console.log("test black turn")
        }
    }
}
// 4
function clearGlow(pieces) {
    for (let i = 0; i < 12; i++) {
        pieces[i].style.boxShadow = null
        //console.log(squares[i].style)
    }
    //console.log("4")
} 

function clearActive(pieces) {
    for (let i = 0; i < 12; i++) {
        pieces[i].removeEventListener("click", clickHandler)
        //console.log(squares[i].style)
    }
    //console.log("4")
} 

function clearSquares(squares) {
    for (let i = 0; i < 32; i++) {
        squares[i].style.border = "2px solid gray"
        squares[i].removeEventListener("click", squareAction)
    }
    //console.log("4")
} 
//console.log(checkActive(bPieces))
// 5
function clickHandler(evt) {
    clearSquares(squares)
    piece = evt.target
    if (piece.style.boxShadow === "rgb(60, 190, 199) 0px 0px 10px 5px") {
        clearGlow(bPieces) 
        clearGlow(rPieces)
    }
    else {
        clearGlow(bPieces)
        clearGlow(rPieces)
        piece.style.boxShadow = "0 0 10px 5px rgb(60, 190, 199)"
    }
    //clearActive(bPieces)
    child = piece
    parent = piece.parentElement
    spotChoices()
}   

// new
function spotChoices() {
    let spot1 = []
    let spot2 = []
    y = parent.cellIndex
    x = parent.parentElement.rowIndex
    if (turn === true) {  
        y1 = y - 1
        newX = x + 1
        y2 = y + 1
    } else {
        y1 = y - 1
        newX = x - 1
        y2 = y + 1
    }
    spot1.push(newX, y1)
    console.log(spot1)
    spot2.push(newX, y2)
    console.log(spot2)
    availableSpots()
}

// 7
function availableSpots() {
    for (let i = 0; i < 32; i++) {
        if (squares[i].childElementCount === 0 && squares[i].parentElement.rowIndex === newX && (squares[i].cellIndex === y1 || squares[i].cellIndex === y2)) {
            //console.log(true)
            squares[i].style.border = "2px solid red"
            //console.log(squares[i].cellIndex)
            //console.log(squares[i].parentElement.rowIndex)
            squares[i].addEventListener("click", squareAction) 
            //endTurn()
        } else {
            //console.log(false)
            //console.log("7b")
        }
    } //console.log("7")
    //endTurn()
}

function squareAction(evt) {
    squareAvailable = evt.target
    console.log("square clicked")
    parent.removeChild(child);
    squareAvailable.appendChild(child)
    availableSpots()
    console.log(squares)
    console.log("7a")
    endTurn()
}

function endTurn() {
    console.log("is this working?")
    for (let i = 0; i < 32; i++) {
        squares[i].style.border = "2px solid gray"
        squares[i].removeEventListener("click", squareAction)
    }
    switchTurn()
}

console.log("Done?")

// Switching turns

function switchTurn() {
    clearActive(bPieces)
    clearGlow(bPieces)
    clearActive(rPieces)
    clearGlow(rPieces)
    console.log("are you getting to clear pieces?")
    if (turn) {
        turn = false
        console.log("black piece turn")
    } else {
        turn = true
        console.log("red piece turn")
    }
    playerTurn()
}
console.log(turn)