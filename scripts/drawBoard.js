var numHexes;
var hexesPerRow;
var hexWidth = 82;
var hexHeight = 71;
var hexes = new Array(300);
var initializedHexes = false;

// Gets a random int from 0 to max - 1.
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const drawBoard = function() {
    // Grabs canvas elements from the HTML
    var boardCanvas = document.getElementById("boardCanvas");
    var boardCtx = boardCanvas.getContext("2d");

    var topBarCanvas = document.getElementById("topBarCanvas");
    var statCtx = topBarCanvas.getContext("2d");

    var bottomMenuCanvas = document.getElementById("bottomMenuCanvas");
    var menuCtx = bottomMenuCanvas.getContext("2d");

    var splashMenuCanvas = document.getElementById("menuScreen");
    var splashCtx = splashMenuCanvas.getContext("2d");

    // var windowWidth = window.innerWidth;
    // var windowHeight = window.innerHeight;
    var windowWidth = 1920;
    var windowHeight = 1000;

    // Sets the cancas size. dynamic resizing not currently supported.
    function setCanvasSize() {
        boardCanvas.width = windowWidth;
        boardCanvas.height = windowHeight;
        topBarCanvas.width = windowWidth;
        topBarCanvas.height = windowHeight;
        bottomMenuCanvas.width = windowWidth;
        bottomMenuCanvas.height = windowHeight;
        canvasW = boardCanvas.width;
        canvasH = boardCanvas.height;
    }

    // Determines the number of hexes to draw based on hex size and canvas width/height
    function setNumHexes(W, H) {
        hexesPerRow = Math.floor(windowWidth / (W * 1.5) + 1);
        numHexes = ((Math.floor(windowHeight / (H * 2)) * 2) + 1) * hexesPerRow;
    }

    setCanvasSize();
    setNumHexes(hexWidth, hexHeight);

    var mousePosX = -1;
    var mousePosY = -1;
    var hexesPos = new Array(numHexes * 2);
    var canvasBounds = boardCanvas.getBoundingClientRect();

    // Derives coordinates of all points of a hex from the origin point (x,y)
    function getPointsFromOrigin(originX, originY) {
        var pointsArray = new Array(12);

        // m2x
        pointsArray[0] = originX;

        // m2y
        pointsArray[1] = originY + hexHeight / 2;

        // x0
        pointsArray[2] = originX + hexWidth / 4;

        // y0
        pointsArray[3] = pointsArray[1] - hexHeight / 2;

        // x1
        pointsArray[4] = pointsArray[2] + hexWidth /2;

        // y1
        pointsArray[5] = pointsArray[3];

        // x2
        pointsArray[6] = pointsArray[0] + hexWidth;

        // y2
        pointsArray[7] = pointsArray[1];

        // x3
        pointsArray[8] = pointsArray[4];

        // y3
        pointsArray[9] = hexHeight + pointsArray[5];

        // x4
        pointsArray[10] = pointsArray[2];

        // y4
        pointsArray[11] = pointsArray[9];

        return pointsArray;
    }

    // Draws an outline around a hex with the specified dimensions and color
    function drawOutline(m2x, m2y, x0, y0, x1, y1, x2, y2, x3, y3, x4, y4, color, stroke) {
        boardCtx.beginPath();
        boardCtx.moveTo(m2x, m2y);
        boardCtx.lineTo(x0, y0);
        boardCtx.lineTo(x1, y1);
        boardCtx.lineTo(x2, y2);
        boardCtx.lineTo(x3, y3);
        boardCtx.lineTo(x4, y4);
        boardCtx.lineTo(m2x, m2y);
        boardCtx.closePath();
        boardCtx.lineWidth = stroke;
        boardCtx.strokeStyle = color;
        boardCtx.stroke();
    }

    const numHexTypes = 7;
    var hexImgArray = new Array(numHexTypes);
    function loadImgHexes() {
        for (i = 0; i < numHexTypes; i++) {
            hexImgArray[i] = new Image();
        }

        hexImgArray[0].src = "image_sources/ironOre.png";
        hexImgArray[1].src = "image_sources/jewels.png";
        hexImgArray[2].src = "image_sources/leather.png";
        hexImgArray[3].src = "image_sources/spices.png";
        hexImgArray[4].src = "image_sources/stone.png";
        hexImgArray[5].src = "image_sources/wood.png";
        hexImgArray[6].src = "image_sources/grass.png";
    }

    // Draws a line of hexes on the screen and initializes new hex objects.
    function drawLineOfHexes(posX, posY, num, count) {
        let i = 0, hexTypeToDraw = 0, randNum;
        var pointsArray;
        
        // Initializes hex objects
        for (i = 0; i < hexesPerRow - num; i++) {
            if (!initializedHexes) {
                randNum = getRandomInt(31);

                // Determines hex type from random number
                if (randNum > 5) {
                    hexTypeToDraw = 6;
                }
                else {
                    hexTypeToDraw = randNum;
                }
                hexes[count + i] = new Hex(hexTypeToDraw);
                
            }
            else {
                hexTypeToDraw = hexes[count + i].getResourceNum();
            }
            
            // Draws the hex images on the board
            boardCtx.drawImage(hexImgArray[hexTypeToDraw], posX, posY);

            // Gets the points from where each hex is drawn
            pointsArray = getPointsFromOrigin(posX, posY);

            // Stores hex points for hit detection
            hexesPos[count + i] = [pointsArray[0], pointsArray[1], pointsArray[2], pointsArray[3], pointsArray[4], pointsArray[5], pointsArray[6], pointsArray[7],
            pointsArray[8], pointsArray[9], pointsArray[10], pointsArray[11]];

            // Draws outline around each hex
            drawOutline(pointsArray[0], pointsArray[1], pointsArray[2], pointsArray[3], pointsArray[4], pointsArray[5], pointsArray[6], pointsArray[7],
                        pointsArray[8], pointsArray[9], pointsArray[10], pointsArray[11], 'black', 1);
            
            posX += 123;
        }
        return i;
    }

    // (This board is drawn manually)
    function drawImgHexes(startPosX, posY) {
        let posX = startPosX;
        let count = 0;

        boardCtx.clearRect(0, 0, canvasW, canvasH);

        posX += 82;
        count += drawLineOfHexes(posX, posY, 5, count);
        
        posY += 36;
        posX = startPosX + 21;
        count += drawLineOfHexes(posX, posY, 4, count);

        posY += 35;
        posX += 62;
        count += drawLineOfHexes(posX, posY, 4, count);

        posY += 36;
        posX = startPosX + 21;
        count += drawLineOfHexes(posX, posY, 4, count);

        posY += 35;
        posX = startPosX - 40;
        count += drawLineOfHexes(posX, posY, 3, count);

        posY += 36;
        posX = startPosX + 21;
        count += drawLineOfHexes(posX, posY, 4, count);

        posY += 35;
        posX = startPosX - 40;
        count += drawLineOfHexes(posX, posY, 3, count);

        posY += 36;
        posX = startPosX + 21;
        count += drawLineOfHexes(posX, posY, 4, count);

        posY += 35;
        posX = startPosX - 40;
        count += drawLineOfHexes(posX, posY, 4, count);

        posY += 36;
        posX = startPosX + 21 - 123;
        count += drawLineOfHexes(posX, posY, 4, count);

        posY += 35;
        posX = startPosX - 40 - 123;
        count += drawLineOfHexes(posX, posY, 3, count);

        posY += 36;
        posX = startPosX + 21 - 123;
        count += drawLineOfHexes(posX, posY, 4, count);

        posY += 35;
        posX = startPosX - 40 - 123;
        count += drawLineOfHexes(posX, posY, 3, count);

        posY += 36;
        posX = startPosX + 21 - 123;
        count += drawLineOfHexes(posX, posY, 3, count);

        posY += 35;
        posX = startPosX - 40;
        count += drawLineOfHexes(posX, posY, 3, count);

        posY += 36;
        posX = startPosX + 21 - 123;
        count += drawLineOfHexes(posX, posY, 3, count);

        posY += 35;
        posX = startPosX - 40;
        count += drawLineOfHexes(posX, posY, 3, count);

        posY += 36;
        posX = startPosX + 21;
        count += drawLineOfHexes(posX, posY, 3, count);

        initializedHexes = true;
        
        drawStats();
        drawMenu();
    }

    // Draws the bottom menu where game options would be
    function drawMenu() {
        menuCtx.clearRect(0, 0, canvasW, canvasH);
        menuCtx.fillStyle = 'grey';
        menuCtx.fillRect(0, innerHeight - 120, boardCanvas.width, 120);
    }

    // Draws the top part of the menu where game statistics would be.
    function drawStats() {
        statCtx.clearRect(0, 0, canvasW, canvasH);
        statCtx.fillStyle = 'grey';
        statCtx.fillRect(0, 0, boardCanvas.width, 35);
    }

    drawStats();
    drawMenu();
    loadImgHexes();
    hexImgArray[numHexTypes - 1].onload = function() {
        drawImgHexes(225, 106);
    }

    document.addEventListener("mousemove", canvasEdgeScroll, false);
    document.addEventListener("click", mouseHandlerHex, false);
    window.addEventListener("scroll", scrollHandler, false);

    let posXCanvas = 225, posYCanvas = 106;
    function canvasEdgeScroll (e) {
        mousePosX = e.clientX;
        mousePosY = e.clientY;

        if (canvasH > innerHeight) {
            if (mousePosY < 100) {
                if (posYCanvas < 106) {
                    posYCanvas += 5;
                }
                drawImgHexes(posXCanvas, posYCanvas);
            }
            else if (mousePosY > innerHeight - 200 && mousePosY < innerHeight - 120) {
                if (posYCanvas > - canvasH + innerHeight + 100) {
                    posYCanvas -= 5;
                }
                drawImgHexes(posXCanvas, posYCanvas);
            }
        }

        if (canvasW > innerWidth) {
            if (mousePosX < 100) {
                if (posXCanvas < 225) {
                    posXCanvas += 5;
                }
                drawImgHexes(posXCanvas, posYCanvas);
                
            }
            else if (mousePosX > innerWidth - 100){
                if (posXCanvas > -canvasW + innerWidth + 100) {
                    posXCanvas -= 5;
                }
                drawImgHexes(posXCanvas, posYCanvas);
            }
        }
    }

    // Gets canvas bounds on scroll
    function scrollHandler(e) {
        bounds = canvas.getBoundingClientRect();
        canvasBounds = boardCanvas.getBoundingClientRect();
    }

    // Calculates slope for hitbox detection
    function slope(x0, y0, x1, y1) {
        return (y1 - y0) / (x1 - x0);
    }

    // Part of hitbox calculation
    function intercept(x, y, m) {
        return y - (m * x);
    }

    // Calculates hex hitboxes
    function mouseHandlerHex(e) {
        mousePosX = e.clientX - canvasBounds.left;
        mousePosY = e.clientY - canvasBounds.top;

        let i = 0;
        let isClicked = false;
        let hbound = false;
        let vboundCheck = false;
        let hboundCheck = false;

        // m holds slope and b holds the intercept
        var m, b;

        if (mousePosY < 26 || mousePosY > windowHeight - 120) {
            return;
        }

        for (i = 0; i < numHexes * 3; i++) {
            if (mousePosY > hexesPos[i][3] && mousePosY < hexesPos[i][11]) {
                if (mousePosX > hexesPos[i][2]) {
                    if (mousePosX < hexesPos[i][4]) {
                        isClicked = true;
                    }
                    else if (mousePosX < hexesPos[i][6]) {
                        if (mousePosY < hexesPos[i][7]) {
                            m = slope(hexesPos[i][6], hexesPos[i][7], hexesPos[i][4], hexesPos[i][5]);
                            b = intercept(hexesPos[i][6], hexesPos[i][7], m);
                            if (mousePosY > m * mousePosX + b) {
                                isClicked = true;
                            }
                        }
                        else if (mousePosY > hexesPos[i][7]) {
                            m = slope(hexesPos[i][6], hexesPos[i][7], hexesPos[i][8], hexesPos[i][9]);
                            b = intercept(hexesPos[i][6], hexesPos[i][7], m);
                            if (mousePosY < m * mousePosX + b) {
                                isClicked = true;
                            }
                        }
                    }
                }
                else if (mousePosX > hexesPos[i][0]) {
                    if (mousePosY < hexesPos[i][1]) {
                        m = slope(hexesPos[i][0], hexesPos[i][1], hexesPos[i][2], hexesPos[i][3]);
                        b = intercept(hexesPos[i][0], hexesPos[i][1], m);
                        if (mousePosY > m * mousePosX + b) {
                            isClicked = true;
                        }
                    }
                    else if (mousePosY > hexesPos[i][1]) {
                        m = slope(hexesPos[i][0], hexesPos[i][1], hexesPos[i][10], hexesPos[i][11]);
                        b = intercept(hexesPos[i][0], hexesPos[i][1], m);
                        if (mousePosY < m * mousePosX + b) {
                            isClicked = true;
                        }
                    }
                }

                if (isClicked) {
                    console.log("This is hex #" + i + ".");
                    console.log("Econ score: " + hexes[i].getEconScore())
                    console.log("Resource given: " + hexes[i].getResource());
                    player[0].addTerritory(i);
                    console.log(player[0].getHexesControlled());
                    console.log("\n");
                }
            }
            
            isClicked = false;
        }
    }
}
