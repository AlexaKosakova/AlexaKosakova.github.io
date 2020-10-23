/*
const a = math.complex(2, 3)     // Complex 2 + 3i
const b = math.complex('4 - 2i') // Complex 4 - 2i

math.re(a)                       // Number 2
math.im(a)                       // Number 3
math.conj(a)                     // Complex 2 - 3i

math.add(a, b)                   // Complex 6 + i
math.multiply(a, 2)              // Complex 4 + 6i
math.sqrt(-4)                    // Complex 2i

*/


var width = 640;
var height = 480;
var x;
var y;





var values = new Array(width);
for (var i = 0; i < width; i++) {
    values[i] = new Array(height);
}

function f(x, y) {
    return ;
}


for (i = 0; i < width; i++) {
    x = -3 * Math.PI + i / width * 6 * Math.PI;
    for (j = 0; j < height; j++) {
        y = 2 * Math.PI - j / height * 4 * Math.PI;
        if (f(x, y) < min) {
            min = f(x, y);
        }
        if (f(x, y) > max) {
            max = f(x, y);
        }
        values[i][j] = f(x, y);
    }
}
console.log(f(-3 * Math.PI, 2 * Math.PI))



function loadPage() {




    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var ctx = canvas.getContext("2d");
    var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

    // That's how you define the value of a pixel //
    function drawPixel(x, y, r, g, b) {
        var index = (x + y * canvasWidth) * 4;

        canvasData.data[index + 0] = r;
        canvasData.data[index + 1] = g;
        canvasData.data[index + 2] = b;
        canvasData.data[index + 3] = 180;
    }


    for (i = 0; i < width; i++) {
        for (j = 0; j < height; j++) {
            var color = 255 - 255 / (max - min) * values[i][j];
            //drawPixel(i, j, color, color, 255);
        }
    }
    ctx.putImageData(canvasData, 0, 0);

}