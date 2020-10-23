var xMin = -3;
var xMax = 3;
var yMin = -2;
var yMax = 2;

var position = new complex();
var root1 = new complex(1, 0);
var root2 = new complex(0, 1);
var root3 = new complex(-1, 0);
var root4 = new complex(0, -1);

var display;
var ctx;

var generating = false;
var stop = true;

function complex(real, imag) {
  this.real = real;
  this.imag = imag;

  this.square = function () {
    var a = this.real;
    var b = this.imag;
    return new complex(a * a - b * b, 2 * a * b);
  }

  this.cube = function () {
    var a = this.real;
    var b = this.imag;
    return new complex(a * a * a - 3 * a * b * b, 3 * a * a * b - b * b * b);
  }

  this.fourth = function () {
    var a = this.real;
    var b = this.imag;
    return new complex(a ** 4 - 6 * (a ** 2) * (b ** 2) + b ** 4, 4 * (a ** 3) * b - 4 * a * (b ** 3));
  }

  this.abs = function () {
    var a = this.real;
    var b = this.imag;
    return (Math.sqrt(a * a + b * b));
  }

  this.neg = function () {
    var a = this.real;
    var b = this.imag;
    return new complex(-1 * a, -1 * b);
  }

  this.angle = function () {
    var a = this.real;
    var b = this.imag;
    if (a >= 0) {
      var theta = Math.atan(b / a);
    } else {
      var theta = Math.atan(b / a) + Math.PI;
    }
    if (arguments[0] == "deg") {
      theta = 180 * theta / Math.PI;
    }
    return theta;
  }
}

function add() {
  var a = 0;
  var b = 0;
  for (var i = 0; i < arguments.length; i++) {
    a = a + arguments[i].real;
    b = b + arguments[i].imag;
  }
  return new complex(a, b);
}

function multiply() {
  var a = arguments[0].real;
  var b = arguments[0].imag;
  for (var i = 1; i < arguments.length; i++) {
    var a2 = arguments[i].real;
    var b2 = arguments[i].imag;
    var aTemp = a;
    a = a * a2 - b * b2;
    b = aTemp * b2 + b * a2;
  }
  return new complex(a, b);
}

function divide(comp1, comp2) {
  var a = comp1.real;
  var b = comp1.imag;
  var a2 = comp2.real;
  var b2 = comp2.imag;
  var aNew = (a * a2 + b * b2) / (a2 * a2 + b2 * b2);
  var bNew = (b * a2 - a * b2) / (a2 * a2 + b2 * b2);
  return new complex(aNew, bNew);
}

/*function renderBasin(d1, d2, d3, d4, x, y) {
  if (d1 < d2 && d1 < d3 && d1 < d4) {
    ctx.fillStyle = "#5A81C3";
    ctx.fillRect(x, y, 1, 1);
  } else if (d2 < d3 && d2 < d4) {
    ctx.fillStyle = "#95FFCC ";
    ctx.fillRect(x, y, 1, 1);
  } else if (d3 < d4) {
    ctx.fillStyle = "#BC3030 ";
    ctx.fillRect(x, y, 1, 1);
  } else {
    ctx.fillStyle = "#FFD771";
    ctx.fillRect(x, y, 1, 1);
  }
} */ //пастельные

function randomColor() {
  var r = (Math.round(255.0 * Math.random()).toString(16));
  r = r.length < 2 ? "0" + r : r;
  var g = (Math.round(255.0 * Math.random()).toString(16));
  g = g.length < 2 ? "0" + g : g;
  var b = (Math.round(255.0 * Math.random()).toString(16));
  b = b.length < 2 ? "0" + b : b;
  return "#" + r + g + b;
}

function renderBasin(d1, d2, d3, d4, x, y, c1, c2, c3, c4) {
  if (d1 < d2 && d1 < d3 && d1 < d4) {
    ctx.fillStyle = c1;
    ctx.fillRect(x, y, 1, 1);
  } else if (d2 < d3 && d2 < d4) {
    ctx.fillStyle = c2;
    ctx.fillRect(x, y, 1, 1);
  } else if (d3 < d4) {
    ctx.fillStyle = c3;
    ctx.fillRect(x, y, 1, 1);
  } else {
    ctx.fillStyle = c4;
    ctx.fillRect(x, y, 1, 1);
  }
}

function renderAngle(point, x, y) {
  var angle = point.angle("deg");
  ctx.fillStyle = "hsl(" + angle + ", 100%, 50%)";
  ctx.fillRect(x, y, 1, 1);
}


function generate(method) {
  c1 = randomColor();
  c2 = randomColor();
  c3 = randomColor();
  c4 = randomColor();
  var iterations = document.getElementById('iter').value;
  for (var y = 0; y < display.height; y++) {
    for (var x = 0; x < display.width; x++) {
      position.real = xMin + x * (xMax - xMin) / display.width;
      position.imag = yMin + y * (yMax - yMin) / display.height;
      for (var i = 0; i < iterations; i++) {
        position = add(
          position,
          divide(
            add(
              new complex(-1, 0),
              position.fourth()
            ),
            multiply(
              new complex(4, 0),
              position.cube()
            )
          ).neg()
        )
      }
      var dist1 = add(position, root1.neg()).abs();
      var dist2 = add(position, root2.neg()).abs();
      var dist3 = add(position, root3.neg()).abs();
      var dist4 = add(position, root4.neg()).abs();
      renderBasin(dist1, dist2, dist3, dist4, x, y, c1, c2, c3, c4);
    }
  }

}

function loadPage() {
  display = document.getElementById('display');
  ctx = display.getContext('2d');
  generate();
}