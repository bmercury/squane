var score = 0;
var maxScore = 0;
var gThisColor = 0;
var gray = false;
var maxColors = 5;
var maxRows = 4;

var thisLevel = 0;

var bg = 0;

function getBg2(){
    var b;
    if(getBg()=="white")b=0;
    else b=1;
    setBg2(b);
}

function stats(){
    var maxlvl = localStorage.getItem("maxlvl");
    var maxscore = localStorage.getItem("maxscore");
    document.getElementById("maxLvl").innerHTML=maxlvl;
    document.getElementById("maxScore").innerHTML=maxscore;
}

function getBg(){
    bg = localStorage.getItem("bg");
    if(bg==0)return "white";
    else return "black";
}

function setBg2(n){
    if(n==1){
        localStorage.setItem("bg", 1);
        $("body").css("background-color","#242424");
        $("body").css("color","white");
    }else{
        localStorage.setItem("bg", 0);
        $("body").css("background-color","#E8E8E8");
        $("body").css("color","#242424");
    }
}

function setBg(n){
    if(n==1){
        localStorage.setItem("bg", 1);
    
        document.getElementById("bg2").innerHTML='<button onclick="setBg(1)" id="bgBlack" style="border-color:#D12121;">Tumšs</button>';
        document.getElementById("bg1").innerHTML='<button onclick="setBg(0)" id="bgWhite">Gaišs</button>';
        $("body").css("background-color","#242424");
        $("body").css("color","white");
    }else{
        localStorage.setItem("bg", 0);
        document.getElementById("bg2").innerHTML='<button onclick="setBg(1)" id="bgBlack">Tumšs</button>';
        document.getElementById("bg1").innerHTML='<button onclick="setBg(0)" id="bgWhite" style="border-color:#D12121;">Gaišs</button>';
        $("body").css("background-color","#E8E8E8");
        $("body").css("color","#242424");
    }
}


var level = {
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

function mainLevelFunction() {
    generateLevelData();
    document.getElementById("lvl").innerHTML = "Līmenis: " + (thisLevel+1);
    resetSquares(level.rows * level.rows);
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
    setTimeout(hideSquares, thisSpeed, thisLevel);
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
            if(score> maxScore){
                maxScore==score;
            }
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
    if(gThisColor==level.colors){
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
    localStorage.setItem("maxlvl", thisLevel);
    localStorage.setItem("maxscore", maxScore);
    document.getElementById("gameTable").innerHTML = "<h3>Spēles beigas!<h3> <p>Līmenis: " + (thisLevel+1) +"</p>";
    document.getElementById("gameTable").css("background-color","#80CEFF");
}



function generateLevelData(){ // level .rows .colors .speed
    var maxSpeed = 4;
    if(level.colors == 2) {
        maxSpeed = 5;
    }
    ++level.speed;
    if(level.speed==maxSpeed){
        level.speed = 0;
        level.colors++;
    }
    if(level.colors==maxColors){
        level.colors = 2;
        level.rows++;
    }
    if(level.rows==maxRows){
        level.colors = maxColors-1;
        level.rows--;
    }

    gray = false;
}

window.onload = function() {
    mainLevelFunction();
}