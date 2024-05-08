let load = document.getElementById("loading");
let a = document.getElementById("game");
let option = a.className;

var rows = 4;
var columns = 4;

var currTile;
var otherTile;

var turns = 0;

//xáo trộn mảng logic
function shuffleArray(array, moves) {
    function findEmptyCell() {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                if (array[i][j] === 16) {
                    return { x: i, y: j };
                }
            }
        }
    }

    function isValidMove(x, y) {
        return x >= 0 && x < 4 && y >= 0 && y < 4;
    }

    const directions = [{ dx: 0, dy: 1 }, { dx: 0, dy: -1 }, { dx: 1, dy: 0 }, { dx: -1, dy: 0 }];

    for (let i = 0; i < moves; i++) {
        const emptyCell = findEmptyCell();
        const { x, y } = emptyCell;
        const randomDirection = directions[Math.floor(Math.random() * 4)];
        const newX = x + randomDirection.dx;
        const newY = y + randomDirection.dy;

        if (isValidMove(newX, newY)) {
            [array[x][y], array[newX][newY]] = [array[newX][newY], array[x][y]];
        }
    }
}

const arrayG = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
];

const moves = 250;

shuffleArray(arrayG, moves);
// console.log("Mảng sau khi xáo trộn:");
// console.log(arrayG);
const imgOrder = arrayG.reduce((acc, curr) => [...acc, ...curr], []);
// console.log(imgOrder);
//--> mảng 4x4 đã được xáo trộn


//bắt đầu trò chơi
window.onload = function() {
    setTimeout(function(){
        load.classList.add("loadingtransion");
    }, 2000);
    setTimeout(function(){
        load.style.display = 'none';
    }, 2000);

    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {

            //<img id="0-0" src="1.jpg">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "picture/" + option + imgOrder.shift() + ".png";

            //chơi bằng cách kéo thả
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles

            //chơi bằng cách click
            tile.addEventListener("click", handleClick);

            document.getElementById("board").append(tile);
        }
    }
    // document.addEventListener("keydown", handleKeyPress);
}

//xử lí khi chơi click
function handleClick() {
    // hinh click
    currTile = this;
    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);
    
    let rightTile = document.getElementById(r + "-" + (c+1));
    let leftTile = document.getElementById(r + "-" + (c-1));
    let upTile = document.getElementById(r-1 + "-" + c);
    let downTile = document.getElementById(r+1 + "-" + c);
  
    if(rightTile && rightTile.src.includes(option + "16.png")){
      otherTile = rightTile;
      hoandoi();
    }
    else if(downTile && downTile.src.includes(option + "16.png")){
      otherTile = downTile;
      hoandoi();
    }
    else if(leftTile && leftTile.src.includes(option + "16.png")){
      otherTile = leftTile;
      hoandoi();
    }
    else if(upTile && upTile.src.includes(option + "16.png")){
      otherTile = upTile;
      hoandoi();
    }
  
    function hoandoi(){
      let currImg = currTile.src;
      let otherImg = otherTile.src;
    
      currTile.src = otherImg;
      otherTile.src = currImg;
    
      turns += 1;
      document.getElementById("turns").innerText = turns;
    }
    kiemtra()
}
function kiemtra(){
    var arr = Array.from({ length: 16 }, (_, i) => i + 1);
    for(i = 0; i<4; i++){
        for(j = 0; j<4; j++){
            let a = document.getElementById(i+'-'+j);
            if(!(a.src.includes(option + arr.shift() +".png"))){
                return;
            }
        }
    }
    thongbao();
}
function thongbao(){
    let tile = document.getElementById("End")
    tile.style.zIndex = "1";
    setTimeout(function(){
        let tile = document.getElementById("End")
        tile.classList.add("fade-in");
        tile.style.opacity = "1";
    }, 1000)
}

//xử lí khi chơi kéo thả
function dragStart() {
    currTile = this; //this refers to the img tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd() {
    if (!otherTile.src.includes(option + "16.png")) {
        return;
    }

    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }
    kiemtra();
}
