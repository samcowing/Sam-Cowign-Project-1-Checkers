// Pseudocoding for JS

// To win:
// a. Either all number 12 and below OR 13 and up must be gone from the game board.
// b. If a player has no more moves, they lose

// Needs: 
// - make a representation of the board on the back-end (use an array object)
// - make DOM variables
// - create turns and scores
// 

const start = document.querySelector('#start')
const squares = document.querySelectorAll('td.inPlay')
const bPieces = document.querySelectorAll('.blackPiece')
const rPieces = document.querySelectorAll('.redPiece')
//const b14 = document.querySelector('#b14')

//console.log(squares)
//console.log(bPieces)

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
// 1
/*start.addEventListener("click", function() {
    console.log("1")
    bTurn()
})*/
// 2
//function bTurn() {
    for (let i = 0; i < 12; i++) {
        bPieces[i].addEventListener("click", clickHandler)
        //bPieces[i].draggable = true
    }
    //console.log("2")
//} 
// 3
function rTurn() {
    for (let i = 0; i < 12; i++) {
        rPieces[i].addEventListener("click", clickHandler3)
        //bPieces[i].draggable = true
    }
    //console.log("3")
} 
// 4
function clearActive(pieces) {
    for (let i = 0; i < 12; i++) {
        pieces[i].style.boxShadow = null
        //console.log(squares[i].style)
    }
    //console.log("4")
} 
//console.log(checkActive(bPieces))
// 5
function clickHandler(evt) {
    bSelected = evt.target
    if (bSelected.style.boxShadow === "rgb(60, 190, 199) 0px 0px 10px 5px") {
        bSelected.style.boxShadow = null 
        //console.log(bSelected.offsetParent.cellIndex)
        //console.log(bSelected.offsetParent.parentElement.rowIndex)
        //console.log("5a")
    }
    else {
        clearActive(bPieces)
        bSelected.style.boxShadow = "0 0 10px 5px rgb(60, 190, 199)"
        //bColumn = bSelected.parentElement.cellIndex
        //bRow = bSelected.parentElement.parentElement.rowIndex
        //bColumn = 4
        //bRow = 1
        //console.log("5b")
    }
    //console.log(bColumn)
    //console.log(bRow)
    //console.log(b14)
    //console.log(bPieces)
    //console.log(evt)
    //availableSpots(evt)
    child = bSelected
    parent = bSelected.parentElement
    spotChoices()
    //console.log("5")
    //availableSpots()
}   
// 6
function clickHandler3(evt) {
    rSelected = evt.target
    if (rSelected.style.boxShadow === "rgb(60, 190, 199) 0px 0px 10px 5px") {
        rSelected.style.boxShadow = null 
        //console.log("6a")
    }
    else {
        clearActive(bPieces)
        rSelected.style.boxShadow = "0 0 10px 5px rgb(60, 190, 199)"
        //console.log("6b")
    }
    //console.log(evt)
    //availableSpots(evt)
    child = rSelected
    parent = rSelected.parentElement
    //console.log("6")
}
// new
function spotChoices() {
    let spot1 = []
    let spot2 = []
    console.log(parent)
    y = parent.cellIndex
    x = parent.parentElement.rowIndex
    y1 = y - 1
    newX = x - 1
    y2 = y + 1
    //console.log([newX, y1], [newX, y2])
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
            squares[i].addEventListener("click", function(evt) {
                squareAvailable = evt.target
                console.log("square clicked")
                parent.removeChild(child);
                squareAvailable.appendChild(child)
                availableSpots()
                console.log(squares)
                console.log("7a")
            }) 
        } else {
            //console.log(false)
            //console.log("7b")
        }
        rTurn()
    } //console.log("7")
}

console.log("Done?")
/*
function moveSpot() {
    if (availableSpots() = true) {
        bPieces[i].addEventListener("click", clickHandler)
    }
}*/
/*
function clickHandler2(evt2) {
    squareAvailable = evt2.target
    console.log("square clicked")
    bParent.removeChild(bSelected);
    squareAvailable.appendChild(bSelected)
    availableSpots()
    //console.log(squares)
}
*/
