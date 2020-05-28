var numHexes;
var hexesPerRow;
var hexWidth = 82;
var hexHeight = 71;
var hexes = new Array(300);

// gets a random int from 0 to max - 1.
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const drawBoard = function() {
    // grabs canvas elements from the HTML
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

    // sets the cancas size. dynamic resizing not currently supported.
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

    // determines the number of hexes to draw based on hex size and canvas width/height
    function setNumHexes(W, H) {
        hexesPerRow = Math.floor(windowWidth / (W * 1.5) + 1);
        numHexes = ((Math.floor(windowHeight / (H * 2)) * 2) + 1) * hexesPerRow;
        // console.log(numHexes);
    }

    setCanvasSize();
    setNumHexes(hexWidth, hexHeight)

    var mousePosX = -1;
    var mousePosY = -1;
    var hexesPos = new Array(numHexes * 2);
    var canvasBounds = boardCanvas.getBoundingClientRect();
    var colors = new Array(numHexes * 3);
    var colorsList = ['red', 'orange', 'green', 'blue',
                'pink','purple', 'yellow', 'blue',
                'pink', 'red', 'green', 'blue', 'pink',
                'orange', 'yellow', 'purple', 'grey'];


        // draws an outline around a hex with the specified starting point (top left) and color
    function drawOutlineOrigin(originX, originY, color, stroke, count) {
        let m2x, m2y, x0, y0, x1, y1, x2, y2, x3, y3, x4, y4
        m2x = originX;
        m2y = originY + hexHeight / 2;
        x0 = originX + hexWidth / 4;
        y0 = m2y - hexHeight / 2;
        x1 = x0 + hexWidth /2;
        y1 = y0;
        x2 = m2x + hexWidth;
        y2 = m2y;
        x3 = x1;
        y3 = hexHeight + y1;
        x4 = x0;
        y4 = y3;

        hexesPos[count] = [m2x, m2y, x0, y0, x1, y1, x2, y2, x3, y3, x4, y4];

        drawOutline(m2x, m2y, x0, y0, x1, y1, x2, y2, x3, y3, x4, y4, color, stroke);
    }

    // draws an outline around a hex with the specified dimensions and color
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

    function drawLineOfHexes(posX, posY, num, count) {
        let i = 0, hexTypeToDraw = 0, randNum;
        for (i = 0; i < hexesPerRow - num; i++) {
            randNum = getRandomInt(31);
            if (randNum > 5) {
                hexTypeToDraw = 6;
            }
            else {
                hexTypeToDraw = randNum;
            }
            boardCtx.drawImage(hexImgArray[hexTypeToDraw], posX, posY);
            drawOutlineOrigin(posX, posY, 'black', 1, count + i);
            hexes[count + i] = new Hex(hexTypeToDraw);
            posX += 123;
        }
        return i;
        // hexes[i] = [m2x, m2y, x0, y0, x1, y1, x2, y2, x3, y3, x4, y4];
    }

    // W = 82, H = 71
    function drawImgHexes() {
        hexImgArray[numHexTypes - 1].onload = function() {
            let posX = 225, posY = 106, count = 0;
            posX += 82;
            count += drawLineOfHexes(posX, posY, 5, count);
            
            posY += 36;
            posX = 164 + 82;
            count += drawLineOfHexes(posX, posY, 4, count);

            posY += 35;
            posX = 328 - 20;
            count += drawLineOfHexes(posX, posY, 4, count);

            posY += 36;
            posX = 164 + 82;
            count += drawLineOfHexes(posX, posY, 4, count);

            posY += 35;
            posX = 308 - 123;
            count += drawLineOfHexes(posX, posY, 3, count);

            posY += 36;
            posX = 164 + 82;
            count += drawLineOfHexes(posX, posY, 4, count);

            posY += 35;
            posX = 308 - 123;
            count += drawLineOfHexes(posX, posY, 3, count);

            posY += 36;
            posX = 164 + 82;
            count += drawLineOfHexes(posX, posY, 4, count);

            posY += 35;
            posX = 308 - 123;
            count += drawLineOfHexes(posX, posY, 4, count);

            posY += 36;
            posX = 164 + 82 - 123;
            count += drawLineOfHexes(posX, posY, 4, count);

            posY += 35;
            posX = 308 - 123 - 123;
            count += drawLineOfHexes(posX, posY, 3, count);

            posY += 36;
            posX = 164 + 82 - 123;
            count += drawLineOfHexes(posX, posY, 4, count);

            posY += 35;
            posX = 308 - 123 -123;
            count += drawLineOfHexes(posX, posY, 3, count);

            posY += 36;
            posX = 164 + 82 - 123;
            count += drawLineOfHexes(posX, posY, 3, count);

            posY += 35;
            posX = 308 - 123;
            count += drawLineOfHexes(posX, posY, 3, count);

            posY += 36;
            posX = 164 + 82 - 123;
            count += drawLineOfHexes(posX, posY, 3, count);

            posY += 35;
            posX = 308 - 123;
            count += drawLineOfHexes(posX, posY, 3, count);

            posY += 36;
            posX = 164 + 82;
            count += drawLineOfHexes(posX, posY, 3, count);
        }
    }

    // draws the bottom menu where game options would be
    function drawMenu() {
        menuCtx.fillStyle = 'grey';
        menuCtx.fillRect(0, windowHeight - 120, boardCanvas.width, 120);
    }

    // draws the top part of the menu where game statistics would be.
    function drawStats() {
        statCtx.fillStyle = 'grey';
        statCtx.fillRect(0, 0, boardCanvas.width, 35);
    }

    // this is really only for testing purposes.
    function setColors() {
        let i;
        for (i = 0; i < numHexes * 3; i++) {
            colors[i] = colorsList[getRandomInt(11)];
        }
    }

    // drawBoard();
    // drawHex();
    // setColors();
    // drawHexes(numHexes, hexWidth, hexHeight, 0, 0);
    drawStats();
    drawMenu();
    loadImgHexes();
    drawImgHexes();

    // document.addEventListener("mousemove", mouseHandlerHex, false);
    document.addEventListener("click", mouseHandlerHex, false);
    window.addEventListener("scroll", scrollHandler, false);

    // gets canvas bounds on scroll
    function scrollHandler(e) {
        bounds = canvas.getBoundingClientRect();
        canvasBounds = boardCanvas.getBoundingClientRect();
    }

    // calculates slope for hitbox detection
    function slope(x0, y0, x1, y1) {
        return (y1 - y0) / (x1 - x0);
    }

    // part of hitbox calculation
    function intercept(x, y, m) {
        return y - (m * x);
    }

    // Calculates hex hitboxes
    function mouseHandlerHex(e) {
        mousePosX = e.clientX - canvasBounds.left;
        mousePosY = e.clientY - canvasBounds.top;
        var i = 0, isClicked = false, hbound = false, vboundCheck = false, hboundCheck = false;
        var m , b;
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
                    // colors[i] = colorsList[getRandomInt(11)];
                    // drawHexes(numHexes, hexWidth, hexHeight, 0, 0);
                    console.log("This is hex #" + i + ".");
                    console.log("Econ score: " + hexes[i].getEconScore())
                    console.log("Resource given: " + hexes[i].getResource());
                    console.log("\n");
                    player[0].addTerritory(i);
                    console.log(player[0].getHexesControlled());
                }
            }
            isClicked = false;
        }
    }
}

/*
// draws the hexes via the canvas. will be replaced by images.
    // (changing the start point is bugged)
    function drawHexes(numHexes, hexSizeW, hexSizeH, startPointX, startPointY) {
        let i, m2x, m2y, x0, y0, x1, y1, x2, y2, x3, y3, x4, y4, shiftDist;
        m2x = startPointX;
        m2y = startPointY + hexSizeH / 2;
        x0 = startPointX + hexSizeW / 4;
        y0 = m2y - hexSizeH / 2;
        x1 = x0 + hexSizeW /2;
        y1 = y0;
        x2 = m2x + hexSizeW;
        y2 = m2y;
        x3 = x1;
        y3 = hexSizeH;
        x4 = x0;
        y4 = y3;

        shiftDist = hexSizeW * 1.5;

        for (i = 0; i <= numHexes; i++) {
            boardCtx.fillStyle = colors[i];

            if ((i - 1) % 16 == 0 || (i % 16 == 0)|| (i >= 0 && i <= 15) || (i >= 194 && i <= 208)) {
                boardCtx.fillStyle = 'white';
            }
            boardCtx.beginPath();
            boardCtx.moveTo(m2x, m2y);
            boardCtx.lineTo(x0, y0);
            boardCtx.lineTo(x1, y1);
            boardCtx.lineTo(x2, y2);
            boardCtx.lineTo(x3, y3);
            boardCtx.lineTo(x4, y4);
            boardCtx.lineTo(m2x, m2y);
            boardCtx.closePath();
            boardCtx.fill();

            drawOutline(m2x, m2y, x0, y0, x1, y1, x2, y2, x3, y3, x4, y4, 'yellow');

            hexesPos[i] = [m2x, m2y, x0, y0, x1, y1, x2, y2, x3, y3, x4, y4];
            
            m2x += shiftDist;
            x0 += shiftDist;
            x1 += shiftDist;
            x2 += shiftDist;
            x3 += shiftDist;
            x4 += shiftDist;

            if (i != 0 && i % (hexesPerRow) == 0) {
                m2x = startPointX;
                m2y += hexSizeH;
                x0 = hexSizeW / 4;
                y0 += hexSizeH;
                x1 = hexSizeW / 4 + hexSizeW / 2;
                y1 += hexSizeH;
                x2 = hexSizeW;
                y2 += hexSizeH;
                x3 = x1;
                y3 += hexSizeH;
                x4 = x0;
                y4 += hexSizeH;
            }
        }

        m2x = -(hexSizeW / 4 + hexSizeW / 2);
        m2y = startPointY - hexSizeH / 2 + (hexSizeH / 2);
        x0 = -hexSizeW / 2;
        y0 = -hexSizeH + (hexSizeH / 2);
        x1 = startPointX;
        y1 = -hexSizeH + (hexSizeH / 2);
        x2 = hexSizeW / 4;
        y2 = startPointY - hexSizeH / 2 + (hexSizeH / 2);
        x3 = x1;
        y3 = y1 + hexSizeH;
        x4 = x0;
        y4 = y0 + hexSizeH;

        for (i = numHexes; i < numHexes * 3; i++) {
            boardCtx.fillStyle = colors[i];

            boardCtx.beginPath();
            boardCtx.moveTo(m2x, m2y);
            boardCtx.lineTo(x0, y0);
            boardCtx.lineTo(x1, y1);
            boardCtx.lineTo(x2, y2);
            boardCtx.lineTo(x3, y3);
            boardCtx.lineTo(x4, y4);
            boardCtx.lineTo(m2x, m2y);
            boardCtx.closePath();
            boardCtx.fill();

            hexesPos[i] = [m2x, m2y, x0, y0, x1, y1, x2, y2, x3, y3, x4, y4];
            m2x += hexSizeW + hexSizeW / 2;
            x0 += hexSizeW + hexSizeW / 2;
            x1 += hexSizeW + hexSizeW / 2;
            x2 += hexSizeW + hexSizeW / 2;
            x3 += hexSizeW + hexSizeW / 2;
            x4 += hexSizeW + hexSizeW / 2;

            if (i != 0 && i % (hexesPerRow + 1) == 0) {
                m2x = -(hexSizeW/2 + hexSizeW / 4);
                m2y += hexSizeH;
                x0 = -(hexSizeW / 2);
                y0 += hexSizeH;
                x1 = startPointX;
                y1 += hexSizeH;
                x2 = hexSizeW / 4;
                y2 += hexSizeH;
                x3 = startPointX;
                y3 += hexSizeH;
                x4 = -(hexSizeW / 2);
                y4 += hexSizeH;
            }
        }
    }
*/

