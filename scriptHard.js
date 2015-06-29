function setBg(){
    var bg = "";
    var color = "";
    
    var bgColorDark = "#242424";
    var bgColorLight = "#E8E8E8";
    var colorDark = "#E8E8E8";
    var colorLight = "#242424";
    
    var bgColor = "";
    var color = "";
    
    if(localStorage.getItem("bg") === null){
        localStorage.setItem("bg",1);
    }
    if(localStorage.getItem("bg") == 0){
        bg=bgColorLight;
        color=colorLight;
    }else{
        bg=bgColorDark;
        color=colorDark;
    }
    $("body").css('background-color', bg);
    $("body").css('color', color);

}



var score = 0;
var mistakes = 0;
var gThisColor = 1;
var gray = false;
var maxColors = 5;
var maxRows = 4;
var maxScore=0;


var thisLevel = 0;


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
    2000,
    1500,
    1000,
    500,
    250
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

            squaneTable = squaneTable + "<div  class='block size" + level.rows + " color" + thisColor + "' id='block" + i + "'></div>";
            
        //alert(squaneTable);
        //onmousedown='choiseDone(" + i + ");'
    }

    document.getElementById("gameTable").innerHTML = squaneTable;

    for (var i = 0; i < cellCount; i++) {
        (function () {
            var elementaId = "";
            var izvele = i;
            elementaId = "block" + i;
            var klucis = document.getElementById(elementaId);

            klucis.addEventListener('touchstart',function(){
                choiseDone(izvele);
            },false);
        }())
    }

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
    document.getElementById("currentPlace").innerHTML = "<div id='choiseButton' class='choise color" + gThisColor + "'></div>";
    var bottomIcon = document.getElementById("choiseButton");
    bottomIcon.addEventListener('touchstart',function(){
        nextColor();
    },false);
}

function choiseDone(i) {
    //var thisBlock = this.id;

   // alert(i);
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
            score += 2;
            if(score > maxScore){
                maxScore=score;
            }
        } else {
            // Izvēlēts nepareizais kvadrārs
            mistakes+=1;
            score += -2 * ( Math.floor(score / 10) +1 );
        }
    
        document.getElementById("score").innerHTML = "Punkti: " + Math.max(score,0);
        $("#block" + i).removeClass("no-color");

        if(score<0){
            gameOver();
        }

        if(squanesLeft<1){
            if(mistakes==0)score+=10;
            thisLevel++;
            mistakes=0;
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

function setScore(){
    var lastBest = localStorage.getItem("mlvl");
    var lastBestScore = localStorage.getItem("mscore");
    localStorage.setItem("mlvl", Math.max(thisLevel+1,lastBest) );
    localStorage.setItem("mscore", Math.max(maxScore,lastBestScore));
    
    
    var timesPlayed = 0;
    timesPlayed = localStorage.getItem("totalgames");
    if( isNaN(timesPlayed) ) timesPlayed = 0;
    timesPlayed = parseInt(timesPlayed);
    timesPlayed+=1;
    localStorage.setItem("totalgames", Math.max(timesPlayed,timesPlayed) );
}

function gameOver(){    
    
    var lastBest = localStorage.getItem("mlvl");
    
    setScore();

    //localStorage.setItem("pos", pos);
    
    $("#currentPlace").hide();

    var gameOverText ="<h1 style='text-align:center;'>Spēles beigas!<h1><div style='width:94%;margin-left:3%;margin-right:3%;background-color:#333333;padding-top:4%;border-radius:4px;color:white;'><p style='margin:0px;text-align:center'>Sasniegtais līmenis</p>";


    if( (thisLevel+1)>lastBest){
        gameOverText = gameOverText + "<h3 style='text-align:center;margin-top:15px; color:#FCCA00;'>&#9733; "+(thisLevel+1) + " &#9733;</h3>";
        gameOverText = gameOverText + "<h4 style='text-align:center; margin-top:0px; color:#FCCA00;'>Jauns rekords!</h3>";
    } else {
        gameOverText = gameOverText + "<h3 style='text-align:center; margin-top:5px;'>"+(thisLevel+1) + "</h3>";
    }

    document.getElementById("gameTable").innerHTML = gameOverText + "<span id='playAgain' class='again'>Spēlēt vēlreiz</span></div>";

    var playAgainBut = document.getElementById("playAgain");
    playAgainBut.addEventListener('touchstart',function(){
        location.replace("game.html");
    },false);
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
    if(actualLevel.colors>maxColors){
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
    setBg();
    mainLevelFunction();
}
