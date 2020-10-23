width = 640;
height = 480;
min = 1;
max = 1;
eps = 1e-10;
h_x = 6 * Math.PI / width;
h_y = 4 * Math.PI / height;
x_a = new Array;
y_a = new Array;
var x_;
var y_;



var values = new Array(width);
for (var i = 0; i < width; i++) {
    values[i] = new Array(height);
}

function f(x, y) {
    return 1 - Math.cos(x) * Math.cos(y);
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


    var minimum = document.getElementById("minimum"); //кнопка
    var canvas = document.getElementById("grad");

    canvas.addEventListener('click', function(event) {

        var x_i = event.pageX - canvas.offsetLeft,
            y_i = event.pageY - canvas.offsetTop;
        console.log(x_i,y_i);
        x_e = -3 * Math.PI + x_i / width * 6 * Math.PI;
        y_e = 2 * Math.PI - y_i / height * 4 * Math.PI;
        console.log(x_e,y_e);
        document.getElementById("x_").value = x_e;
        document.getElementById("y_").value = y_e;
        LocMin(x_e, y_e)
    });

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
            drawPixel(i, j, color, color, 255);
        }
    }
    ctx.putImageData(canvasData, 0, 0);

    function LocMin(x0, y0) {
        k = 1;
        x_a[0] = x0;
        y_a[0] = y0;
        ctx.fillStyle = "#FFFF00";
        x_fill = width * (3 * Math.PI + x_a[0]) / (6 * Math.PI);
        y_fill = height * (2 * Math.PI - y_a[0]) / (4 * Math.PI);
        ctx.fillRect(x_fill, y_fill, 4, 4);
        x_a[1] = x_a[0] - f(x_a[0] + h_x / 2, y_a[0]) + f(x_a[0] - h_x / 2, y_a[0]);
        y_a[1] = y_a[0] - f(x_a[0], y_a[0] + h_x / 2) + f(x_a[0], y_a[0] - h_x / 2);
        while (f(x_a[k - 1], y_a[k - 1]) > f(x_a[k], y_a[k])) {
            for (i = k; i < k + 1; i++) {
                x_a[i + 1] = x_a[i] - f(x_a[i] + h_x / 2, y_a[i]) + f(x_a[i] - h_x / 2, y_a[i]);
                y_a[i + 1] = y_a[i] - f(x_a[i], y_a[i] + h_x / 2) + f(x_a[i], y_a[i] - h_x / 2);
                x_fill = width * (3 * Math.PI + x_a[i]) / (6 * Math.PI);
                y_fill = height * (2 * Math.PI - y_a[i]) / (4 * Math.PI);
                ctx.fillStyle = "#000000";
                ctx.fillRect(x_fill, y_fill, 1, 1);
            }
            k++;
            //break;
        }
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(x_fill, y_fill, 4, 4);

    }
    //LocMin(4, 5);

    minimum.addEventListener("click", function (event) {
        x_ = Number(document.getElementById("x_").value);
        y_ = Number(document.getElementById("y_").value);
        LocMin(x_, y_);
    });
}