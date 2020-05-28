
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

/*
var img = new Image();
img.onload = function() {
    ctx.drawImage(img, 0, 0);
}
img.src = "image_sources/anothermap.svg";
*/
function handleFileLoad(event) {
    var item = event.item; // A reference to the item that was passed in to the LoadQueue
    var type = item.type;

    // Add any images to the page body.
    if (type == createjs.Types.SVG) {
        document.body.appendChild(event.result);
    }
}

var queue = new createjs.LoadQueue(true);
queue.loadFile({id:"image", src:"image_sources/test_tile.svg"});
queue.on("fileload", handleFileLoad, this);

var bitmap = new createjs.Bitmap("image_sources/test_tile.svg");
ctx.draw(bitmap);

//var img = new Image();
//img.src = "image_sources/anothermap.svg";
//var myImage = new createjs.Bitmap(img);
//myImage.draw(ctx);
//console.log(elems.namedItem(this.#XMLID_15_.sto0));
//console.log(elems.length);