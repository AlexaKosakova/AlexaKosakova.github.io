var gameTable = new Array(9);
var gameOverCondition = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]]

function isComp () {
  return document.getElementById('isComp').checked;
}

function comp () {
  var id = Math.floor(Math.random() * 9);
  gameTable[id] ? comp() : move(id);
}

function checkLineCompleted (a, b, c) {
  return gameTable[a] == 1 && gameTable[b] == 1 && gameTable[c] == 1
    || gameTable[a] == 2 && gameTable[b] == 2 && gameTable[c] == 2
}

function isTableFilled () {
  return gameTable[0] && gameTable[1] && gameTable[2] && gameTable[3] && gameTable[4]
  && gameTable[5] && gameTable[6] && gameTable[7] && gameTable[8];
}

var current = 1;

document.getElementById('table').addEventListener('click', function (event) {
  var target = event.target;
  move(target.id, 'player'+current);
})

function move (id) { 
  if (gameTable[id]) {
    return false;
  }
  gameTable[id] = current;
  document.getElementById(id).className = 'cell player' + current;
  if (gameOverCondition.some(item => checkLineCompleted.apply(null, item))) {
    alert("Выиграли "+ (current == 1 ? "крестики" : "нолики"));
  } else if (isTableFilled()) {
    alert("Ничья");
  } else {  
    current = current == 1 ? 2 : 1; 
    if (isComp()&&current==2) {
      comp();
    }
  } 
}
function reset() {
  for (i=0;i<9;i++) {
    gameTable[i] = 0;
    document.getElementById(i).className = 'cell';
  }
  current = 1;
}