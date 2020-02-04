//секундомер
var timer = 0;
var cell = 0;
Start = function () {
    timer = new Date().getTime()
}
Stop = function () {
    timer = 0;
}

var interval = setInterval(function () {
    if (timer == 0) {
        return;
    }
    document.getElementById('timer').innerHTML = (new Date().getTime() - timer) / 1000
}, 100);
//

function Point() {
    this.isMine = false;
    this.mineAround = 0;
    this.isOpen = false;
}
var game = {
    width: 0,
    height: 0,
    mineCount: 0,
    openCount: 0,
    fieldSize: function () {
        if (document.getElementById("fieldSize").value == 0) {
            this.width = this.height = 9;
            this.mineCount = 10;
            this.openCount = 0;
        }
        if (document.getElementById("fieldSize").value == 1) {
            this.width = this.height = 16;
            this.mineCount = 40;
            this.openCount = 0;
        }
        if (document.getElementById("fieldSize").value == 2) {
            this.width = 30;
            this.height = 16;
            this.mineCount = 100;
            this.openCount = 0;
        }
    },
    field: [],
    fillField: function () {
        this.field = [];
        for (var i = 0; i < this.width; i++) {
            var tmp = [];
            for (var j = 0; j < this.height; j++) {
                tmp.push(new Point());
            }
            this.field.push(tmp);
        }

        for (var i = 0; i < this.mineCount;) { //пока не все мины расставлены
            var x = parseInt(Math.random() * this.width - 0.0001);
            var y = parseInt(Math.random() * this.height - 0.0001);
            if (!(this.field[x][y].isMine)) {
                this.field[x][y].isMine = true;
                i++;
            }
        }
    },
    mineAround_counter: function (x, y) {
        var x_start = x > 0 ? x - 1 : x;
        var y_start = y > 0 ? y - 1 : y;
        var x_end = x < this.width - 1 ? x + 1 : x;
        var y_end = y < this.height - 1 ? y + 1 : y;
        var count = 0;
        for (var i = x_start; i <= x_end; i++) {
            for (var j = y_start; j <= y_end; j++) {
                if (this.field[i][j].isMine && !(x == i && y == j)) {
                    count++;
                }
            }
        }
        this.field[x][y].mineAround = count;
    },

    start_mineCounter: function () {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                this.mineAround_counter(i, j);
            }
        }
    },

    start: function () {
        this.openCount = 0;
        this.fieldSize();
        this.fillField();
        this.start_mineCounter();
        console.log(game.openCount);
    }
}


var page = {
    init: function () {
        this.gameInterface.init();
    },
    gameInterface: {
        table: null,
        init: function () {
            game.start();
            this.div = document.querySelector(".field");
            this.drawField();
            var self = this;
            this.div.addEventListener("click", function (e) {
                if (e.target.matches("td") && !(e.target.matches(".lock"))) {
                    self.open(e);
                }
            })
            this.div.addEventListener("contextmenu", function (e) {
                if (e.target.matches("td")) {
                    self.lock(e);
                }
            })
        },
        drawField: function () {
            this.div.innerHTML = "";
            var table = document.createElement("table");
            this.table = table;
            for (var i = 0; i < game.height; i++) {
                var tr = document.createElement("tr");
                for (var j = 0; j < game.width; j++) {
                    var td = document.createElement("td");
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
            this.div.appendChild(table);
        },
        open: function (e) {
            if (cell == 0) {
            Start();
            cell++;
            }
            x = e.target.cellIndex;
            y = e.target.parentNode.rowIndex;
            this.recurseOpen(x, y);
        },
        recurseOpen: function (x, y) {
            var td = this.table.rows[y].children[x];
            if (game.field[x][y].isOpen) {
                return;
            }
            if (game.field[x][y].isMine) {
                alert("Game over");
                Stop();
                cell = 0;
                document.getElementById('timer').innerHTML = "";
                game.start();
                this.field = [];
                this.drawField();
                
            } else {
                td.innerHTML = game.field[x][y].mineAround;
                game.field[x][y].isOpen = true;
                td.classList.add("open");
                game.openCount++;
                if (game.width * game.height - game.mineCount == game.openCount) {
                    alert("You win");
                    Stop();
                    cell = 0;
                    document.getElementById('timer').innerHTML = "";
                    game.start();
                    this.field = [];
                    this.drawField();
                }
                if (game.field[x][y].mineAround == 0) {
                    for (var i = x > 0 ? x - 1 : x; i <= x + 1 && i < game.width; i++) {
                        for (var j = y > 0 ? y - 1 : y; j <= y + 1 && j < game.height; j++) {
                            this.recurseOpen(i, j);
                        }
                    }
                }

            }
        },

        lock: function (e) {
            x = e.target.cellIndex;
            y = e.target.parentNode.rowIndex;
            if (game.field[x][y].isOpen) {
                return;
            }
            e.target.classList.toggle("lock");
            e.preventDefault();
        }
    }
}

window.onload = function () {
    document.getElementById("fieldSize").onchange = function () {
        page.init();
        Stop();
    }
}