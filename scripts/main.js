var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const myHeading = document.querySelector('h1');
myHeading.textContent = 'Tyler will never get sunstone from the bazaar';

var x = canvas.width/2;
var y = canvas.height/2;

var dx = 2;
var dy = -2;
var fillColor = "green"
var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var mouseOverCanvas = false;
var mousePosX = -1;
var mousePosY = -1;

var rect = canvas.getBoundingClientRect();

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.closePath();

    if(y + dy < ballRadius) {
        dy = -dy;
        fillColor = "#0095DD";
    }
    else if (y + dy > canvas.height - ballRadius){
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        fillColor = "magenta";
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    x += dx;
    y += dy;

    if(rightPressed) {
        paddleX += 5;
    }
    else if(leftPressed) {
        paddleX -= 5;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseHandler, false);
canvas.addEventListener("mouseenter", mouseOverCanvasHandler, false);
// console.log(rect.top, rect.right, rect.bottom, rect.left);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseOverCanvasHandler(e) {
    mouseOverCanvas = true;
}

function mouseHandler(e) {
    mousePosX = e.clientX;
    mousePosY = e.clientY;
    // console.log("XPOS " + mousePosX + " " + rect.left + " " + rect.right);
    // console.log("YPOS " + mousePosY + " " + rect.top + " " + rect.bottom);
    if (mousePosX > rect.right || mousePosX < rect.left) {
        mouseOverCanvas = false;
    }
    else if (mousePosY < rect.top || mousePosY > rect.bottom)
    {
        mouseOverCanvas = false;
    }
    else {
        mouseOverCanvas = true;
    }
    // console.log(mouseOverCanvas);

    if (mouseOverCanvas) {
        var mouseMovementX = e.movementX;
        var mouseMovementY = e.movementY;
        paddleX += e.movementX;
        paddleY = e.movementY;

        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
        if (paddleX < 0){
            paddleX = 0;
        }
    }
}

var interval = setInterval(draw, 10);