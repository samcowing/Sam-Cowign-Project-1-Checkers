// Pseudocoding for JS

// To win:
// a. Either all number 12 and below OR 13 and up must be gone from the game board.
// b. If a player has no more moves, they lose

// Needs: 
// - make a representation of the board on the back-end (use an array object)
// - make DOM variables
// - create turns and scores

const table = document.querySelectorAll('table')
//console.log(table)
const start = document.querySelector('#start')
const squares = document.querySelectorAll('td.inPlay')
bPieces = document.querySelectorAll('.blackPiece')
const bClass = document.querySelectorAll('.blackPiece')
rPieces = document.querySelectorAll('.redPiece')
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
let jumpR = false
let jumpL = false
let test = true
let winner = false
let jumpAvailable = false
//let winTest = false
// 1
start.addEventListener("click", switchTurn) 
// 2 

//console.log(turn)

switchTurn()

function testIds(classTest) {
    for (let i = 0; i < 12; i++) {
        console.log(classTest[i].id)
    }
}
//console.log(testIds(bClass))

function playerTurn() {
    winTest = false
    if (turn === true) {
        for (let i = 0; i < rPieces.length; i++) {
            rPieces[i].addEventListener("click", clickHandler)
            //console.log("test red turn")
        }
    } else {
        for (let i = 0; i < bPieces.length; i++) {
            bPieces[i].addEventListener("click", clickHandler)
            //console.log("test black turn")
        }
    }
}
// 4
function clearGlow(pieces) {
    for (let i = 0; i < pieces.length; i++) {
        pieces[i].style.boxShadow = null
        //console.log(squares[i].style)
    }
    //console.log("4")
} 

function clearActive(pieces) {
    for (let i = 0; i < pieces.length; i++) {
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
    spotChoices(parent.parentElement.rowIndex, parent.cellIndex)
    //winCondition1()
}   

// new
function spotChoices(x, y) {
    let spot1 = []
    let spot2 = []
    if (turn === true) {  
        y1 = y + 1
        x1 = x + 1
        y2 = y - 1
    } else {
        y1 = y - 1
        x1 = x - 1
        y2 = y + 1
    }
    spot1.push(x1, y1)
    //console.log(spot1)
    spot2.push(x1, y2)
    //console.log(spot2)
    availableSpots(x1, y1, y2)
}

function jumpSpotRight(x, y) {
    let spotR = []
    if (turn === true) {  
        x1 = x + 1
        y2 = y - 1
    } else {
        x1 = x - 1
        y2 = y + 1
    }
    console.log("end of left right fnct")
    jumpR = true
    availableSpots(x1, null, y2)
}

function jumpSpotLeft(x, y) {
    let spotL = []
    if (turn === true) {  
        x1 = x + 1
        y1 = y + 1
    } else {
        x1 = x - 1
        y1 = y - 1

    }
    jumpL = true
    console.log("end of left jump fnct")
    availableSpots(x1, y1, null)
}
// 7
function availableSpots(x, ya, yb) {
    for (let i = 0; i < 32; i++) {
        if (squares[i].parentElement.rowIndex === x && (squares[i].cellIndex === ya || squares[i].cellIndex === yb)) {
            if (squares[i].childElementCount === 0) {
                if ((winTest === false) && (jumpL === false) && (jumpR === false)) {
                    squares[i].style.border = "2px solid red"
                    squares[i].addEventListener("click", squareAction)
                } else if (winTest === false) {
                    squares[i].style.border = "2px solid red"
                    squares[i].addEventListener("click", squareAction)
                    jumpAvailable = true
                } else { 
                    let arr = []
                    arr.push(i)
                    squares[i].style.border = "2px solid blue"
                    winCondition2(arr.length)        
                }
            } else if ((squares[i].childElementCount === 1) && (squares[i].firstChild.className !== player)) {
                if ((squares[i].cellIndex === ya) && (jumpL === false)) {
                    let enemyX = squares[i].parentElement.rowIndex
                    let enemyY = squares[i].cellIndex
                    enemyL = squares[i]
                    jumpSpotLeft(enemyX, enemyY)
                } else if (squares[i].cellIndex === yb && (jumpR === false))  {
                    let enemy2X = squares[i].parentElement.rowIndex
                    let enemy2Y = squares[i].cellIndex
                    enemyR = squares[i]
                    jumpSpotRight(enemy2X, enemy2Y)
                }
            } else { jump = false}
        } 
    } 
}

function squareAction(evt) {
    squareAvailable = evt.target
    console.log(squareAvailable.cellIndex)
    //console.log("square clicked")
    parent.removeChild(child);
    console.log(parent.cellIndex)
    squareAvailable.appendChild(child)
    if (parent.cellIndex === (squareAvailable.cellIndex + 1) || parent.cellIndex === (squareAvailable.cellIndex - 1)) {
        jumpR = false
        jumpL = false
    }
    if (turn === true) {
        if ((jumpL === true) && (parent.cellIndex < squareAvailable.cellIndex)) {
            enemyL.firstChild.classList.remove("redPiece")
            enemyL.firstChild.classList.remove("blackPiece")
            enemyL.removeChild(enemyL.childNodes[0])
            jumpR = false
            jumpL = false
        }
        if ((jumpR === true) && (parent.cellIndex > squareAvailable.cellIndex)) {
            enemyR.firstChild.classList.remove("redPiece")
            enemyR.firstChild.classList.remove("blackPiece")
            enemyR.removeChild(enemyR.childNodes[0])
            jumpR = false
            jumpL = false
        }
    } 
    if (turn !== true) {
        if ((jumpL === true) && (parent.cellIndex > squareAvailable.cellIndex)) {
            enemyL.firstChild.classList.remove("redPiece")
            enemyL.firstChild.classList.remove("blackPiece")
            enemyL.removeChild(enemyL.childNodes[0])
            jumpR = false
            jumpL = false
        }
        if ((jumpR === true) && (parent.cellIndex < squareAvailable.cellIndex)) {
            enemyR.firstChild.classList.remove("redPiece")
            enemyR.firstChild.classList.remove("blackPiece")
            enemyR.removeChild(enemyR.childNodes[0])
            jumpR = false
            jumpL = false
        }
    } 
    //checkDoubleJump()
    endTurn()
}

function endTurn() {
    //console.log("is this working?")
    for (let i = 0; i < 32; i++) {
        squares[i].style.border = "2px solid gray"
        squares[i].removeEventListener("click", squareAction)
    }
    switchTurn()
}

//console.log("Done?")

// Switching turns

function switchTurn() {
    bPieces = document.querySelectorAll('.blackPiece')
    rPieces = document.querySelectorAll('.redPiece')
    console.log(bPieces.length)
    clearActive(bPieces)
    clearGlow(bPieces)
    clearActive(rPieces)
    clearGlow(rPieces)
    //console.log("are you getting to clear pieces?")
    if (turn) {
        turn = false
        player = "blackPiece"
        //console.log("black piece turn")
    } else {
        turn = true
        player = "redPiece"
        //console.log("red piece turn")
    }
    winCondition1()
}

function winCondition1() {
    winTest = true
    if (bPieces.length === 0) {
        console.log("RED WON OUTRIGHT")
    }
    if (rPieces.length === 0) {
        console.log("BLACK WON OUTRIGHT")
    }
     // 2. Player has no more moves
    if (turn === true)
        for (let i = 0; i < rPieces.length; i++) {
            console.log(rPieces[i])
            let x = rPieces[i].parentElement.parentElement.rowIndex 
            let y = rPieces[i].parentElement.cellIndex 
            spotChoices(x, y)
    } else {
        for (let i = 0; i < bPieces.length; i++) {
            console.log(bPieces[i])
            let x = bPieces[i].parentElement.parentElement.rowIndex 
            let y = bPieces[i].parentElement.cellIndex 
            spotChoices(x, y)
        }
    } 
    //spotChoices(x, y)
    winCondition2()
    playerTurn()
}

function winCondition2(spacesLeft) {
    console.log(spacesLeft)
    if (spacesLeft === 0) {
        console.log("Player has won")
    } else {
        console.log('no winner yet')
    }
    ///winTest = false
    jumpL = false
    jumpR = false
}

/*
function checkDoubleJump() {
    winTest = true
    if (turn === true) {
        console.log(piece)
        let x = piece.parentElement.parentElement.rowIndex 
        let y = piece.parentElement.cellIndex 
        spotChoices(x, y)
    } else {
        console.log(piece)
        let x = piece.parentElement.parentElement.rowIndex 
        let y = piece.parentElement.cellIndex 
        spotChoices(x, y)
        
    } 
    if (jumpAvailable === true) {
        clearActive(bPieces)
        clearActive(rPieces)
        winTest = false
        piece.addEventListener("click", clickHandler)
    }  else {
        endTurn()
    }
    //endTurn()
}
//switchTurn()
*/