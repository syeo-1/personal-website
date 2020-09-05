function setCanvasSize(canvas, width, height) {
    // console.log(this)
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    canvas.setAttribute('width', width + "px");
    canvas.setAttribute('height', height + "px");
    var context = canvas.getContext("2d");
    canvas.context = context;
    // make the h/w accessible from context obj as well
    context.width = width;
    context.height = height;

    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
    var ratio = devicePixelRatio / backingStoreRatio;

    // upscale the canvas if the two ratios don't match
    if(devicePixelRatio !== backingStoreRatio) {
        var oldWidth = canvas.width;
        var oldHeight = canvas.height;

        canvas.width = oldWidth * ratio;
        canvas.height = oldHeight * ratio;

        canvas.style.width = oldWidth + 'px';
        canvas.style.height = oldHeight + 'px';

        context.scale(ratio, ratio);
    }

}

function Canvas(elem) {
    // console.log(this)
    var canvas = document.createElement('canvas');
    elem.appendChild(canvas);
    var width = elem.offsetWidth;
    var height = elem.offsetHeight;

    setCanvasSize(canvas, width, height);
    return canvas;
}

var GameOfLife = function() {
    // console.log("hello")
    var canvas = Canvas(document.getElementById('gol'))

    var pixelSize = 40;
    var numCellsX = parseInt(window.innerWidth / pixelSize) + 1;
    var numCellsY = parseInt(window.innerHeight / pixelSize) + 1;
    var context = canvas.getContext('2d');
    var img = document.getElementById("bit");

    // console.log("poop")
    function buildArr() {
        var arr = [];
        for(var i = 0; i<numCellsX; i++) {
            var innerArr = [];
            for(var j = 0; j<numCellsY; j++) {
                innerArr.push(0);
            }
            arr.push(innerArr);
        }
        return arr;
    }

    function display(arr) {
        context.clearRect(0, 0, context.width, context.height);

        context.fillStyle = 'rgba(255, 255, 255, 0.1)';

        for(var i = 1; i<numCellsX; i++) {
            context.fillRect(i*pixelSize - 0.5, 0, 1, context.height);
        }
        for(var j = 1; j<numCellsY; j++) {
            context.fillRect(0, j*pixelSize - 0.5, context.width, 1);
        }

        for(var x = 0; x < arr.length; x++) {
            for(var y = 0; y < arr[x].length; y++) {
                drawCell(x,y,arr[x][y]);
            }
        }
    }

    function drawCell(x,y,alive) {
        var padding = 2;
        if(alive) {
            context.drawImage(img, x*pixelSize + padding, y*pixelSize + padding, pixelSize - padding*2, pixelSize - padding*2);
        }
    }

    function randomlyPopulate(arr) {
        for(var x = 0; x < arr.length; x++) {
            for(y = 0; y < arr[x].length; y++) {
                if(Math.random() < 0.2) {
                    arr[x][y]=1;
                }
            }
        }
    }

    function manualSetup(arr) {
        arr[20][20] = 1;
        arr[21][20] = 1;
        arr[22][20] = 1;
    }

    function aliveNeighbors(arr, x, y) {
        if(x > 0 && y > 0 && x < numCellsX-1 && y < numCellsY-1) {
            var totalAlive =
                arr[x-1][y-1]+
                arr[x][y-1]+
                arr[x+1][y-1]+
                arr[x-1][y]+
                //arr[x][y]+
                arr[x+1][y]+
                arr[x-1][y+1]+
                arr[x][y+1]+
                arr[x+1][y+1];
            return totalAlive;
        } else {
            return 0;
        }
    }

    function step(arr) {
        var newArr = buildArr();
        for(var x = 0; x < arr.length; x++) {
            for(var y = 0; y < arr[x].length; y++) {
                var cell = arr[x][y];
                var alives = aliveNeighbors(arr, x,y);

                if(cell == 1) {
                    if(alives < 2) {
                        newArr[x][y] = 0;
                    } else if(alives == 2 || alives == 3) {
                        newArr[x][y] = 1;
                    } else if(alives > 3) {
                        newArr[x][y] = 0;
                    }
                } else if(cell == 0 && alives == 3) {
                    newArr[x][y] = 1;
                }
            }
        }
        return newArr;
    }

    var spawn = function(e) {
        if(e && e.changedTouches && e.changedTouches[0]) {
            e = e.changedTouches[0];
        }

        var x = e.clientX+window.scrollX;
        var y = e.clientY+window.scrollY;

        // console.log(y)
        // console.log(window.scrollY)
        // window.onscroll = function(e) {
        //     console.log(window.scrollY)
        // }

        var cellx = parseInt(x / pixelSize);
        var celly = parseInt(y / pixelSize);
        arr[cellx][celly] = 1;

        drawCell(cellx, celly, 1);

    }

    document.body.addEventListener('touchstart', spawn);
    document.body.addEventListener('mousemove', spawn);
    document.body.addEventListener('touchmove', spawn);

    var arr = buildArr();
    randomlyPopulate(arr);
    //manualSetup(arr);
    display(arr);

    var running = true;

    setInterval(function() {
        if(running) {
            var newArr = step(arr);
            display(newArr);
            arr = newArr;
        }
    }, 150);

};
GameOfLife()
// console.log("awleifalwiebf")