function calculate() {
    var canvas = document.getElementById("func");
    var size = Number(document.getElementById("size").value);
    var t = Number(document.getElementById("t").value);
    var k = Number(document.getElementById("k").value);
    var m = Number(document.getElementById("m").value);
    var r = Number(document.getElementById("r").value);
    var n = Number(document.getElementById("n").value);
    var x0 = [];
    var x_ = [];
    var y_ = [];
    eps = []
    min = 0;
    max = 0;

    for (i = 0; i < m; i++) {
        eps.push([Math.cos(2 * Math.PI * i / m), Math.sin(2 * Math.PI * i / m)])
    }
    console.log("eps", eps);
    x0.push([Number(document.getElementById("x00").value), Number(document.getElementById("x01").value)]);

    width = 400;

    var values = new Array(width);
    for (var i = 0; i < width; i++) {
        values[i] = new Array(width);
    }



    var fun = document.getElementById("fun").value
        .replace(/\^/g, "**")
        .replace(/([A-Za-wz][A-Za-z]*)/g, "Math.$1");
    console.log(fun);

    function f(x, y) {
        return eval(fun);
    }

    for (i = 0; i < width; i++) {
        x = x0[0][0] - size + i / width * 2*size;
        for (j = 0; j < width; j++) {
            y = x0[0][1] + size - j / width * 2*size;
            if (f(x, y) < min) {
                min = f(x, y);
            }
            if (f(x, y) > max) {
                max = f(x, y);
            }
            values[i][j] = f(x, y);
        }
    }
    console.log(min, max);

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
        canvasData.data[index + 3] = 200;
    }


    for (i = 0; i < width; i++) {
        for (j = 0; j < width; j++) {
            var color = 255 - 255 / (max - min) * values[i][j];
            drawPixel(i, j, 255, color, color);
        }
    }
    ctx.putImageData(canvasData, 0, 0);

    function LocMin(x, y) {
        var xIter = [];
        var yIter = [];
        x_[0] = x;
        y_[0] = y;
        ctx.fillStyle = "#FFFF00";
        x_fill = width * (size + x_[0]-x0[0][0]) / (2*size);
        y_fill = width * (size - y_[0]+x0[0][1]) / (2*size);
        ctx.fillRect(x_fill, y_fill, 4, 4);
        xMin = x_[0];
        yMin = y_[0];
        console.log("перед for j, xmin, ymin", xMin, yMin);
        for (j = 0; j < n; j++) {
            console.log('j<10', j);
            while (f(xMin, yMin) >= f(x_[j], y_[j])) {
                console.log("вошел в while");
                for (i = 0; i < m; i++) {

                    xIter[i] = x_[j] + t * eps[i][0];
                    yIter[i] = y_[j] + t * eps[i][1];
                    console.log("i, xIter, iIter ", i, xIter[i], yIter[i], f(xIter[i], yIter[i]));
                }
                xMin = xIter[0];
                yMin = yIter[0];
                for (i = 1; i < m; i++) {
                    if (f(xIter[i], yIter[i]) < f(xMin, yMin)) {
                        xMin = xIter[i];
                        yMin = yIter[i];
                    }
                }
                console.log("после поиска минимума ", xMin, yMin);
                if (t > r) {
                    t = t * k;
                    console.log(t)
                } else {
                    break;
                }
            }
            x_[j + 1] = xMin;
            y_[j + 1] = yMin;
            ctx.fillStyle = "#000000";
            x_fill = width * (size + x_[j + 1]-x0[0][0]) / (2*size);
            y_fill = width * (size - y_[j + 1]+x0[0][1]) / (2*size);
            ctx.fillRect(x_fill, y_fill, 1, 1);
        }
        ctx.fillStyle = "#FF0000";
        x_fill = width * (size + xMin-x0[0][0]) / (2*size);
        y_fill = width * (size - yMin+x0[0][1]) / (2*size);
        ctx.fillRect(x_fill, y_fill, 4, 4);
        document.getElementById("result2").innerHTML = f(xMin,yMin);
        return [xMin, yMin]
    }
    document.getElementById("result1").innerHTML = LocMin(x0[0][0], x0[0][1]);

    LocMin(x0[0][0], x0[0][1]);

}