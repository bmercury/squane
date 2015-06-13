var level = 0;
var score = 0;
var gray = false;

var levelData = [{
        rows: 2,
        colors: 2,
        speed: 0
    }, // kolonas,krasas,atrums
    {
        rows: 2,
        colors: 3,
        speed: 0
    }, {
        rows: 2,
        colors: 4,
        speed: 0
    }
];

var speedData = [
    3000,
    2000,
    1000
];

var clicks = [];

function mainLevelFunction(thisLevel) {
    createSquares(thisLevel);
    resetSquares(levelData[level].rows * levelData[level].rows);
}

function resetSquares(n) {
    for (var i = 0; i < n; i++) {
        clicks[i] = 0;
    }
}

var ans = [];

function createSquares(thisLevel) {
    var cellCount = levelData[thisLevel].rows * levelData[thisLevel].rows;

    var squaneTable = "";

    for (var i = 0; i < cellCount; i++) {
        var thisColor = Math.floor(Math.random() * (levelData[thisLevel].colors));
        ans[i] = thisColor;
        squaneTable = squaneTable + "<div onclick='choiseDone(" + i + ");' class='block size" + levelData[thisLevel].rows + " color" + thisColor + "' id='block" + i + "'></div>";
        //alert(squaneTable);
    }
    document.getElementById("gameTable").innerHTML = squaneTable;
    var thisSpeed = speedData[levelData[thisLevel].speed];
    setTimeout(hideSquares, thisSpeed, thisLevel);
}

function hideSquares(thisLevel) {
    var cellCount = levelData[thisLevel].rows * levelData[thisLevel].rows;
    for (var i = 0; i < cellCount; i++) {
        var el = document.getElementById("block" + i);
        el.className = el.className + " no-color";
    }
    
    gray=true;
    startInvestigation();
}

var gThisColor = 0;

function startInvestigation() {
    document.getElementById("currentPlace").innerHTML = "<div class='choise color" + gThisColor + "'></div>  <div class='next-color'> Nākamā krāsa &#9658 </div>";
}

function choiseDone(i) {
    var choise = null;
    if ($("#block" + i).hasClass("color0")) choise = 0;
    else if ($("#block" + i).hasClass("color1")) choise = 1;
    else if ($("#block" + i).hasClass("color2")) choise = 2;
    else if ($("#block" + i).hasClass("color3")) choise = 3;
    else if ($("#block" + i).hasClass("color4")) choise = 4;

    if (clicks[i] != 1 && gray) {
        clicks[i] = 1;
        if (choise == gThisColor) {
            // Izvēlēts pareizais kvadrārs
            score += 1;
        } else {
            // Izvēlēts nepareizais kvadrārs
            score -= 2;
        }
    }
    document.getElementById("score").innerHTML = "Punkti: " + score;
    $("#block" + i).removeClass("no-color");

}

window.onload = function() {
    mainLevelFunction(level);
}