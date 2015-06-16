var thisLevel = -1;
var maxColors = 5;
var maxRows = 4;
var gray = false;
var gThisColor = 0;
var squanesLeft = 0;

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

var usedColors = [];
var colorsLeft = 0;

function chooseScreen(){
	if( localStorage.getItem("timerCounting") !== null && localStorage.getItem("timerCounting")==1 ){
		//alert("taimeris uzstādīts");
		var finTime = "";
		var localAnswerTime = localStorage.getItem("answerTime");
		localAnswerTime = parseInt( localAnswerTime );
		var finDate = new Date( localAnswerTime );
		var currentDate = new Date();
		
		if( currentDate.getTime() > finDate){
			$("#gameTable").css("background-color","white");
			$("#gameTable").css("padding-top","10px");

			document.getElementById("gameTable").innerHTML = "<div style='text-align:center;'> <h2>Varat atbildēt!</h2> <span id='answerMarathon' class='startMarathonBut'>Atbildēt</span> </div>";
			
			answerMarathon.addEventListener('touchstart',function(){
	            startAnswering();
	        },false);

		} else {
			
			$("#gameTable").css("background-color","white");
			$("#gameTable").css("padding-top","10px");

			
			var realMonth = 10;
			realMonth = finDate.getMonth() + 1;
			finTime = finDate.getHours() + ":" + finDate.getMinutes() + ":" + finDate.getSeconds() + " " + finDate.getDate() + "/" + realMonth + "/" + finDate.getFullYear();

			document.getElementById("gameTable").innerHTML = "<div style='text-align:center;'> <h2>Atbildēt varēsiet</h2> <h2>" + finTime + "</h2> </div>";
		}

	} else {
		getCurrentLevel();

		var nextLevel = 0;
		nextLevel = parseInt(thisLevel) + 1;
		$("#gameTable").css("background-color","white");
		$("#gameTable").css("padding-top","10px");

		document.getElementById("gameTable").innerHTML = "<div style='text-align:center;'><h2>Jūs esat izgājis <br>" + thisLevel + " <br>garos līmeņus.</h2><hr style='background-color:#E8E8E8;height:3px;border:none;'><h3 style='text-align:center;'>Vai mēģināsiet iziet " + nextLevel + ". garo līmeni?</h3></div><hr style='background-color:#E8E8E8;height:3px;border:none;margin-bottom:0px;'><span id='startMarathon' class='startMarathonBut'>Sākt spēli</span>";
		startMarathon.addEventListener('touchstart',function(){
            tryToRemember();
        },false);
	}
}

function startAnswering(){
	localStorage.setItem("timerCounting",0)

	$("#gameTable").css("background-color","transparent");

	var squaneGrid = localStorage.getItem("squaneTable");

	document.getElementById("gameTable").innerHTML = squaneGrid;


	squanesLeft = 
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

    localStorage.setItem("lvlTable",squaneTable);

    var thisSpeed = speedData[level.speed];
    setTimeout(setUpTimer, thisSpeed);
}

function setUpTimer(){
	var currentDate = new Date();
	var time = currentDate.getTime();
	//time += 600000;
	time += 60000;

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

function getCurrentLevel(){
	thisLevel = localStorage.getItem("lvl");
	if( isNaN(thisLevel) || thisLevel === null ){ // ja nav vēl spēlēts
		thisLevel = 0;
		localStorage.setItem("lvl",thisLevel);
	}
}

function generateLevelData(){ // level .rows .colors .speed

	getSavedLevel();

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
	localStorage,setItem("lvlRows",actualLevel.rows);
	localStorage,setItem("lvlColors",actualLevel.colors);
	localStorage,setItem("lvlSpeed",actualLevel.speed);

	localStorage,setItem("lvlRowsShow",level.rows);
	localStorage,setItem("lvlColorsShow",level.colors);
	localStorage,setItem("lvlSpeedShow",level.speed);
}

window.onload = function() {
    chooseScreen();
}
