var level = 0;
var score = 0;
var gThisColor = 0;
var gray = false;
var thisLevel = 0;

var levelData = [{
        rows: 2,
        colors: 2,
        speed: 0
    }, // kolonas,krasas,atrums
    {
        rows: 2,
        colors: 2,
        speed: 1
    }, {
        rows: 2,
        colors: 2,
        speed: 3
    }, {
        rows: 2,
        colors: 2,
        speed: 4
    }
];

var speedData = [
    2500,
    2000,
    1500,
    1000,
    500
];

var clicks = [];
var squanesLeft = 0;

function mainLevelFunction() {
    document.getElementById("lvl").innerHTML = "Līmenis: " + (thisLevel+1);
    resetSquares(levelData[level].rows * levelData[level].rows);
    document.getElementById("currentPlace").innerHTML = "";
    gThisColor = 0;

    createSquares();
}

function resetSquares(n) {
    for (var i = 0; i < n; i++) {
        clicks[i] = 0;
    }
}

var ans = [];

function createSquares() {
    var cellCount = levelData[thisLevel].rows * levelData[thisLevel].rows;

    squanesLeft = cellCount;
    var squaneTable = "";

    for (var i = 0; i < cellCount; i++) {
        var thisColor = Math.floor(Math.random() * (levelData[thisLevel].colors));
        ans[i] = thisColor;
        squaneTable = squaneTable + "<div onclick='choiseDone(" + i + "," + thisLevel + ");' class='block size" + levelData[thisLevel].rows + " color" + thisColor + "' id='block" + i + "'></div>";
        //alert(squaneTable);
    }
    document.getElementById("gameTable").innerHTML = squaneTable;
    var thisSpeed = speedData[levelData[thisLevel].speed];
    setTimeout(hideSquares, thisSpeed, thisLevel);
}

function hideSquares() {
    var cellCount = levelData[thisLevel].rows * levelData[thisLevel].rows;
    for (var i = 0; i < cellCount; i++) {
        var el = document.getElementById("block" + i);
        el.className = el.className + " no-color";
    }
    
    gray=true;
    startInvestigation();
}

function startInvestigation() {
    document.getElementById("currentPlace").innerHTML = "<div onclick='nextColor();' class='choise color" + gThisColor + "'></div>";
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
        squanesLeft--;
        if (choise == gThisColor) {
            // Izvēlēts pareizais kvadrārs
            score += 1;
        } else {
            // Izvēlēts nepareizais kvadrārs
            score -= 2;
        }
    }
    document.getElementById("score").innerHTML = "Punkti: " + Math.max(score,0);
    $("#block" + i).removeClass("no-color");

    if(score<0){
        gameOver();
    }

    if(squanesLeft<1){
        thisLevel++;
        mainLevelFunction();
    }
}

function nextColor(){
    gThisColor++;
    if(gThisColor==levelData[thisLevel].colors){
        score = score + squanesLeft*(-2);
        document.getElementById("score").innerHTML = "Punkti: " + Math.max(score,0);
        if(score<0){
            gameOver();
        } else {
            thisLevel++;
            mainLevelFunction();
        }
    }
    startInvestigation();
}

function gameOver(){
    $("#currentPlace").hide();

    document.getElementById("gameTable").innerHTML = "<h3>Spēles beigas!<h3> <p>Līmenis: " + (thisLevel+1) +"</p>";
    document.getElementById("gameTable").css("background-color","#80CEFF");
}

window.onload = function() {
    mainLevelFunction();
}