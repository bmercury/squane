var score = 0;
var gThisColor = 1;
var gray = false;
var maxColors = 5;
var maxRows = 4;
var maxScore=0;


var thisLevel = 0;

function splash(n){
    setTimeout(function(){
        $(".splashScreen").fadeOut(300, function() {
            location.replace("menu.html");
        });
    }, n);
}

var level = {
    rows: 2,
    colors: 2,
    speed: 0
};
var actualLevel = {
    rows: 2,
    colors: 2,
    speed: 0
};

var speedData = [
    2500,
    2000,
    1500,
    1000,
    750
];

var clicks = [];
var squanesLeft = 0;

var usedColors = [];
var colorsLeft = 0;

function mainLevelFunction() {
    
    var waitTime = 1500;
    if(thisLevel==0) waitTime = 0;

    setTimeout(function(){
        generateLevelData();
        var displayLevel = (thisLevel+1);
        document.getElementById("lvl").innerHTML = "Līmenis: " + displayLevel;
        resetSquares(level.rows * level.rows);
        document.getElementById("currentPlace").innerHTML = "";
        newColorPattern();

        createSquares();
    },waitTime);
}

function resetSquares(n) {
    for (var i = 0; i < n; i++) {
        clicks[i] = 0;
    }
}

var ans = [];

function createSquares() {
    var cellCount = level.rows * level.rows;

    squanesLeft = cellCount;
    var squaneTable = "";

    for (var i = 0; i < cellCount; i++) {
        var thisColor = Math.floor(Math.random() * (level.colors));
        ans[i] = thisColor;
        squaneTable = squaneTable + "<div onclick='choiseDone(" + i + "," + thisLevel + ");' class='block size" + level.rows + " color" + thisColor + "' id='block" + i + "'></div>";
        //alert(squaneTable);
    }
    document.getElementById("gameTable").innerHTML = squaneTable;
    var thisSpeed = speedData[level.speed];
    setTimeout(hideSquares, thisSpeed);
}

function hideSquares() {
    var cellCount = level.rows * level.rows;
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
            if(score > maxScore){
                maxScore=score;
            }
        } else {
            // Izvēlēts nepareizais kvadrārs
            score += -2 * ( Math.floor(score / 10) +1 );
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
}
function newColorPattern(){
    colorsLeft = level.colors;
    for(var i = 0; i<maxColors; i++){
        usedColors[i] = 0;
    }
    chooseColor();
}

function chooseColor(){
    //alert("izvelas krasu. palikusas " + colorsLeft);
    if(colorsLeft>0){
        gThisColor = Math.floor(Math.random() * level.colors);
        while(usedColors[gThisColor]!=0){
            gThisColor = Math.floor(Math.random() * level.colors);
        }
        usedColors[gThisColor] = 1;
        colorsLeft--;
    }
    //alert(gThisColor);
}

function nextColor(){
    if(squanesLeft>0){
        //alert("some squanes left");

        chooseColor();
        startInvestigation();
        
        //alert(colorsLeft);
    }
}

function gameOver(){
    var lastBest = localStorage.getItem("mlvl");
    localStorage.setItem("mlvl", Math.max(thisLevel+1,lastBest) );
    localStorage.setItem("mscore", maxScore);
    
    
    
    //localStorage.setItem("pos", pos);
    
    $("#currentPlace").hide();

    var gameOverText ="<h1 style='text-align:center;'>Spēles beigas!<h1><div style='width:94%;margin-left:3%;margin-right:3%;background-color:#333333;padding-top:4%;border-radius:4px;color:white;'><p style='margin:0px;text-align:center'>Sasniegtais līmenis</p>";


    if( (thisLevel+1)>lastBest){
        gameOverText = gameOverText + "<h3 style='text-align:center;margin-top:15px; color:#FCCA00;'>&#9733; "+(thisLevel+1) + " &#9733;</h3>";
        gameOverText = gameOverText + "<h4 style='text-align:center; margin-top:0px; color:#FCCA00;'>Jauns rekords!</h3>";
    } else {
        gameOverText = gameOverText + "<h3 style='text-align:center; margin-top:5px;'>"+(thisLevel+1) + "</h3>";
    }

    document.getElementById("gameTable").innerHTML = gameOverText + "<a href='game.html' class='again'>Spēlēt vēlreiz</a></div>";
}

function generateLevelData(){ // level .rows .colors .speed
    var maxSpeed = 4;
    if(actualLevel.colors == 2) {
        maxSpeed = 5;
    }
    ++actualLevel.speed;

    if(actualLevel.speed==maxSpeed){
        actualLevel.speed = 0;
        actualLevel.colors++;
    }
    if(actualLevel.colors==maxColors){
        actualLevel.colors = 2;
        actualLevel.rows++;
    }
    if(actualLevel.rows==maxRows){
        actualLevel.colors = maxColors-1;
        actualLevel.rows--;
    }

    level.rows = actualLevel.rows;
    level.colors = actualLevel.colors;
    level.speed = actualLevel.speed;

    if(thisLevel>=8){
        var thisCase = Math.floor(Math.random() * 7);

        if(thisCase==1){
            level.rows = 4;
            level.colors = 2;
            level.speed = Math.floor(Math.random() * 2);
        }
    }

    gray = false;
}

window.onload = function() {
    mainLevelFunction();
}