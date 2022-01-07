const table = document.querySelectorAll('table')
const start = document.querySelector('#start')
const squares = document.querySelectorAll('td.inPlay')
bPieces = document.querySelectorAll('.blackPiece')
const bClass = document.querySelectorAll('.blackPiece')
rPieces = document.querySelectorAll('.redPiece')
let turn = true
let jumpR = false
let jumpL = false
let test = true
let winner = false
let jumpAvailable = false
let kingTestR = false
let kingTestL = false


start.addEventListener("click", switchTurn) 

switchTurn()

function playerTurn() {
    winTest = false
    if (turn === true) {
        for (let i = 0; i < rPieces.length; i++) {
            rPieces[i].addEventListener("click", clickHandler)
        }
    } else {
        for (let i = 0; i < bPieces.length; i++) {
            bPieces[i].addEventListener("click", clickHandler)
        }
    }
}

function clearGlow(pieces) {
    for (let i = 0; i < pieces.length; i++) {
        pieces[i].style.boxShadow = null
    }
} 

function clearActive(pieces) {
    for (let i = 0; i < pieces.length; i++) {
        pieces[i].removeEventListener("click", clickHandler)
        //put jump clears here??
    }
} 

function clearSquares(squares) {
    for (let i = 0; i < 32; i++) {
        squares[i].style.border = "2px solid gray"
        squares[i].removeEventListener("click", squareAction)
    }
} 

function clickHandler(evt) {
    bPieces = document.querySelectorAll('.blackPiece')
    rPieces = document.querySelectorAll('.redPiece')
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
    parent = piece.parentElement
    spotChoices(parent.parentElement.rowIndex, parent.cellIndex, piece)
}   

function spotChoices(x, y, pieces) {
    if (turn === true) {  
        y1 = y + 1
        x1 = x + 1
        y2 = y - 1
        if (pieces.classList.contains("king")) {
            x2 = x - 1
        } else {
            x2 = null
        }
    } 
    if (turn === false) {
        y1 = y - 1
        x1 = x - 1
        y2 = y + 1
        if (pieces.classList.contains("king")) {
            x2 = x + 1
        } else {
            x2 = null

        }
    }
    availableSpots(x1, y1, y2, x2)
}

function jumpSpotRight(x, y, pieces, xb, square) {
    if (turn === true) {  
        if (pieces.classList.contains("king") && (kingTestR === false) && (x === null)) {
            x2 = xb - 1
            y2 = y - 1
            //console.log(square + " red king right action")
            kingTestR = true
            availableSpots(null, null, y2, x2)
        } else {
            x1 = x + 1
            y2 = y - 1
            //console.log(square + " red right action")
            jumpR = true
            availableSpots(x1, null, y2, null)
        }
    } 
    if (turn === false) {
        if (pieces.classList.contains("king") && (kingTestR === false)  && (x === null)) {
            x2 = xb + 1
            y2 = y + 1
            kingTestR = true
            availableSpots(null, null, y2, x2)
        } else {
            x1 = x - 1
            y2 = y + 1
            jumpR = true
            availableSpots(x1, null, y2, null)
            
        }
    }
    availableSpots(x1, null, y2, x2)
}

function jumpSpotLeft(x, y, pieces, xb, square) {
    if (turn === true) {  
        if (pieces.classList.contains("king") && (kingTestL === false) && (x === null)) {
            x2 = xb - 1
            y1 = y + 1
            //console.log(square + " red king left action")
            kingTestL = true
            availableSpots(null, y1, null, x2)
        } else {
            x1 = x + 1
            y1 = y + 1
            //console.log(square + " red left action")
            jumpL = true
            availableSpots(x1, y1, null, null)
        }
    } else {
        if (pieces.classList.contains("king") && (kingTestL === false) && (x === null)) {
            x2 = xb + 1
            y1 = y - 1
            kingTestL = true
            availableSpots(null, y1, null, x2)
        } else {
            x1 = x - 1
            y1 = y - 1
            jumpL = true
            availableSpots(x1, y1, null, null)
        }
    }
}
// 7
function availableSpots(x, ya, yb, xb) {
    for (let i = 0; i < 32; i++) {
        if ((squares[i].parentElement.rowIndex === x || squares[i].parentElement.rowIndex === xb) && (squares[i].cellIndex === ya || squares[i].cellIndex === yb)) {
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
                    isTheseSpace(player)      
                }
            } else if ((squares[i].childElementCount === 1) && (squares[i].firstChild.className !== player)) {
                if ((squares[i].cellIndex === ya) && (kingTestL === false) && (squares[i].parentElement.rowIndex === xb)) {
                    let enemyX = squares[i].parentElement.rowIndex
                    let enemyY = squares[i].cellIndex
                    enemyLK = squares[i]
                    console.log(enemyLK.firstChild.id + " king left")
                    jumpSpotLeft(null, enemyY, piece, enemyX, enemyLK.firstChild.id)
                } else if ((squares[i].cellIndex === yb) && (kingTestR === false) && (squares[i].parentElement.rowIndex === xb))  {
                    let enemy2X = squares[i].parentElement.rowIndex
                    let enemy2Y = squares[i].cellIndex
                    enemyRK = squares[i]
                    console.log(enemyRK.firstChild.id + " king right")
                    jumpSpotRight(null, enemy2Y, piece, enemy2X, enemyRK.firstChild.id)
                }
                if ((squares[i].cellIndex === ya) && (jumpL === false) && (squares[i].parentElement.rowIndex === x)) {
                    let enemyX = squares[i].parentElement.rowIndex
                    let enemyY = squares[i].cellIndex
                    enemyL = squares[i]
                    console.log(enemyL.firstChild.id+ " left")
                    jumpSpotLeft(enemyX, enemyY, piece, null, enemyL.firstChild.id)
                } else if ((squares[i].cellIndex === yb) && (jumpR === false) && (squares[i].parentElement.rowIndex === x))  {
                    let enemy2X = squares[i].parentElement.rowIndex
                    let enemy2Y = squares[i].cellIndex
                    enemyR = squares[i]
                    console.log(enemyR.firstChild.id + " right")
                    jumpSpotRight(enemy2X, enemy2Y, piece, null, enemyR.firstChild.id)
                }
            } else { jump = false}
        } 
    } 
}

function squareAction(evt) {
    squareAvailable = evt.target
    parent.removeChild(piece);
    squareAvailable.appendChild(piece)
    if (parent.cellIndex === (squareAvailable.cellIndex + 1) || parent.cellIndex === (squareAvailable.cellIndex - 1)) {
        jumpR = false
        jumpL = false
        kingTestL = false
        kingTestR = false
    }
    if (((turn === true) && (parent.parentElement.rowIndex < squareAvailable.parentElement.rowIndex)) || ((turn === false) && (parent.parentElement.rowIndex < squareAvailable.parentElement.rowIndex))) {
        if (((jumpL === true) || (kingTestR === true)) && (parent.cellIndex < squareAvailable.cellIndex)) {
            if (turn === true) {
                enemyL.firstChild.classList.remove("redPiece")
                enemyL.firstChild.classList.remove("blackPiece")
                enemyL.firstChild.classList.add("removed")
                enemyL.removeChild(enemyL.childNodes[0])
                jumpR = false
                jumpL = false
                kingTestL = false
                kingTestR = false
            } else {
                enemyRK.firstChild.classList.remove("redPiece")
                enemyRK.firstChild.classList.remove("blackPiece")
                enemyRK.firstChild.classList.add("removed")
                enemyRK.removeChild(enemyRK.childNodes[0])
                jumpR = false
                jumpL = false
                kingTestL = false
                kingTestR = false
            }
        }
        if (((jumpR === true) || (kingTestL === true)) && (parent.cellIndex > squareAvailable.cellIndex)) {
            if (turn === true) {
                enemyR.firstChild.classList.remove("redPiece")
                enemyR.firstChild.classList.remove("blackPiece")
                enemyR.firstChild.classList.add("removed")
                enemyR.removeChild(enemyR.childNodes[0])
                console.log("remove enemy 2 log")
                jumpR = false
                jumpL = false
                kingTestL = false
                kingTestR = false
            } else {
                enemyLK.firstChild.classList.remove("redPiece")
                enemyLK.firstChild.classList.remove("blackPiece")
                enemyLK.firstChild.classList.add("removed")
                enemyLK.removeChild(enemyLK.childNodes[0])
                console.log("remove enemy 2 log")
                jumpR = false
                jumpL = false
                kingTestL = false
                kingTestR = false
            }
        }
    } 
    if (((turn === false) && (parent.parentElement.rowIndex > squareAvailable.parentElement.rowIndex)) || ((turn === true) && (parent.parentElement.rowIndex > squareAvailable.parentElement.rowIndex))) {
        if (((jumpL === true) || (kingTestR === true)) && (parent.cellIndex > squareAvailable.cellIndex)) {
            if (turn === false) {
                enemyL.firstChild.classList.remove("redPiece")
                enemyL.firstChild.classList.remove("blackPiece")
                enemyL.firstChild.classList.add("removed")
                enemyL.removeChild(enemyL.childNodes[0])
                console.log("remove enemy 3 log")
                jumpR = false
                jumpL = false
                kingTestL = false
                kingTestR = false
            } else {
                enemyRK.firstChild.classList.remove("redPiece")
                enemyRK.firstChild.classList.remove("blackPiece")
                enemyRK.firstChild.classList.add("removed")
                enemyRK.removeChild(enemyRK.childNodes[0])
                console.log("remove enemy 3 log")
                jumpR = false
                jumpL = false
                kingTestL = false
                kingTestR = false
            }
        }
        if (((jumpR === true) || (kingTestL === true)) && (parent.cellIndex < squareAvailable.cellIndex)) {
            if (turn === false) {
                enemyR.firstChild.classList.remove("redPiece")
                enemyR.firstChild.classList.remove("blackPiece")
                enemyR.firstChild.classList.add("removed")
                enemyR.removeChild(enemyR.childNodes[0])
                console.log("remove enemy 4 log")
                jumpR = false
                jumpL = false
            } else {
                enemyLK.firstChild.classList.remove("redPiece")
                enemyLK.firstChild.classList.remove("blackPiece")
                enemyLK.firstChild.classList.add("removed")
                enemyLK.removeChild(enemyLK.childNodes[0])
                console.log("remove enemy 3 log")
                jumpR = false
                jumpL = false
                kingTestL = false
                kingTestR = false
            }
        }
    } 
    endTurn()
}

function endTurn() {
    for (let i = 0; i < 32; i++) {
        squares[i].style.border = "2px solid gray"
        squares[i].removeEventListener("click", squareAction)
    }
    makeKing(piece)
}

function makeKing(pieces) {
    if (turn === true){
        if ((pieces.parentElement.parentElement.rowIndex === 7) && (winTest === false)) {
            pieces.classList.add("king")
            console.log('made a red king')
            pieces.innerText = "K"
            switchTurn()
        }
        else {switchTurn()}
    } else {
        if ((pieces.parentElement.parentElement.rowIndex === 0) && (winTest === false)) {
            pieces.classList.add("king")
            console.log('made a black king')
            pieces.innerText = "K"
            switchTurn()
        }
        else {switchTurn()}
    } 
}

function switchTurn() {
    bPieces = document.querySelectorAll('.blackPiece')
    rPieces = document.querySelectorAll('.redPiece')
    clearActive(bPieces)
    clearGlow(bPieces)
    clearActive(rPieces)
    clearGlow(rPieces)
    if (turn) {
        turn = false
        player = "blackPiece"
    } else {
        turn = true
        player = "redPiece"
    }
    winCondition1()
}

function winCondition1() {
    bPieces = document.querySelectorAll('.blackPiece')
    rPieces = document.querySelectorAll('.redPiece')
    winTest = true
    if (bPieces.length === 0) {
        console.log("RED WON OUTRIGHT")
    }
    if (rPieces.length === 0) {
        console.log("BLACK WON OUTRIGHT")
    }
    if (turn === true)
        for (let i = 0; i < rPieces.length; i++) {
            bPieces = document.querySelectorAll('.blackPiece')
            rPieces = document.querySelectorAll('.redPiece')
            let x = rPieces[i].parentElement.parentElement.rowIndex 
            let y = rPieces[i].parentElement.cellIndex 
            let p = rPieces[i]
            spotChoices(x, y, p)
    } else {
        for (let i = 0; i < bPieces.length; i++) {
            bPieces = document.querySelectorAll('.blackPiece')
            let x = bPieces[i].parentElement.parentElement.rowIndex 
            let y = bPieces[i].parentElement.cellIndex 
            let p = bPieces[i]
            spotChoices(x, y, p)
        }
    } 
    playerTurn()
}

function isTheseSpace(pieces) {
    let spaceCount = 0
    for (let i = 0; i < 32; i++) {
        if (squares[i].style.border === "2px solid blue") {
            spaceCount += 1
        }
    }
    jumpL = false
    jumpR = false
    kingTestL = false
    kingTestR = false
    winCondition2(spaceCount, pieces)
}

function winCondition2(spacesCount, pieces) {
    if (spacesCount <= 0) {
        console.log(pieces + " has lost")
    }
    jumpL = false
    jumpR = false
    kingTestL = false
    kingTestR = false
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

