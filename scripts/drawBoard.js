var numHexes;
var hexesPerRow;
var hexWidth = 82;
var hexHeight = 71;
var hexes = new Array(300);
var initializedHexes = false;
var initializedMenu = false;
var selectedHex = null;
var drawBoardStartPositionX = 225;
var drawBoardStartPositionY = 106;
const menuEnum = Object.freeze({"UNCLICKED" : 0, "ENDTURN" : 1, "MILITARY" : 2, "ECONOMY" : 3, "PRODUCTION" : 4});
var buttonClickedId = menuEnum.UNCLICKED;
var popUpClicked = false;

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

    var splashScreen = document.getElementById("splashScreen");
    var splashCtx = splashScreen.getContext("2d");

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

    // Remove this
    // Determines the number of hexes to draw based on hex size and canvas width/height
    function setNumHexes(W, H) {
        hexesPerRow = Math.floor(windowWidth / (W * 1.5) + 1);
        numHexes = ((Math.floor(windowHeight / (H * 2)) * 2) + 1) * hexesPerRow;
    }

    setCanvasSize();
    setNumHexes(hexWidth, hexHeight);

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

    // Draws an outline around a hex using single x,y coordinate as the origin.
    function drawOutlineOrigin(originX, originY, color, stroke) {
        var pointsArray = getPointsFromOrigin(originX, originY);
        drawOutline(pointsArray[0], pointsArray[1], pointsArray[2], pointsArray[3], pointsArray[4], pointsArray[5], pointsArray[6], pointsArray[7],
            pointsArray[8], pointsArray[9], pointsArray[10], pointsArray[11], color, stroke);
    }

    // Loads hex images
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
                hexes[count + i] = new Hex(hexTypeToDraw, posX, posY);
                
            }
            else {
                hexTypeToDraw = hexes[count + i].resourceNum;
            }
            
            // Draws the hex images on the board
            boardCtx.drawImage(hexImgArray[hexTypeToDraw], posX, posY);

            // Gets the points from where each hex is drawn
            pointsArray = getPointsFromOrigin(posX, posY);

            // Stores hex points for hit detection
            hexesPos[count + i] = [pointsArray[0], pointsArray[1], pointsArray[2], pointsArray[3], pointsArray[4], pointsArray[5], pointsArray[6], pointsArray[7],
            pointsArray[8], pointsArray[9], pointsArray[10], pointsArray[11]];

            // Draws outline around each hex
            drawOutlineOrigin(pointsArray[0], pointsArray[3], 'black', 1);
            posX += 123;
        }
        return i;
    }

    // Board is drawn manually
    function drawImgHexes(startPosX, posY) {
        let posX = startPosX;
        let count = 0;

        boardCtx.clearRect(0, 0, canvasW, canvasH);

        boardCtx.fillStyle = '#008aae';
        boardCtx.fillRect(0, 0, canvasW, canvasH);

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
        
        if (selectedHex != null) {
            drawOutlineOrigin(hexesPos[selectedHex][0], hexesPos[selectedHex][3], 'yellow', 2)
        }

        // Remove these after menus can be closed
        drawStats();
        drawMenu();

        if (buttonClickedId != menuEnum.UNCLICKED) {
            drawInfoMenu(buttonClickedId);
        }
    }

    // Load menu assets
    const numMenuAssets = 4;
    var menuImgArray = new Array(numMenuAssets);
    function loadMenuAssets() { 
        for (i = 0; i < numMenuAssets; i++) {
            menuImgArray[i] = new Image();
        }

        menuImgArray[0].src = "image_sources/end_turn_button_greyed.png"
        menuImgArray[1].src = "image_sources/end_turn_button.png";
        menuImgArray[2].src = "image_sources/military_button.png";
        menuImgArray[3].src = "image_sources/economy_button.png";
    }

    // Draws the bottom menu where game options would be
    function drawMenu() {
        menuCtx.clearRect(0, 0, canvasW, canvasH);

        menuCtx.drawImage(menuImgArray[1], innerWidth / 2 - 60, innerHeight - 120);
        menuCtx.drawImage(menuImgArray[2], innerWidth / 2 - 200, innerHeight - 85);
        menuCtx.drawImage(menuImgArray[3], innerWidth / 2 + 80, innerHeight - 85);

        initializedMenu = true;
    }

    // Draws the menus that pop up in the middle of the screen (military, production, economy, etc.)
    function drawInfoMenu(menuType) {
        menuCtx.clearRect;
        menuCtx.fillStyle = 'grey';
        menuCtx.fillRect(innerWidth / 2 - 250, innerHeight / 2 - 350, 500, 600);

        // Draws info to the menu based on menu type
        switch (menuType) {
            case menuEnum.MILITARY:
                menuCtx.fillStyle = 'black';
                menuCtx.font = '36px sans-serif';
                menuCtx.fillText("MILITARY OVERVIEW:", innerWidth / 2 - 195, innerHeight / 2 - 305);

                menuCtx.font = '24px sans-serif';
                menuCtx.fillText("Total: Soldiers: Archers: Cavalry: ", innerWidth / 2 - 195, innerHeight / 2 - 260);

                let militaryMenuString = "";
                let hexTotalUnits = 0;
                let militaryMenuTextPosX = innerWidth / 2 - 230, militaryMenuTextPosY = innerHeight / 2 - 225;
                for (let hex of player[currentPlayer].hexesControlled) {
                    if (hexes[hex].units.length > 0) {
                        for (let i = 0; i < hexes[hex].unitSum.length; i++) {
                            hexTotalUnits += hexes[hex].unitSum[i];
                        }
                        militaryMenuString += "Hex " + hex + ": Total: " + hexTotalUnits + ", Soldiers: " + hexes[hex].unitSum[0] + ", Archers: " + hexes[hex].unitSum[1] + ", Cavalry " + hexes[hex].unitSum[2];
                        menuCtx.font = '20px sans-serif';
                        menuCtx.fillText(militaryMenuString, militaryMenuTextPosX, militaryMenuTextPosY);
                        militaryMenuTextPosY += 30;
                        militaryMenuString = "";
                    }
                }
                break;

            case menuEnum.ECONOMY:
                menuCtx.fillStyle = 'black';
                menuCtx.font = '36px sans-serif';

                menuCtx.fillText("MARKET:", innerWidth / 2 - 80, innerHeight / 2 - 305);

                let demandString = "Resource in demand: " + bank.resourceInDemand;
                menuCtx.font = '28px sans-serif';
                menuCtx.fillText(demandString, innerWidth / 2 - 230, innerHeight / 2 - 260);

                let econMenuString = "";
                let econMenuTextPosX = innerWidth / 2 - 230, econMenuTextPosY = innerHeight / 2 - 210;
                for (let i = 0; i < numResources; i++) {
                    econMenuString += bank.resources[i].typeString + ": " + bank.resources[i].buyPrice + "s/" + bank.resources[i].sellPrice + "b " 

                    menuCtx.font = '24px sans-serif';
                    menuCtx.fillText(econMenuString, econMenuTextPosX, econMenuTextPosY);
                    econMenuTextPosY += 50;
                    econMenuString = "";
                }
                break;  
                
            case menuEnum.PRODUCTION:
                menuCtx.fillStyle = 'black';
                menuCtx.font = '36px sans-serif';
                menuCtx.fillText("PRODUCTION:", innerWidth / 2 - 135, innerHeight / 2 - 305);
                break;

            default:
                break;
        }

        menuCtx.fillStyle = 'black';
        menuCtx.font = '36px sans-serif';
        menuCtx.fillText("EXIT", innerWidth / 2 - 45, innerHeight / 2 + 200);

        menuCtx.lineWidth = 2
        menuCtx.strokeStyle = 'black';
        menuCtx.strokeRect(innerWidth / 2 - 50, innerHeight / 2 + 165, 90, 45);
    }
    

    // Draws pop up that instructs users to select their starting hex
    this.drawCapitalInfo = function () {
        menuCtx.clearRect(0, 0, canvasW, canvasH);
        drawMenu();
        menuCtx.fillStyle = 'grey';
        menuCtx.fillRect(innerWidth / 2 - 400, innerHeight / 2 - 100, 800, 200);

        menuCtx.fillStyle = 'black';
        menuCtx.font = '48px sans-serif';
        menuCtx.fillText("Select your starting hex on the map:", innerWidth / 2 - 400 + 15, innerHeight / 2);
        menuCtx.fillText("Ok", innerWidth / 2 - 40, innerHeight / 2 + 70);
    }

    // Draws units to the board (design is temporary)
    this.drawUnits = function (hexNum) {
        boardCtx.beginPath();
        boardCtx.lineWidth = 1;
        boardCtx.strokeStyle = 'black';
        boardCtx.fillStyle = 'red';
        boardCtx.arc((hexes[hexNum].originX + 53), (hexes[hexNum].originY + 55), 10, 0, Math.PI * 2, true);
        boardCtx.fill();
        boardCtx.fillStyle = 'white';
        boardCtx.font = '12px sans-serif';
        boardCtx.fillText(hexes[hexNum].numUnits, (hexes[hexNum].originX + 49.5), (hexes[hexNum].originY + 59));
    }

    // Draws the top part of the menu where game statistics would be.
    function drawStats() {
        statCtx.clearRect(0, 0, canvasW, canvasH);
        statCtx.fillStyle = 'grey';
        statCtx.fillRect(0, 0, boardCanvas.width, 35);
    }

    // Loads audio (currently for testing)
    var testAudio;
    function loadSounds() {
        testAudio = new Audio("sounds\\Book_TurnPage_04.wav");
    }

    // Drawing the board
    drawStats();
    loadImgHexes();
    loadSounds();
    hexImgArray[numHexTypes - 1].onload = function() {
        drawImgHexes(drawBoardStartPositionX, drawBoardStartPositionY);
    }

    // Draws menu when loaded
    loadMenuAssets();
    menuImgArray[numMenuAssets - 1].onload = function () {
        drawMenu();
    }

    // Events
    document.addEventListener("mousemove", setMousePos, false);
    document.addEventListener("click", mouseHandlerHex, false);

    // Scrolls the map
    var mousePosX = -1;
    var mousePosY = -1;

    // Initial position of the canvas
    var posXCanvas = 225, posYCanvas = 106;

    // Stores if the board is currently scrolling
    var scrolling = false;

    // Distance from last mouse move
    var deltaX, deltaY;

    // Amount the board should scroll
    var scrollDistX = 0, scrollDistY = 0;

    // Keeps track of the mouse
    function setMousePos(e) {
        deltaX = e.movementX;
        deltaY = e.movementY;
        mousePosX = e.clientX;
        mousePosY = e.movementY;
        canvasEdgeScroll(e);
    }

    // Scrolls the canvas right
    function scrollRight() {
        if (deltaX >= 0 && mousePosX < window.innerWidth && scrollDistX < canvasW - window.innerWidth) {
            posXCanvas -= 5;
            scrollDistX += 5;
            drawImgHexes(posXCanvas, posYCanvas);
            requestAnimationFrame(scrollRight);
        }
        else {
            scrolling = false;
        }
    }

    // Scrolls the canvas left
    function scrollLeft() {
        if (deltaX <= 0 && mousePosX > 0 && scrollDistX > 0) {
            posXCanvas += 5;
            scrollDistX -= 5;
            drawImgHexes(posXCanvas, posYCanvas);
            requestAnimationFrame(scrollLeft);
        }
        else {
            scrolling = false;
        }
    }

    // Scrolls the canvas up
    function scrollUp() {
        if (deltaY <= 0 && mousePosY > 0 && scrollDistY > 0) {
            posYCanvas += 3;
            scrollDistY -= 3;
            drawImgHexes(posXCanvas, posYCanvas);
            requestAnimationFrame(scrollUp);
        }
        else {
            scrolling = false;
        }
    }

    // Scrolls the canvas down
    function scrollDown() {
        if (deltaY >= 0 && mousePosY < window.innerHeight && scrollDistY < canvasH - window.innerHeight) {
            posYCanvas -= 3;
            scrollDistY += 3;
            drawImgHexes(posXCanvas, posYCanvas);
            requestAnimationFrame(scrollDown);
        }
        else {
            scrolling = false;
        }
    }

    // Scrolls the canvas using mouse location
    function canvasEdgeScroll (e) {
        if (!scrolling) {
            mousePosX = e.clientX;
            mousePosY = e.clientY;
            let detectionWidth = 50;

            if (canvasH - 100 > window.innerHeight) {
                if (mousePosY < detectionWidth) {
                    if (scrollDistY > 0) {
                        scrolling = true;
                        scrollUp();                         
                    }
                }
                else if (mousePosY > window.innerHeight - 200 && mousePosY < window.innerHeight - 120) {
                        scrolling = true;
                        scrollDown();
                }
            }
    
            if (canvasW > innerWidth) {
                if (mousePosX < detectionWidth) {
                    scrolling = true;
                    scrollLeft();                    
                }
                else if (mousePosX > innerWidth - detectionWidth) {
                    scrolling = true;
                    scrollRight();
                }
            }
        }
    }

    // Calculates slope for hitbox detection
    function slope(x0, y0, x1, y1) {
        return (y1 - y0) / (x1 - x0);
    }

    // Part of hitbox calculation
    function intercept(x, y, m) {
        return y - (m * x);
    }

    // Calculates hitboxes on click
    function mouseHandlerHex(e) {
        mousePosX = e.clientX - canvasBounds.left;
        mousePosY = e.clientY - canvasBounds.top;

        let i = 0;
        let isClicked = false;

        // m holds slope and b holds the intercept
        var m, b;

        // Menu hitboxes
        if (mousePosY > innerHeight - 120) {
            // Middle button
            if (mousePosX > innerWidth / 2 - 60 && mousePosX < innerWidth / 2 + 60) {
                buttonClickedId = menuEnum.UNCLICKED;
                drawImgHexes(posXCanvas, posYCanvas);
                endTurn();
                // drawMenu();
            }
            // Military menu button
            else if (mousePosX > innerWidth / 2 - 200 && mousePosX < innerWidth / 2 - 80) {
                if (buttonClickedId == menuEnum.MILITARY) {
                    drawImgHexes(posXCanvas, posYCanvas);
                    buttonClickedId = menuEnum.UNCLICKED;
                }
                else {
                    testAudio.play();
                    buttonClickedId = menuEnum.MILITARY;
                    drawInfoMenu(menuEnum.MILITARY);
                }
            }
            // Economy menu button
            else if (mousePosX > innerWidth / 2 + 80 && mousePosX < innerWidth / 2 + 200) {
                if (buttonClickedId == menuEnum.ECONOMY) {
                    drawImgHexes(posXCanvas, posYCanvas);
                    buttonClickedId = menuEnum.UNCLICKED;
                }
                else {
                    testAudio.play();
                    buttonClickedId = menuEnum.ECONOMY;
                    drawInfoMenu(menuEnum.ECONOMY);
                }
            }
        }
        // Starting hex pop-up hitboxes (scuffed, but temorary.)
        else if (currentTurn == 0 && !popUpClicked && (mousePosX > innerWidth / 2 - 40 && mousePosX < innerWidth / 2 + 40) && (mousePosY > innerHeight / 2 && mousePosY < innerHeight / 2 + 100)){
            drawImgHexes(posXCanvas, posYCanvas);
            popUpClicked = true;
        }
        // Closes info menus
        else if (buttonClickedId != menuEnum.UNCLICKED && (mousePosX > innerWidth / 2 - 50 && mousePosX < innerWidth / 2 + 40) && (mousePosY > innerHeight / 2 + 165 && mousePosY < innerHeight / 2 + 210)) {
            buttonClickedId = menuEnum.UNCLICKED;
            drawImgHexes(posXCanvas, posYCanvas);
        }
        else if (mousePosY < 26) {
            return;
        }
        // Calculates hex hitboxes
        else {
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
                        // For debugging/testing
                        console.log("This is hex #" + i + ".");
                        console.log("Econ score: " + hexes[i].econScore);
                        console.log("Resource given: " + hexes[i].getResource());
                        console.log("Is controlled? " + hexes[i].isControlled);

                        // Adds territory to a player, should make this its own function
                        if (currentTurn == 0 && player[currentPlayer].hexesControlled.size == 0 && !hexes[i].isControlled) {
                            // Should also add all of the hexes that border this hex here
                            addTerritory(currentPlayer, i);
                            hexes[i].isControlled = true;
                            hexes[i].controllingPlayer = currentPlayer;
                            
                            // Testing:
                            console.log(player[currentPlayer].hexesControlled);
                            console.log("\n");
                            buttonClickedId = menuEnum.UNCLICKED;
                            selectedHex = i;
                            drawImgHexes(posXCanvas, posYCanvas);
                            endTurn();
                        }
                        // Opens the production menu
                        else if (hexes[i].isControlled && hexes[i].controllingPlayer == currentPlayer){
                            selectedHex = i;
                            drawImgHexes(posXCanvas, posYCanvas);
                            
                            // In multiplayer there needs to be a player check here.
                            buttonClickedId = menuEnum.PRODUCTION;
                            drawInfoMenu(menuEnum.PRODUCTION);
                        }
                        else {
                            selectedHex = i;
                            drawImgHexes(posXCanvas, posYCanvas);
                        }
                    }
                }
                
                isClicked = false;
            }
        }
    }
}
