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


var thisLevel = 0;
var maxColors = 5;
var maxRows = 4;
var gray = false;
var gThisColor = 0;
var squanesLeft = 0;
var cellCount = 0;

var level = {
    rows: 2,
    colors: 2,
    speed: -1
};
var actualLevel = {
    rows: 2,
    colors: 2,
    speed: -1
};

var speedData = [
    7500,
    7000,
    6500,
    6000,
    5750
];

var squanesLeft = 0;
var clicks = [];

var usedColors = [];
var colorsLeft = 0;


function resetSquares(n) {
    for (var i = 0; i < n; i++) {
        clicks[i] = 0;
    }
}

function chooseScreen(){
	if( localStorage.getItem("timerCounting") !== null && localStorage.getItem("timerCounting")==1 ){
		//alert("taimeris uzstādīts");
		var finTime = "";
		var localAnswerTime = localStorage.getItem("answerTime");
		localAnswerTime = parseInt( localAnswerTime );
		var finDate = new Date( localAnswerTime );
		var currentDate = new Date();
		
		if( currentDate.getTime() > finDate){
			$("#gameTable").css("background-color","#BDBDBD");
			$("#gameTable").css("padding-top","10px");

			document.getElementById("gameTable").innerHTML = "<div style='text-align:center;padding-bottom:25px;'> <h2>Vari atbildēt!</h2> <span id='answerMarathon' class='circleBut startMarathonBut'><i class='fa fa-play'></i></span> </div>";
			
			document.getElementById("answerMarathon").addEventListener('touchstart',function(){
	            startAnswering();
	        },false);

		} else {
			
			$("#gameTable").css("background-color","#BDBDBD");
			$("#gameTable").css("padding-top","10px");

			
			var realMonth = 10;
			realMonth = finDate.getMonth() + 1;
			finTime = finDate.getHours() + ":" + finDate.getMinutes() + ":" + finDate.getSeconds() + " " + finDate.getDate() + "/" + realMonth + "/" + finDate.getFullYear();

			document.getElementById("gameTable").innerHTML = "<div style='text-align:center;padding-bottom:25px;'> <h2>Atbildēt varēsi</h2> <h2>" + finTime + "</h2></div>";
		}

	} else {
		getCurrentLevel();

		var nextLevel = 0;
		nextLevel = parseInt(thisLevel) + 1;
		$("#gameTable").css("background-color","#BDBDBD");
		$("#gameTable").css("padding-top","10px");

		document.getElementById("lvl").innerHTML = "Līmenis: " + nextLevel;

		document.getElementById("gameTable").innerHTML = "<div style='text-align:center;'><h2>Jūs esat izgājis <br>" + thisLevel + " <br>garos līmeņus.</h2><hr style='background-color:#E8E8E8;height:3px;border:none;'><h3 style='text-align:center;'>Vai mēģināsiet iziet " + nextLevel + ". garo līmeni?</h3></div><hr style='background-color:#E8E8E8;height:3px;border:none;margin-bottom:0px;'><span id='startMarathon' class='circleBut startMarathonBut'><i class='fa fa-play'></i></span></div>";
		document.getElementById("startMarathon").addEventListener('touchstart',function(){
            tryToRemember();
        },false);
	}
}

function startAnswering(){
	localStorage.setItem("timerCounting",0);

	getCurrentLevel();

	$("#gameTable").css("background-color","transparent");

	var squaneGrid = localStorage.getItem("lvlTable");

	document.getElementById("gameTable").innerHTML = squaneGrid;

	grey = true;


	squanesLeft = level.rows * level.rows;
	cellCount = squanesLeft;
	
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

    newColorPattern();

	resetSquares(cellCount);
	hideSquares();

}

function tryToRemember(){
	generateLevelData();
	createSquares();
}


function createSquares() {
    var cellCount = level.rows * level.rows;

    $("#gameTable").css("background-color","transparent");

    var squaneTable = "";

    for (var i = 0; i < cellCount; i++) {
        
        

        var thisColor = Math.floor(Math.random() * (level.colors));

		squaneTable = squaneTable + "<div  class='block size" + level.rows + " color" + thisColor + "' id='block" + i + "'></div>";
        
    }

    document.getElementById("gameTable").innerHTML = squaneTable;

    localStorage.setItem("lvlTable",squaneTable);

    var thisSpeed = speedData[level.speed];
    setTimeout(setUpTimer, thisSpeed);
}

function setUpTimer(){
	var currentDate = new Date();
	var time = currentDate.getTime();
	time += 600000;
	//time += 600;

	localStorage.setItem("answerTime",parseInt(time));
	localStorage.setItem("timerCounting",1);

	location.replace("marathon.html");
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

    //alert(clicks[i] + " " + gray);
    if (clicks[i] != 1 && gray) {
    	//alert("kliks registreets");
        clicks[i] = 1;
        squanesLeft--;
        if (choise == gThisColor) {
            // Izvēlēts pareizais kvadrārs
        } else {
            // Izvēlēts nepareizais kvadrārs
            gameOver();
        }
    
        $("#block" + i).removeClass("no-color");

        if(squanesLeft<1){
            //win
            levelDone();
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

function getCurrentLevel(){
	thisLevel = localStorage.getItem("lvl");
	thisLevel = parseInt(thisLevel);
	//alert("got " + thisLevel);

	if( isNaN(localStorage.getItem("lvl")) || localStorage.getItem("lvl") === null ){ // ja nav vēl spēlēts
		thisLevel = 0;
		localStorage.setItem("lvl",thisLevel);
	} else {
		thisLevel = parseInt(thisLevel);
	}
}

function gameOver(){
	gray = false;
	
	setTimeout(function(){
		localStorage.setItem("won",0);
		var gameOverText ="<h1 style='text-align:center;'>Tu atbildēji nepareizi!<h1><div style='width:94%;margin-left:3%;margin-right:3%;background-color:#333333;padding-top:4%;padding-bottom:4%;border-radius:4px;color:white;'><p style='text-align:center'>Mēģināsi vēlreiz?</p>";

    	document.getElementById("gameTable").innerHTML = gameOverText + "<span id='reloadPage' class='startMarathonBut'><i class='fa fa-repeat'></i></span><span style='margin-left:10px;' id='openMenu' class='startMarathonBut'><i class='fa fa-bars'></i></span></div>";
		document.getElementById("currentPlace").innerHTML = "";
		document.getElementById("reloadPage").addEventListener('touchstart',function(){
		    location.replace("marathon.html");
		},false);
		document.getElementById("openMenu").addEventListener('touchstart',function(){
		    location.replace("menu.html");
		},false);
	},2000);
}

function levelDone(){
	thisLevel+=1;
	//alert("set " + thisLevel);
	localStorage.setItem("lvl",thisLevel);
	localStorage.setItem("timerCounting",0);

	localStorage.setItem("won",1);
}

function generateLevelData(){ // level .rows .colors .speed

	getSavedLevel();

	var lastRes = localStorage.getItem("won");
	if(lastRes==1){

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

	    if(level>=8){
	        var thisCase = Math.floor(Math.random() * 7);

	        if(thisCase==1){
	            level.rows = 4;
	            level.colors = 2;
	            level.speed = Math.floor(Math.random() * 2);
	        }
	    }
	}
    saveLevel();
}

function getSavedLevel(){
	var tmpRows = localStorage.getItem("lvlRows");
	var tmpColors = localStorage.getItem("lvlColors");
	var tmpSpeed = localStorage.getItem("lvlSpeed");

	var tmpRowsShow = localStorage.getItem("lvlRowsShow");
	var tmpColorsShow = localStorage.getItem("lvlColorsShow");
	var tmpSpeedShow = localStorage.getItem("lvlSpeedShow");

	if(tmpRows !== null){
		if( !isNaN(tmpRows) ){

			level.rows = tmpRowsShow;
			level.colors = tmpColorsShow;
			level.speed = tmpSpeedShow;

			actualLevel.rows = tmpRows;
			actualLevel.colors = tmpColors;
			actualLevel.speed = tmpSpeed;

		}
	}
}
function saveLevel(){
	localStorage.setItem("lvlRows",actualLevel.rows);
	localStorage.setItem("lvlColors",actualLevel.colors);
	localStorage.setItem("lvlSpeed",actualLevel.speed);

	localStorage.setItem("lvlRowsShow",level.rows);
	localStorage.setItem("lvlColorsShow",level.colors);
	localStorage.setItem("lvlSpeedShow",level.speed);
}
window.onload = function() {
    setBg();
    chooseScreen();
}
