var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var currTile;
var otherTile;

window.onload = function() {
    startGame();

    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100);
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)]
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++){
            let tile = document.createElement("img")
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "../images/" + randomCandy() + ".png";


            //drag function
            tile.addEventListener("dragstart", dragStart); //candy click inits drag process
            tile.addEventListener("dragover", dragOver); //while clicking dragging the candy
            tile.addEventListener("dragenter", dragEnter) //dragging a candy on another candy
            tile.addEventListener("dragleave", dragLeave); //leave candy on candy
            tile.addEventListener("drop", dragDrop); //dropping a candy over another candy
            tile.addEventListener("dragend", dragEnd); //after drag process completes switches candy


            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row)  
    }

    console.log(board)
}

function dragStart(){
    currTile = this;
}
function dragOver(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
}
function dragLeave(){
    
}
function dragDrop(){
    otherTile = this;
}
function dragEnd(){

    if (currTile.src.includes("blank") || otherTile.src.includes("blank")){
        return;
    }
    let currCoords = currTile.id.split("-");
    let row = parseInt(currCoords[0])
    let column = parseInt(currCoords[1])

    // console.log(currCoords)
    let otherCoords = otherTile.id.split("-");
    let row2 = parseInt(otherCoords[0]);
    let column2 = parseInt(otherCoords[1]);
    // console.log(otherCoords)

    let moveLeft = column2 == column-1 && row == row2;
    let moveRight = column2 == column+1 && row == row2;

    let moveUp = row2 == row - 1 && column == column2;
    let moveDown = row2 == row + 1 && column == column2;

    let isAdjecent = moveLeft || moveRight || moveDown || moveUp;
    // console.log(isAdjecent);
    // console.log(moveLeft);
    // console.log(moveRight);
    // console.log(moveUp);
    // console.log(moveDown);
    if (isAdjecent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if(!validMove){
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;
        }
    }
}

function crushCandy() {
    //crushFive
    //crushFour
    //find_adjecent_candies();
    crushThree();
    document.getElementById("score").innerText = score;
}

function find_adjecent_candies(){
    let candy1;
    let candy2;
    let candy3;
    let candy4;
    let candy5;
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns - 4; c++){
            candy1 = board[r][c];
            candy2 = board[r][c+1];
            candy3 = board[r][c+2];
            candy4 = board[r][c+3];
            candy5 = board[r][c+4];
            let three_adjecent_candy_check = candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank");
            let four_adjecent_candy_check = three_adjecent_candy_check && candy3.src == candy4.src;
            let five_adjecent_candy_check = four_adjecent_candy_check && candy4.src == candy5.src;
            if (five_adjecent_candy_check){
                candy1.src = "../images/blank.png";
                candy2.src = "../images/blank.png";
                candy3.src = "../images/blank.png";
                candy4.src = "../images/blank.png";
                candy5.src = "../images/blank.png";
                score += 50
            } else if(four_adjecent_candy_check){
                candy1.src = "../images/blank.png";
                candy2.src = "../images/blank.png";
                candy3.src = "../images/blank.png";
                candy4.src = "../images/blank.png";
                score += 40
            } else if(three_adjecent_candy_check){
                candy1.src = "../images/blank.png";
                candy2.src = "../images/blank.png";
                candy3.src = "../images/blank.png";
                score += 30
            }
        }
    }
    for (let c = 0; c < columns; c++){
        for (let r = 0; r < rows - 4; r++){
            candy1 = board[r][c];
            candy2 = board[r+1][c];
            candy3 = board[r+2][c];
            candy4 = board[r+3][c];
            candy5 = board[r+4][c];

            console.log("Horizontal - Row:", r, "Col Start:", c);
            console.log("Candy 1:", candy1);
            console.log("Candy 2:", candy2);
            console.log("Candy 3:", candy3);
            console.log("Candy 4:", candy4);
            console.log("Candy 5:", candy5);

            let three_adjecent_candy_check = candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank");
            let four_adjecent_candy_check = three_adjecent_candy_check && candy3.src == candy4.src;
            let five_adjecent_candy_check = four_adjecent_candy_check && candy4.src == candy5.src;

            if (five_adjecent_candy_check){
                candy1.src = "../images/blank.png";
                candy2.src = "../images/blank.png";
                candy3.src = "../images/blank.png";
                candy4.src = "../images/blank.png";
                candy5.src = "../images/blank.png";
                score += 50
            } else if(four_adjecent_candy_check){
                candy1.src = "../images/blank.png";
                candy2.src = "../images/blank.png";
                candy3.src = "../images/blank.png";
                candy4.src = "../images/blank.png";
                score += 40
            } else if(three_adjecent_candy_check){
                candy1.src = "../images/blank.png";
                candy2.src = "../images/blank.png";
                candy3.src = "../images/blank.png";
                score += 30
            }
        }
    }
}

function crushThree() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "../images/blank.png";
                candy2.src = "../images/blank.png";
                candy3.src = "../images/blank.png";
                score += 30;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "../images/blank.png";
                candy2.src = "../images/blank.png";
                candy3.src = "../images/blank.png";
                score += 30;
            }
        }
    }
}

function checkValidNotGood(){
    let candy1;
    let candy2;
    let candy3;
    let candy4;
    let candy5;
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns - 4; c++){
            candy1 = board[r][c];
            candy2 = board[r][c+1];
            candy3 = board[r][c+2];
            candy4 = board[r][c+3];
            candy5 = board[r][c+4];

            let three_adjecent_candy_check = candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank");
            let four_adjecent_candy_check = three_adjecent_candy_check && candy3.src == candy4.src;
            let five_adjecent_candy_check = four_adjecent_candy_check && candy4.src == candy5.src;
            if (three_adjecent_candy_check || four_adjecent_candy_check || five_adjecent_candy_check){
                return true
            }
        }
    }
    for (let c = 0; c < columns; c++){
        for (let r = 0; r < rows - 4; r++){
            candy1 = board[r][c];
            candy2 = board[r+1][c];
            candy3 = board[r+2][c];
            candy4 = board[r+3][c];
            candy5 = board[r+4][c];
            let three_adjecent_candy_check = candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank");
            let four_adjecent_candy_check = three_adjecent_candy_check && candy3.src == candy4.src;
            let five_adjecent_candy_check = four_adjecent_candy_check && candy4.src == candy5.src;
            if (three_adjecent_candy_check || four_adjecent_candy_check || five_adjecent_candy_check){
                return true
            }
        }
    }
    return false
}

function checkValid() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}
function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns-1; r >= 0; r--){
            if (!board[r][c].src.includes("blank")){
                board[ind][c].src = board[r][c].src
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r--){
            board[r][c].src = "..images/blank.png";
        }
    }
}

function generateCandy() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")){
            board[0][c].src = "images/" + randomCandy() + ".png";
        }
    }
}