var currentDesign;

var rewards = [
    5,
    12,
    35,
    100
];

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
        localStorage.setItem("bg",0);
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

function setDesign(){
    currentDesign = localStorage.getItem("chosedDesign");
    if(currentDesign===null){
        currentDesign=0;
        localStorage.setItem("chosedDesign",0)
    }
}

function slowDisappear(){
    setTimeout(function(){
        $("#moneyDiv").fadeOut(500);
    },700);
}

var score = 0;
var mistakes = 0;
var gThisColor = 1;
var gray = false;
var maxColors = 5;
var maxRows = 4;
var maxScore=0;

var gameHasBeenStopped = false;
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
    2500,
    2000,
    1500,
    1000,
    750
];

var colorData = [
    "#68A0D9",
    "#D96E68",
    "#68D968",
    "#D9CC68",
    "#D968B7",
];
var colorCount = 5;

var clicks = [];
var squanesLeft = 0;

var usedColors = [];
var colorsLeft = 0;

function mainLevelFunction() {
    var waitTime = 1500;
    if(thisLevel==0) waitTime = 0;

    getMoney();


    setTimeout(function(){

        if(!gameHasBeenStopped){

            if (waitTime>0) {
                for(var i = 0; i<level.rows*level.rows; i++) {
                    $("#block" + i).removeClass("correctChoise");
                    $("#block" + i).removeClass("incorrectChoise");
                }
            };

            generateLevelData();
            var displayLevel = (thisLevel+1);
            document.getElementById("lvl").innerHTML = "Level: " + displayLevel;
            resetSquares(level.rows * level.rows);
            document.getElementById("currentPlace").innerHTML = "";
            newColorPattern();

            createSquares();

        }

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

    document.getElementById("gameTable").innerHTML = "";

    for (var i = 0; i < cellCount; i++) {
        
        

            var thisColor = Math.floor(Math.random() * (level.colors));
            ans[i] = thisColor;

            var colorName = "";
            if(thisColor==0) colorName = "blue";
            if(thisColor==1) colorName = "red";
            if(thisColor==2) colorName = "green";
            if(thisColor==3) colorName = "yellow";
            if(thisColor==4) colorName = "purple";


            squaneTable = "<div   class='block size" + level.rows + " color" + thisColor + "' id='block" + i + "'></div>"; 
            
            var old = document.getElementById("gameTable").innerHTML;
            document.getElementById("gameTable").innerHTML = old + " " + squaneTable;

            var bgImgUrl = "url('images\/pack" + currentDesign + "\/square-" + colorName + ".png')";
            //alert(bgImgUrl);
            document.getElementById("block" + i).style.backgroundImage = bgImgUrl;

        //alert(squaneTable);
        //onmousedown='choiseDone(" + i + ");'
    }


    

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
        el.style.backgroundImage = "url('images\/pack" + currentDesign + "\/square-gray.png')";
        
    }
    
    gray=true;
    startInvestigation();
}

function startInvestigation() {

    //alert("izvelas apaksu");
    
    document.getElementById("currentPlace").innerHTML = "<div id='choiseButton' class='choise'></div>";

    var colorName = "";
    if(gThisColor==0) colorName = "blue";
    if(gThisColor==1) colorName = "red";
    if(gThisColor==2) colorName = "green";
    if(gThisColor==3) colorName = "yellow";
    if(gThisColor==4) colorName = "purple";
    document.getElementById("choiseButton").style.backgroundImage = "url('images\/pack" + currentDesign + "\/square-" + colorName + ".png')";
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

            var el = document.getElementById("block" + i);
            el.className = el.className + " correctChoise";

            score += 1;
            //score =+ 10;
            if(score > maxScore){
                maxScore=score;
            }
        } else {
            // Izvēlēts nepareizais kvadrārs

            var el = document.getElementById("block" + i);
            el.className = el.className + " incorrectChoise";

            mistakes+=1;
            score += -2 * ( Math.floor(score / 10) +1 );
        }


        var colorName = "";
        if(choise==0) colorName = "blue";
        if(choise==1) colorName = "red";
        if(choise==2) colorName = "green";
        if(choise==3) colorName = "yellow";
        if(choise==4) colorName = "purple";

        document.getElementById("block"+i).style.backgroundImage = "url('images\/pack" + currentDesign + "\/square-" + colorName + ".png')";
    
        document.getElementById("score").innerHTML = "" + Math.max(score,0);

        for(var i = 0; i<colorCount; i++){
            document.getElementById("score" + i).style.width = "0%";
            document.getElementById("score" + i).style.width = Math.max(score,0) - 100*i + "%";
            document.getElementById("score" + i).style.backgroundColor = colorData[i];
        }
        

        

        if(score<0){
            gameOver();
        }

        if(squanesLeft<1){
            if(mistakes==0)score+=10;
            document.getElementById("score").innerHTML = "" + Math.max(score,0);

            for(var i = 0; i<colorCount; i++){
                document.getElementById("score" + i).style.width = "0%";
                document.getElementById("score" + i).style.width = Math.max(score,0) - (100*i) + "%";
                document.getElementById("score" + i).style.backgroundColor = colorData[i];
            }

            var currentMoney = localStorage.getItem("money");
            var newMoney = Number(currentMoney) + Number(  (Math.floor(score / 10) +1 )  );
            
            var outputMoney = " +" + (newMoney-currentMoney) + " "; 

            currentMoney = newMoney;

            document.getElementById("addedMoney").innerHTML = "<div id=\"moneyDiv\">        " + outputMoney + " </div>";
            $("#moneyDiv").show();
            slowDisappear();

            localStorage.setItem("money",Number(currentMoney));

            mistakes=0;
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

function achieve(){
    var total_games = localStorage.getItem("totalgames");
    var ach1 = store.get('ach_1');
    var ach2 = store.get('ach_2');
    var ach3 = store.get('ach_3');

    if(total_games >= 10 && ach1.finished==false){
        store.set('ach_1', { a_id: '0', finished: true, progress: -1 });
        
        var lm = localStorage.getItem("money");
        lm = parseInt(lm);
        lm += 5;
        localStorage.setItem("money",lm);
    }

    if(thisLevel+1 >= 25 && ach3.finished==false){
         store.set('ach_3', { a_id: '2', finished: true, progress: -1 });

        var lm = localStorage.getItem("money");
        lm = parseInt(lm);
        lm += 35;
        localStorage.setItem("money",lm);

    }
    if(thisLevel+1 >= 15 && ach2.finished==false){
        store.set('ach_2', { a_id: '1', finished: true, progress: -1 });

        var lm = localStorage.getItem("money");
        lm = parseInt(lm);
        lm += 12;
        localStorage.setItem("money",lm);
    }
}



function endGame() {
    //if(thisLevel+1 > 5 && !gameHasBeenStopped){
    if(!gameHasBeenStopped){
        gameHasBeenStopped = true;
        gameOver();
    }else{
        location.replace("menu.html");
    }
}

function gameOver(){

    achieve();
    
    var lastBest = localStorage.getItem("mlvl");
    
    setScore();

    //localStorage.setItem("pos", pos);
    
    $("#currentPlace").hide();

    var gameOverText ="<h1 style='text-align:center;'>Game Over!<h1><div style='width:94%;margin-left:3%;margin-right:3%;background-color:#333333;padding-top:4%;border-radius:4px;color:white;'><p style='margin:0px;text-align:center'>Level</p>";


    if( (thisLevel+1)>lastBest){
        gameOverText = gameOverText + "<h3 style='text-align:center;margin-top:15px; color:#FCCA00;'>&#9733; "+(thisLevel+1) + " &#9733;</h3>";
        gameOverText = gameOverText + "<h4 style='text-align:center; margin-top:0px; color:#FCCA00;'>New Record!</h3>";
    } else {
        gameOverText = gameOverText + "<h3 style='text-align:center; margin-top:5px;'>"+(thisLevel+1) + "</h3>";
    }

    document.getElementById("gameTable").innerHTML = gameOverText + "<span id='playAgain' class='again'>Play Again</span></div>";

    var playAgainBut = document.getElementById("playAgain");
    playAgainBut.addEventListener('touchstart',function(){
        location.replace("normal.html");
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
        //var thisCase = Math.floor(Math.random() * 2);

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
    setDesign();
    mainLevelFunction();
    //setScoreLineColors();
}
