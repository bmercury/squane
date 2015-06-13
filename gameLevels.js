var level = 0;
var score = 0;
var gray = false;
var bg = 0;

function getBg(){
    if(bg==0)return "white";
    else return "black";
}

function setBg(n){
    if(n==1){
        bg=1;
        document.getElementById("bg2").innerHTML='<button onclick="setBg(1)" id="bgBlack" style="border-color:#D12121;">Tumšs</button>';
        document.getElementById("bg1").innerHTML='<button onclick="setBg(0)" id="bgWhite">Gaišs</button>';
        $("body").css("background-color","#242424");
        $("body").css("color","white");
    }else{
        bg=0;
        document.getElementById("bg2").innerHTML='<button onclick="setBg(1)" id="bgBlack">Tumšs</button>';
        document.getElementById("bg1").innerHTML='<button onclick="setBg(0)" id="bgWhite" style="border-color:#D12121;">Gaišs</button>';
        $("body").css("background-color","#E8E8E8");
        $("body").css("color","#242424");
    }
}

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
        squaneTable = squaneTable + "<div onclick='choiseDone(" + i + "," + thisLevel + ");' class='block size" + levelData[thisLevel].rows + " color" + thisColor + "' id='block" + i + "'></div>";
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
    document.getElementById("currentPlace").innerHTML = "<div onclick='nextColor();' class='choise color" + gThisColor + "'></div>";
}

function choiseDone(i,thisLevel) {
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
    document.getElementById("score").innerHTML = "Punkti: " + Math.max(score,0);
    $("#block" + i).removeClass("no-color");

    if(score<0){
        $("#currentPlace").hide();


        document.getElementById("gameTable").innerHTML = "<h3>Spēles beigas!<h3> <p>Līmenis: " + thisLevel +"</p>";
        document.getElementById("gameTable").css("background-color","#80CEFF");
    }
}

function nextColor(){
    gThisColor++;
    startInvestigation();
}

window.onload = function() {
    mainLevelFunction(level);
}