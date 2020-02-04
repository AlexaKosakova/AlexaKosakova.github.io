var table; 
var size;
var time;
var start;
var stop;
var timer;

function loadPage() {
  table = document.getElementById("board");
  var board = "";
    for(let i=0;i<50;i++) {
      board += "<tr>";
      for(let j=0;j<80;j++) {
        board += "<td><div/></td>";
      }
      board += "</tr>";
    }
    table.innerHTML = board;
    
    size = document.getElementById('size');
    time = document.getElementById('time');
    start = document.getElementById('start');
    stop = document.getElementById('stop');

    changeColors();
    changeTable();
}

function changeTable() {
    for (var i = 0; i < table.rows.length; i++) {
        for (var j = 0; j < table.rows[i].cells.length; j++) {
          table.rows[i].cells[j].innerHTML = "<div style='width:" + size.value + ";height:" + size.value + "'></div>";
        }
    }
}

function changeColors() {
  for (var i = 0; i < table.rows.length; i++) {
    for (var j = 0; j < table.rows[i].cells.length; j++) {
      table.rows[i].cells[j].bgColor = getRandColor();
    }
  }
}

function getRandColor() {
    r = (100+Math.round(128*Math.random())).toString(16);
    g = (100+Math.round(128*Math.random())).toString(16);
    b = (100+Math.round(128*Math.random())).toString(16); // цвета от 100 до 228
        color = r + g + 128;
    return  color;
}

function startTimer() {
  /*if (!!timer) {
    clearInterval(timer);
  }*/
  changeTable();
  if (!timer) {
    timer = setInterval(changeColors, time.value)
  }
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

/*var k = 0;

function Timer() {
  if (k%2===0) {
    startTimer();
    k++;
  }
  else {
    stopTimer();
    k++;
  }
}*/