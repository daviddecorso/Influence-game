/**
 * Number of hexes to be drawn
 * (I don't think this is used.)
 */
var numHexes;

/**
 * Number of hexes to be drawn per row based on board size
 * (This is no longer relevant and needs to be removed.)
 */
var hexesPerRow;

/**
 * Width of a hex (px)
 */
var hexWidth = 82;

/**
 * Height of a hex (px)
 */
var hexHeight = 71;

/**
 * Background menu color
 */
var bgMenuColor = "#0A1529";

/**
 * Menu text color
 */
var menuTextColor = "#D0A85E";

/**
 * Border color
 */
var borderColor = "#502C1D";

/**
 * Accent blue color
 */
var accentBlue = "#02ABD0";

/**
 * Array that stores all the hex objects on the board
 */
var hexes = new Array(300);

/**
 * Stores if hexes have been initialized.
 * (Don't think this is used, will check into it)
 */
var initializedHexes = false;

/**
 * Current hex selected on the board (by the player).
 */
var selectedHex = null;

/**
 * X coordinate for position to start drawing the board
 */
var drawBoardStartPositionX = 225;

/**
 * Y coordinate for position to start drawing the board
 */
var drawBoardStartPositionY = 106;

/**
 * Enum for menu states
 */
const menuEnum = Object.freeze({
  UNCLICKED: 0,
  ENDTURN: 1,
  MILITARY: 2,
  ECONOMY: 3,
  PRODUCTION: 4,
  GLOBAL_EVENT: 5,
  NATL_EVENT: 6,
  MOVEMENT: 7,
});

/**
 * Stores current menu state
 */
var menuId = menuEnum.UNCLICKED;

/**
 * Stores state of expanded categories in the production menu.
 */
var prodMenuID = menuEnum.UNCLICKED;

/**
 * Checks if the pop-up is clicked or not
 * (For the capital pop-up, may remove or put into enum.)
 */
var popUpClicked = false;

/**
 * Gets a random int from 0 to max - 1.
 * @param {number} max
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Draws the board and calculates hitboxes.
 */
const drawBoard = function () {
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

  /**
   * Sets the canvas size. dynamic resizing not currently supported.
   */
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

  /**
   * Remove this
   * Determines the number of hexes to draw based on hex size and canvas width/height
   * @param {number} W
   * @param {number} H
   */
  function setNumHexes(W, H) {
    hexesPerRow = Math.floor(windowWidth / (W * 1.5) + 1);
    numHexes = (Math.floor(windowHeight / (H * 2)) * 2 + 1) * hexesPerRow;
  }

  /* Setting the canvas size. */
  setCanvasSize();
  setNumHexes(hexWidth, hexHeight);

  var hexesPos = new Array(numHexes * 3);
  hexesPos.fill(0);
  var canvasBounds = boardCanvas.getBoundingClientRect();

  /**
   * Derives coordinates of all points of a hex from the origin point (x,y).
   * @param {number} originX - X coordinate of the origin where the hex should be drawn.
   * @param {number} originY - Y coordinate of the origin where the hex should be drawn.
   */
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
    pointsArray[4] = pointsArray[2] + hexWidth / 2;

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

  /**
   * Draws an outline around a hex with the specified dimensions and color.
   * @param {number} m2x - X coordinate of the starting point (middle left).
   * @param {number} m2y - Y coordinate of the starting point (middle left).
   * @param {number} x0 - X coordinate of the second point (top left).
   * @param {number} y0 - Y coordinate of the second point (top left).
   * @param {number} x1 - X coordinate of the third point (top right).
   * @param {number} y1 - Y coordinate of the third point (top right).
   * @param {number} x2 - X coordinate of the fourth point (middle right).
   * @param {number} y2 - Y coordinate of the fourth point (middle right).
   * @param {number} x3 - X coordinate of the fifth point (bottom right).
   * @param {number} y3 - Y coordinate of the fifth point (bottom right).
   * @param {number} x4 - X coordinate of the sixth point (bottom left).
   * @param {number} y4 - Y coordinate of the sixth point (bottom left).
   * @param {string} color - Color of the outline
   * @param {number} stroke - Thickness of the outline
   */
  function drawOutline(
    m2x,
    m2y,
    x0,
    y0,
    x1,
    y1,
    x2,
    y2,
    x3,
    y3,
    x4,
    y4,
    color,
    stroke
  ) {
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

  /**
   * Draws an outline around a hex using single x,y coordinate as the origin.
   * @param {number} originX - X coordinate of the origin where the hex should be drawn.
   * @param {number} originY - Y coordinate of the origin where the hex should be drawn.
   * @param {string} color - Color of the outline
   * @param {number} stroke - Thickness of the outline
   */
  function drawOutlineOrigin(originX, originY, color, stroke) {
    var pointsArray = getPointsFromOrigin(originX, originY);
    drawOutline(
      pointsArray[0],
      pointsArray[1],
      pointsArray[2],
      pointsArray[3],
      pointsArray[4],
      pointsArray[5],
      pointsArray[6],
      pointsArray[7],
      pointsArray[8],
      pointsArray[9],
      pointsArray[10],
      pointsArray[11],
      color,
      stroke
    );
  }

  /**
   * Loads hex images
   */
  const numHexTypes = 7;
  var hexImgArray = new Array(numHexTypes);
  function loadImgHexes() {
    let i;
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

  /**
   * Draws a line of hexes on the screen and initializes new hex objects.
   * @param {number} posX - X coordinate of starting position.
   * @param {number} posY - Y coordinate of starting position.
   * @param {number} num  - Number of hexes.
   * @param {number} count - Hex number (id) to start at.
   */
  function drawLineOfHexes(posX, posY, num, count) {
    let i = 0,
      hexTypeToDraw = 0,
      randNum;
    var pointsArray;

    // Initializes hex objects
    for (i = 0; i < hexesPerRow - num; i++) {
      if (!initializedHexes) {
        randNum = getRandomInt(31);

        // Determines hex type from random number
        if (randNum > 5) {
          hexTypeToDraw = 6;
        } else {
          hexTypeToDraw = randNum;
        }
        hexes[count + i] = new Hex(hexTypeToDraw, posX, posY);
      } else {
        hexTypeToDraw = hexes[count + i].resourceNum;
      }

      // Draws the hex images on the board
      boardCtx.drawImage(hexImgArray[hexTypeToDraw], posX, posY);

      // Gets the points from where each hex is drawn
      pointsArray = getPointsFromOrigin(posX, posY);

      // Stores hex points for hit detection
      hexesPos[count + i] = [
        pointsArray[0],
        pointsArray[1],
        pointsArray[2],
        pointsArray[3],
        pointsArray[4],
        pointsArray[5],
        pointsArray[6],
        pointsArray[7],
        pointsArray[8],
        pointsArray[9],
        pointsArray[10],
        pointsArray[11],
      ];

      // Draws outline around each hex
      drawOutlineOrigin(pointsArray[0], pointsArray[3], "black", 1);
      posX += 123;
    }
    return i;
  }

  /**
   * Board is drawn manually
   * @param {number} startPosX
   * @param {number} posY
   */
  function drawImgHexes(startPosX, posY) {
    let posX = startPosX;
    let count = 0;

    boardCtx.clearRect(0, 0, canvasW, canvasH);

    boardCtx.fillStyle = "#008aae";
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
      drawOutlineOrigin(
        hexesPos[selectedHex][0],
        hexesPos[selectedHex][3],
        "yellow",
        2
      );
    }

    // Remove these after menus can be closed
    drawStats();
    drawMenu();

    // Change this to if (a hex is selected) once de-selecting hexes is a thing.
    if (selectedHex != null) {
      drawHexStats(hexes[selectedHex]);
    }

    if (menuId != menuEnum.UNCLICKED) {
      drawInfoMenu(menuId);
    }
  }

  const numMenuAssets = 4;
  var menuImgArray = new Array(numMenuAssets);
  /**
   * Load menu assets
   */
  function loadMenuAssets() {
    for (let i = 0; i < numMenuAssets; i++) {
      menuImgArray[i] = new Image();
    }

    menuImgArray[0].src = "image_sources/end_turn_button_greyed.png";
    menuImgArray[1].src = "image_sources/end_turn_button.png";
    menuImgArray[2].src = "image_sources/military_button.png";
    menuImgArray[3].src = "image_sources/economy_button.png";
  }

  /**
   * Draws the bottom menu where game options would be
   */
  function drawMenu() {
    menuCtx.clearRect(0, 0, canvasW, canvasH);

    menuCtx.drawImage(menuImgArray[1], innerWidth / 2 - 60, innerHeight - 120);
    menuCtx.drawImage(menuImgArray[2], innerWidth / 2 - 200, innerHeight - 85);
    menuCtx.drawImage(menuImgArray[3], innerWidth / 2 + 80, innerHeight - 85);
  }

  /**
   * Draws the the text for structures to the production menu.
   * @param {number} lineStartX
   * @param {number} lineEndX
   * @param {object} structure
   * @param {object} prodQuants
   * @param {number} structureType
   */
  function drawMenuStructureText(
    lineStartX,
    lineEndX,
    structures,
    prodQuants,
    structureType
  ) {
    // Draw expanded production menu
    let textYTop = textY;
    textY += 22;
    let textX = lineStartX + 60;

    structures.forEach((structure) => {
      if (structure.type == structureType) {
        // Draw structure text
        menuCtx.font = "14px sans-serif";
        const { name, effect, cost, time, buff } = structure;

        prodMenuString = `${name.toUpperCase()} - ${effect}`;

        menuCtx.fillText(prodMenuString, textX, textY);
        // textYTop = textY;
        textY += 22;

        prodMenuString = `Cost: ${cost} | Turns: ${time} | Buff: ${buff}`;

        menuCtx.fillText(prodMenuString, textX, textY);

        // Draw number box thing
        quantBoxLength = 30;
        lineDiff = textY - textYTop - 10;
        quantBoxY = 10 + textYTop + lineDiff / 2 - quantBoxLength / 2;
        menuCtx.strokeStyle = menuTextColor;
        menuCtx.lineWidth = 1;
        menuCtx.strokeRect(
          lineStartX,
          quantBoxY,
          quantBoxLength,
          quantBoxLength
        );

        // Draws quantity of production items to be built
        menuCtx.font = "24px sans-serif";
        menuCtx.fillText(
          prodQuants[0],
          lineStartX + 8,
          quantBoxY + 5 + lineDiff / 2
        );

        // Draw increment button
        menuCtx.beginPath();
        menuCtx.moveTo(lineStartX + 35, 8 + textYTop + lineDiff / 2);
        menuCtx.lineTo(lineStartX + 44, 12 + textYTop);
        menuCtx.lineTo(lineStartX + 53, 8 + textYTop + lineDiff / 2);
        menuCtx.lineTo(lineStartX + 35, 8 + textYTop + lineDiff / 2);
        menuCtx.fillStyle = menuTextColor;
        menuCtx.fill();

        // Draw decrement button
        menuCtx.beginPath();
        menuCtx.moveTo(lineStartX + 35, 12 + textYTop + lineDiff / 2);
        menuCtx.lineTo(lineStartX + 53, 12 + textYTop + lineDiff / 2);
        menuCtx.lineTo(lineStartX + 44, textY - 2);
        menuCtx.moveTo(lineStartX + 35, 12 + textYTop + lineDiff / 2);
        menuCtx.fillStyle = menuTextColor;
        menuCtx.fill();

        // Draw horizontal line between items
        drawHorizontalLine(lineStartX, lineEndX, textY + 5, menuTextColor, 1);
        textYTop = textY;
        textY += 22;

        numStructuresDrawn++;
      }
    });

    if (numStructuresDrawn == 0) {
      menuCtx.font = "20px sans-serif";
      menuCtx.fillText(
        "No structures of this type can be built here.",
        lineStartX + 25,
        textY - 24
      );
    }

    textY = textYTop;

    // Draw horizontal line between categories
    drawHorizontalLine(lineStartX, lineEndX, textYTop + 5, menuTextColor, 2);
  }

  let drawExit = true;
  let numStructuresDrawn = 0;
  /**
   * Sets the starting text height for the info menu.
   */
  let textY = innerHeight / 2 - 250;
  /**
   * Draws the menus that pop up in the middle of the screen (military, production, economy, etc.)
   * @param {number} menuType - Type of the menu to be drawn.
   */
  this.drawInfoMenu = function (menuType) {
    numStructuresDrawn = 0;
    drawExit = true;
    menuCtx.clearRect;

    // Draw menu background
    menuCtx.fillStyle = bgMenuColor;
    menuCtx.fillRect(innerWidth / 2 - 250, innerHeight / 2 - 350, 500, 600);

    // Draw menu outline
    menuCtx.beginPath();
    menuCtx.moveTo(innerWidth / 2 - 250, innerHeight / 2 - 350);
    menuCtx.lineTo(innerWidth / 2 + 250, innerHeight / 2 - 350);
    menuCtx.lineTo(innerWidth / 2 + 250, innerHeight / 2 + 250);
    menuCtx.lineTo(innerWidth / 2 - 250, innerHeight / 2 + 250);
    menuCtx.lineTo(innerWidth / 2 - 250, innerHeight / 2 - 350);
    menuCtx.lineWidth = 3;
    menuCtx.strokeStyle = borderColor;
    menuCtx.stroke();

    // Draws info to the menu based on menu type
    switch (menuType) {
      case menuEnum.MILITARY:
        menuCtx.fillStyle = menuTextColor;
        menuCtx.font = "36px times-new-roman";
        menuCtx.textAlign = "center";
        menuCtx.fillText(
          "MILITARY OVERVIEW:",
          innerWidth / 2,
          innerHeight / 2 - 305
        );

        menuCtx.font = "24px sans-serif";
        menuCtx.fillText(
          "Total: " +
            players[currentPlayer].totalUnits +
            " Soldiers: Archers: Cavalry: ",
          innerWidth / 2,
          innerHeight / 2 - 260
        );

        let militaryMenuString = "";
        let hexTotalUnits = 0;
        let militaryMenuTextPosX = innerWidth / 2 - 230,
          militaryMenuTextPosY = innerHeight / 2 - 225;
        for (let hex of players[currentPlayer].hexesControlled) {
          if (hexes[hex].units.length > 0) {
            for (let i = 0; i < hexes[hex].unitSum.length; i++) {
              hexTotalUnits += hexes[hex].unitSum[i];
            }

            militaryMenuString +=
              "Hex " +
              hex +
              ": Total: " +
              hexTotalUnits +
              ", Soldiers: " +
              hexes[hex].unitSum[0] +
              ", Archers: " +
              hexes[hex].unitSum[1] +
              ", Cavalry " +
              hexes[hex].unitSum[2];

            menuCtx.font = "20px sans-serif";
            menuCtx.textAlign = "left";
            menuCtx.fillText(
              militaryMenuString,
              militaryMenuTextPosX,
              militaryMenuTextPosY
            );
            militaryMenuTextPosY += 30;
            militaryMenuString = "";
            hexTotalUnits = 0;
          }
        }
        break;

      case menuEnum.ECONOMY:
        menuCtx.fillStyle = menuTextColor;
        menuCtx.font = "36px times-new-roman";
        menuCtx.textAlign = "center";

        menuCtx.fillText("MARKET:", innerWidth / 2, innerHeight / 2 - 305);

        let demandString = "Resource in demand: " + bank.resourceInDemand;
        menuCtx.font = "28px sans-serif";
        menuCtx.fillText(demandString, innerWidth / 2, innerHeight / 2 - 260);

        let econMenuString = "";
        let econMenuTextPosX = innerWidth / 2 - 230,
          econMenuTextPosY = innerHeight / 2 - 210;
        for (let i = 0; i < numResources; i++) {
          econMenuString +=
            bank.resources[i].typeString +
            ": " +
            bank.resources[i].buyPrice +
            "b/" +
            bank.resources[i].sellPrice +
            "s ";

          menuCtx.font = "24px sans-serif";
          menuCtx.textAlign = "left";
          menuCtx.fillText(econMenuString, econMenuTextPosX, econMenuTextPosY);
          econMenuTextPosY += 50;
          econMenuString = "";
        }
        break;

      case menuEnum.PRODUCTION:
        menuCtx.fillStyle = menuTextColor;
        menuCtx.font = "36px times-new-roman";
        menuCtx.textAlign = "center";
        menuCtx.fillText("PRODUCTION:", innerWidth / 2, innerHeight / 2 - 305);

        let prodMenuString = "+ ECONOMY";
        textY = innerHeight / 2 - 250;
        let lineStartX = innerWidth / 2 - 228;
        let lineEndX = innerWidth / 2 + 228;
        menuCtx.font = "26px times-new-roman";
        menuCtx.textAlign = "left";
        menuCtx.fillText(prodMenuString, lineStartX, textY);
        drawHorizontalLine(lineStartX, lineEndX, textY + 5, menuTextColor, 2);

        let quantBoxLength;
        let quantBoxY;
        let lineDiff;
        let prodQuants = new Array(numStructures);
        prodQuants.fill(0);

        if (prodMenuID == menuEnum.ECONOMY) {
          drawMenuStructureText(
            lineStartX,
            lineEndX,
            Structures,
            prodQuants,
            structureTypeEnum.ECONOMY
          );
        }

        textY += 36;
        prodMenuString = "+ MILITARY";
        menuCtx.font = "26px times-new-roman";
        menuCtx.fillText(prodMenuString, lineStartX, textY);
        drawHorizontalLine(lineStartX, lineEndX, textY + 5, menuTextColor, 2);
        textY += 36;

        if (prodMenuID == menuEnum.MILITARY) {
          // Draw expanded production menu
          drawMenuStructureText(
            lineStartX,
            lineEndX,
            Structures,
            prodQuants,
            structureTypeEnum.MILITARY
          );
          textY += 36;
        }

        prodMenuString = "+ MOVEMENT";
        menuCtx.font = "26px times-new-roman";
        menuCtx.fillText(prodMenuString, lineStartX, textY);
        drawHorizontalLine(lineStartX, lineEndX, textY + 5, menuTextColor, 2);
        textY += 36;

        if (prodMenuID == menuEnum.MOVEMENT) {
          // Shouldn't need this here, pls fix.
          textY -= 36;

          // Draw expanded production menu
          drawMenuStructureText(
            lineStartX,
            lineEndX,
            Structures,
            prodQuants,
            structureTypeEnum.MOVEMENT
          );
          textY += 36;
        }

        prodMenuString = "+ PRODUCTION";
        menuCtx.font = "26px times-new-roman";
        menuCtx.fillText(prodMenuString, lineStartX, textY);
        drawHorizontalLine(lineStartX, lineEndX, textY + 5, menuTextColor, 2);
        textY += 36;

        if (prodMenuID == menuEnum.PRODUCTION) {
          // Shouldn't need this here, pls fix.
          textY -= 36;

          // Draw expanded production menu
          drawMenuStructureText(
            lineStartX,
            lineEndX,
            Structures,
            prodQuants,
            structureTypeEnum.PRODUCTION
          );
          textY += 36;
        }
        break;

      case menuEnum.GLOBAL_EVENT:
        menuCtx.fillStyle = menuTextColor;
        menuCtx.font = "36px times-new-roman";
        menuCtx.textAlign = "center";
        menuCtx.fillText(
          GlobalEvents[globalEvent].name,
          innerWidth / 2,
          innerHeight / 2 - 305
        );
        menuCtx.font = "24px sans-serif";
        menuCtx.fillText(
          GlobalEvents[globalEvent].textContent,
          innerWidth / 2,
          innerHeight / 2 - 250
        );
        menuCtx.font = "28px sans-serif";
        menuCtx.fillText(
          GlobalEvents[globalEvent].effect,
          innerWidth / 2,
          innerHeight / 2 - 100
        );
        menuCtx.fillText(
          "Turns remaining: " + globalEventCounter,
          innerWidth / 2,
          innerHeight / 2
        );
        break;

      case menuEnum.NATL_EVENT:
        menuCtx.fillStyle = menuTextColor;
        menuCtx.font = "36px times-new-roman";
        menuCtx.textAlign = "center";
        menuCtx.fillText(
          NatlEvents[natlEvent].name,
          innerWidth / 2,
          innerHeight / 2 - 305
        );
        menuCtx.font = "24px sans-serif";
        menuCtx.fillText(
          NatlEvents[natlEvent].textContent,
          innerWidth / 2,
          innerHeight / 2 - 250
        );
        menuCtx.font = "28px sans-serif";
        menuCtx.fillText(
          NatlEvents[natlEvent].effect,
          innerWidth / 2,
          innerHeight / 2 - 100
        );
        menuCtx.fillText(
          "Do you spend the points?",
          innerWidth / 2,
          innerHeight / 2
        );
        drawExit = false;
        break;

      default:
        break;
    }

    // Draws pop up buttons
    menuCtx.fillStyle = menuTextColor;
    menuCtx.font = "36px times-new-roman";
    menuCtx.textAlign = "center";
    menuCtx.lineWidth = 2;
    menuCtx.strokeStyle = menuTextColor;
    if (drawExit) {
      menuCtx.fillText("EXIT", innerWidth / 2, innerHeight / 2 + 200);
      menuCtx.strokeRect(innerWidth / 2 - 50, innerHeight / 2 + 165, 100, 45);
    } else if (!drawExit) {
      menuCtx.fillText("Yes\t\t\t\tNo", innerWidth / 2, innerHeight / 2 + 200);
      menuCtx.strokeRect(innerWidth / 2 - 80, innerHeight / 2 + 165, 75, 45);
      menuCtx.strokeRect(innerWidth / 2 + 20, innerHeight / 2 + 165, 65, 45);
    }
  };

  /**
   * Draws pop up that instructs users to select their starting hex
   */
  this.drawCapitalInfo = function () {
    menuCtx.clearRect(0, 0, canvasW, canvasH);
    drawMenu();
    menuCtx.fillStyle = bgMenuColor;
    menuCtx.fillRect(innerWidth / 2 - 400, innerHeight / 2 - 100, 800, 200);

    menuCtx.fillStyle = menuTextColor;
    menuCtx.font = "48px times-new-roman";
    menuCtx.textAlign = "center";
    menuCtx.fillText(
      "Select your starting hex on the map:",
      innerWidth / 2,
      innerHeight / 2
    );
    menuCtx.fillText("Ok", innerWidth / 2, innerHeight / 2 + 70);
  };

  /**
   * Draws units to a specific hex (design is temporary)
   * @param {number} hexNum - Number of the hex to draw the unit on.
   */
  this.drawUnits = function (hexNum) {
    boardCtx.beginPath();
    boardCtx.lineWidth = 1;
    boardCtx.strokeStyle = "black";
    boardCtx.fillStyle = "red";
    boardCtx.arc(
      hexes[hexNum].originX + 53,
      hexes[hexNum].originY + 55,
      10,
      0,
      Math.PI * 2,
      true
    );
    boardCtx.fill();
    boardCtx.fillStyle = "white";
    boardCtx.font = "12px sans-serif";
    boardCtx.fillText(
      hexes[hexNum].numUnits,
      hexes[hexNum].originX + 49.5,
      hexes[hexNum].originY + 59
    );
  };

  /**
   * Draws bottom-left menu for hex stats.
   * @param {object} hex - Hex that contains the information to be drawn to the menu.
   */
  function drawHexStats(hex) {
    var hexStatBoxWidth = Math.min(380, innerWidth / 3.5);
    var hexStatBoxHeight = 170;

    // Draws the background of the menu
    statCtx.fillStyle = bgMenuColor;
    statCtx.fillRect(
      0,
      innerHeight - hexStatBoxHeight,
      hexStatBoxWidth,
      hexStatBoxHeight
    );

    // Draws the outline of the menu
    statCtx.beginPath();
    statCtx.moveTo(0, innerHeight - hexStatBoxHeight);
    statCtx.lineTo(hexStatBoxWidth, innerHeight - hexStatBoxHeight);
    statCtx.lineTo(hexStatBoxWidth, innerHeight);
    statCtx.lineTo(0, innerHeight);
    statCtx.lineTo(0, innerHeight - hexStatBoxHeight);
    statCtx.strokeStyle = borderColor;
    statCtx.lineWidth = 3;
    statCtx.stroke();

    // Draws the text content of the menu
    let textY = innerHeight - hexStatBoxHeight + 28;
    let lineSpacing = 22;
    statCtx.fillStyle = menuTextColor;
    statCtx.textAlign = "center";
    statCtx.font = "22px times-new-roman";
    statCtx.fillText("SELECTED HEX:", hexStatBoxWidth / 2, textY);
    textY += 30;

    let textString;
    statCtx.textAlign = "left";
    statCtx.font = "18px sans-serif";

    textString = "Units: " + hex.units.length;
    statCtx.fillText(textString, 5, textY);
    textY += lineSpacing;

    textString = "Resource given: " + hex.getResource();
    statCtx.fillText(textString, 5, textY);
    textY += lineSpacing;

    textString = "Econ score: " + hex.econScore;
    statCtx.fillText(textString, 5, textY);
    textY += lineSpacing;

    textString = "Movement score: " + hex.movementScore;
    statCtx.fillText(textString, 5, textY);
    textY += lineSpacing;

    textString = "Defensive score (Base): " + hex.defensiveScore;
    statCtx.fillText(textString, 5, textY);
    textY += lineSpacing;
  }

  /**
   * Draws the top part of the menu where game statistics would be.
   */
  function drawStats() {
    var rectLeftBound = innerWidth / 2 - 250;
    var rectRightBound = innerWidth / 2 + 250;

    statCtx.clearRect(0, 0, canvasW, canvasH);

    // Draw the main bg rect
    statCtx.fillStyle = bgMenuColor;
    statCtx.fillRect(rectLeftBound, 0, 500, 85);

    // Draws the left triangle adjacent to the banner rect
    statCtx.beginPath();
    statCtx.moveTo(rectLeftBound + 1, 85);
    statCtx.lineTo(rectLeftBound - 50, 0);
    statCtx.lineTo(rectLeftBound + 1, 0);
    statCtx.closePath();
    statCtx.fillStyle = bgMenuColor;
    statCtx.fill();

    // Draws the right triangle adjacent to the banner rect
    statCtx.beginPath();
    statCtx.moveTo(rectRightBound - 1, 85);
    statCtx.lineTo(rectRightBound + 50, 0);
    statCtx.lineTo(rectRightBound - 1, 0);
    statCtx.closePath();
    statCtx.fillStyle = bgMenuColor;
    statCtx.fill();

    // Draws the outline of the banner
    statCtx.beginPath();
    statCtx.moveTo(rectRightBound + 50, 0);
    statCtx.lineTo(rectRightBound, 85);
    statCtx.lineTo(rectLeftBound, 85);
    statCtx.lineTo(rectLeftBound - 50, 0);
    statCtx.lineWidth = 3;
    statCtx.strokeStyle = borderColor;
    statCtx.stroke();

    // Draw the main text
    statCtx.fillStyle = menuTextColor;
    statCtx.font = "26px times-new-roman";
    statCtx.textAlign = "center";
    statCtx.fillText("I  N  F  L  U  E  N  C  E", innerWidth / 2, 75);

    // Draw the IP total bar outline
    statCtx.strokeStyle = menuTextColor;
    statCtx.lineWidth = "1px";
    statCtx.strokeRect(rectLeftBound + 40, 20, 420, 20);

    // Draw the inside of the IP total bar
    statCtx.fillStyle = accentBlue;
    statCtx.fillRect(rectLeftBound + 41, 21, 200, 18);
  }

  /**
   * Draws a horizontal line to the screen.
   * @param {number} x1 - Starting x coordinate of the line.
   * @param {number} x2 - Ending x coordinate of the line.
   * @param {number} y - Y coordinate of the line.
   * @param {string} color - Color of the line.
   * @param {number} lineWidth - Width of the line.
   */
  function drawHorizontalLine(x1, x2, y, color, lineWidth) {
    menuCtx.beginPath();
    menuCtx.moveTo(x1, y);
    menuCtx.lineTo(x2, y);
    menuCtx.closePath();
    menuCtx.strokeStyle = color;
    menuCtx.lineWidth = lineWidth;
    menuCtx.stroke();
  }

  var testAudio;

  /**
   * Loads audio (currently for testing).
   */
  function loadSounds() {
    testAudio = new Audio("sounds\\Book_TurnPage_04.wav");
  }

  // Drawing the board
  drawStats();
  loadImgHexes();
  loadSounds();
  hexImgArray[numHexTypes - 1].onload = function () {
    drawImgHexes(drawBoardStartPositionX, drawBoardStartPositionY);
  };

  // Draws menu when loaded
  loadMenuAssets();
  menuImgArray[numMenuAssets - 1].onload = function () {
    drawMenu();
  };

  // Events
  document.addEventListener("mousemove", setMousePos, false);
  document.addEventListener("click", mouseHandlerHex, false);

  // Scrolls the map
  var mousePosX = -1;
  var mousePosY = -1;

  // Initial position of the canvas
  var posXCanvas = 225,
    posYCanvas = 106;

  // Stores if the board is currently scrolling
  var scrolling = false;

  // Distance from last mouse move
  var deltaX, deltaY;

  // Amount the board should scroll
  var scrollDistX = 0,
    scrollDistY = 0;

  /**
   * Keeps track of the mouse position.
   * @param {object} e - Event
   */
  function setMousePos(e) {
    deltaX = e.movementX;
    deltaY = e.movementY;
    mousePosX = e.clientX;
    mousePosY = e.movementY;
    canvasEdgeScroll(e);
  }

  /**
   * Scrolls the canvas right.
   */
  function scrollRight() {
    if (
      deltaX >= 0 &&
      mousePosX < window.innerWidth &&
      scrollDistX < canvasW - window.innerWidth
    ) {
      posXCanvas -= 5;
      scrollDistX += 5;
      drawImgHexes(posXCanvas, posYCanvas);
      requestAnimationFrame(scrollRight);
    } else {
      scrolling = false;
    }
  }

  /**
   * Scrolls the canvas left
   */
  function scrollLeft() {
    if (deltaX <= 0 && mousePosX > 0 && scrollDistX > 0) {
      posXCanvas += 5;
      scrollDistX -= 5;
      drawImgHexes(posXCanvas, posYCanvas);
      requestAnimationFrame(scrollLeft);
    } else {
      scrolling = false;
    }
  }

  /**
   * Scrolls the canvas up
   */
  function scrollUp() {
    if (deltaY <= 0 && mousePosY > 0 && scrollDistY > 0) {
      posYCanvas += 3;
      scrollDistY -= 3;
      drawImgHexes(posXCanvas, posYCanvas);
      requestAnimationFrame(scrollUp);
    } else {
      scrolling = false;
    }
  }

  /**
   * Scrolls the canvas down
   */
  function scrollDown() {
    if (
      deltaY >= 0 &&
      mousePosY < window.innerHeight &&
      scrollDistY < canvasH - window.innerHeight
    ) {
      posYCanvas -= 3;
      scrollDistY += 3;
      drawImgHexes(posXCanvas, posYCanvas);
      requestAnimationFrame(scrollDown);
    } else {
      scrolling = false;
    }
  }

  /**
   * Scrolls the canvas when the mouse is on the edge of the canvas.
   * @param {object} e - Event
   */
  function canvasEdgeScroll(e) {
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
        } else if (
          mousePosY > window.innerHeight - 200 &&
          mousePosY < window.innerHeight - 120
        ) {
          scrolling = true;
          scrollDown();
        }
      }

      if (canvasW > innerWidth) {
        if (mousePosX < detectionWidth) {
          scrolling = true;
          scrollLeft();
        } else if (mousePosX > innerWidth - detectionWidth) {
          scrolling = true;
          scrollRight();
        }
      }
    }
  }

  /**
   * Calculates slope for hitbox detection.
   * @param {number} x0 - X coordinate of the first point.
   * @param {number} y0 - Y coordinate of the first point.
   * @param {number} x1 - X coordinate of the second point.
   * @param {number} y1 - Y coordinate of the second point.
   */
  function slope(x0, y0, x1, y1) {
    return (y1 - y0) / (x1 - x0);
  }

  /**
   * Calculates the y-intercept of a line for hitbox detection.
   * @param {number} x - X value
   * @param {number} y - Y value
   * @param {number} m - Slope
   */
  function intercept(x, y, m) {
    return y - m * x;
  }

  /**
   * Calculates hitboxes on click
   * @param {object} e - Event
   */
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
        menuId = menuEnum.UNCLICKED;
        drawImgHexes(posXCanvas, posYCanvas);
        endTurn();
        // drawMenu();
      }
      // Military menu button
      else if (
        mousePosX > innerWidth / 2 - 200 &&
        mousePosX < innerWidth / 2 - 80
      ) {
        if (menuId == menuEnum.MILITARY) {
          drawImgHexes(posXCanvas, posYCanvas);
          menuId = menuEnum.UNCLICKED;
        } else {
          testAudio.play();
          menuId = menuEnum.MILITARY;
          drawInfoMenu(menuEnum.MILITARY);
        }
      }
      // Economy menu button
      else if (
        mousePosX > innerWidth / 2 + 80 &&
        mousePosX < innerWidth / 2 + 200
      ) {
        if (menuId == menuEnum.ECONOMY) {
          drawImgHexes(posXCanvas, posYCanvas);
          menuId = menuEnum.UNCLICKED;
        } else {
          testAudio.play();
          menuId = menuEnum.ECONOMY;
          drawInfoMenu(menuEnum.ECONOMY);
        }
      }
    }
    // Starting hex pop-up hitboxes (scuffed, but temorary.)
    else if (
      currentTurn == 0 &&
      !popUpClicked &&
      mousePosX > innerWidth / 2 - 40 &&
      mousePosX < innerWidth / 2 + 40 &&
      mousePosY > innerHeight / 2 &&
      mousePosY < innerHeight / 2 + 100
    ) {
      drawImgHexes(posXCanvas, posYCanvas);
      popUpClicked = true;
    }
    // Closes info menus
    else if (
      drawExit &&
      menuId != menuEnum.UNCLICKED &&
      mousePosX > innerWidth / 2 - 50 &&
      mousePosX < innerWidth / 2 + 40 &&
      mousePosY > innerHeight / 2 + 165 &&
      mousePosY < innerHeight / 2 + 210
    ) {
      menuId = menuEnum.UNCLICKED;
      prodMenuID = menuEnum.UNCLICKED;
      drawImgHexes(posXCanvas, posYCanvas);
    }
    // Expands production menu
    else if (
      menuId == menuEnum.PRODUCTION &&
      prodMenuID == menuEnum.UNCLICKED
    ) {
      if (
        mousePosX > innerWidth / 2 - 230 &&
        mousePosX < innerWidth / 2 - 205 &&
        mousePosY > innerHeight / 2 - 270 &&
        mousePosY < innerHeight / 2 - 245
      ) {
        prodMenuID = menuEnum.ECONOMY;
        drawInfoMenu(menuEnum.PRODUCTION);
      } else if (
        mousePosX > innerWidth / 2 - 230 &&
        mousePosX < innerWidth / 2 - 205 &&
        mousePosY > innerHeight / 2 - 234 &&
        mousePosY < innerHeight / 2 - 209
      ) {
        prodMenuID = menuEnum.MILITARY;
        drawInfoMenu(menuEnum.PRODUCTION);
      } else if (
        mousePosX > innerWidth / 2 - 230 &&
        mousePosX < innerWidth / 2 - 205 &&
        mousePosY > innerHeight / 2 - 198 &&
        mousePosY < innerHeight / 2 - 173
      ) {
        prodMenuID = menuEnum.MOVEMENT;
        drawInfoMenu(menuEnum.PRODUCTION);
      } else if (
        mousePosX > innerWidth / 2 - 230 &&
        mousePosX < innerWidth / 2 - 205 &&
        mousePosY > innerHeight / 2 - 162 &&
        mousePosY < innerHeight / 2 - 137
      ) {
        prodMenuID = menuEnum.PRODUCTION;
        drawInfoMenu(menuEnum.PRODUCTION);
      }
    }
    // Hitbox for yes button
    else if (
      !drawExit &&
      mousePosX > innerWidth / 2 - 80 &&
      mousePosX < innerWidth / 2 - 5 &&
      mousePosY > innerHeight / 2 + 165 &&
      mousePosY < innerWidth / 2 + 210
    ) {
      runNationalEvent(true);
      menuID = menuEnum.UNCLICKED;
      drawExit = true;
      drawImgHexes(posXCanvas, posYCanvas);
    }
    // Hitbox for no button
    else if (
      !drawExit &&
      mousePosX > innerWidth / 2 + 20 &&
      mousePosX < innerWidth / 2 + 85 &&
      mousePosY > innerHeight / 2 + 165 &&
      mousePosY < innerWidth / 2 + 210
    ) {
      runNationalEvent(false);
      menuID = menuEnum.UNCLICKED;
      drawExit = true;

      drawImgHexes(posXCanvas, posYCanvas);
    } else if (mousePosY < 26) {
      return;
    }
    // Calculates hex hitboxes
    else if (menuId == menuEnum.UNCLICKED) {
      for (i = 0; i < numHexes * 3; i++) {
        if (mousePosY > hexesPos[i][3] && mousePosY < hexesPos[i][11]) {
          if (mousePosX > hexesPos[i][2]) {
            if (mousePosX < hexesPos[i][4]) {
              isClicked = true;
            } else if (mousePosX < hexesPos[i][6]) {
              if (mousePosY < hexesPos[i][7]) {
                m = slope(
                  hexesPos[i][6],
                  hexesPos[i][7],
                  hexesPos[i][4],
                  hexesPos[i][5]
                );
                b = intercept(hexesPos[i][6], hexesPos[i][7], m);
                if (mousePosY > m * mousePosX + b) {
                  isClicked = true;
                }
              } else if (mousePosY > hexesPos[i][7]) {
                m = slope(
                  hexesPos[i][6],
                  hexesPos[i][7],
                  hexesPos[i][8],
                  hexesPos[i][9]
                );
                b = intercept(hexesPos[i][6], hexesPos[i][7], m);
                if (mousePosY < m * mousePosX + b) {
                  isClicked = true;
                }
              }
            }
          } else if (mousePosX > hexesPos[i][0]) {
            if (mousePosY < hexesPos[i][1]) {
              m = slope(
                hexesPos[i][0],
                hexesPos[i][1],
                hexesPos[i][2],
                hexesPos[i][3]
              );
              b = intercept(hexesPos[i][0], hexesPos[i][1], m);
              if (mousePosY > m * mousePosX + b) {
                isClicked = true;
              }
            } else if (mousePosY > hexesPos[i][1]) {
              m = slope(
                hexesPos[i][0],
                hexesPos[i][1],
                hexesPos[i][10],
                hexesPos[i][11]
              );
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
            if (
              currentTurn == 0 &&
              players[currentPlayer].hexesControlled.size == 0 &&
              !hexes[i].isControlled
            ) {
              // Should also add all of the hexes that border this hex here
              addTerritory(currentPlayer, i);

              // Testing:
              console.log(players[currentPlayer].hexesControlled);
              console.log("\n");
              menuId = menuEnum.UNCLICKED;
              selectedHex = i;
              drawImgHexes(posXCanvas, posYCanvas);
              endTurn();
            }
            // Opens the production menu
            else if (
              hexes[i].isControlled &&
              hexes[i].controllingPlayer == currentPlayer
            ) {
              selectedHex = i;
              drawImgHexes(posXCanvas, posYCanvas);

              // In multiplayer there needs to be a player check here.
              menuId = menuEnum.PRODUCTION;
              drawInfoMenu(menuEnum.PRODUCTION);
            } else {
              selectedHex = i;
              menuID = menuEnum.UNCLICKED;
              drawImgHexes(posXCanvas, posYCanvas);
            }

            drawHexStats(hexes[selectedHex]);
          }
        }

        isClicked = false;
      }
    }
  }
};
