var level = 0;
var score = 0;

var levelData = [
	{rows:2,colors:2,speed:0}, // kolonas,krasas,atrums
	{rows:2,colors:3,speed:0},
	{rows:2,colors:4,speed:0}
];

var speedData = [
	3000,
	2000,
	1000
];


function mainLevelFunction(thisLevel){
	createSquares(thisLevel);
}

function createSquares(thisLevel){
	var cellCount = levelData[thisLevel].rows*levelData[thisLevel].rows;

	var squaneTable = "";

	var ans = [];

	for(var i = 0; i<cellCount; i++){
		var thisColor = Math.floor(Math.random() * (levelData[thisLevel].colors));
		ans[i] = thisColor;
		squaneTable = squaneTable + "<div class='block size" + levelData[thisLevel].rows + " color" + thisColor + "' id='block" + i + "'></div>";
		//alert(squaneTable);
	}
	document.getElementById("gameTable").innerHTML = squaneTable;
	var thisSpeed = speedData[ levelData[thisLevel].speed ];
	setTimeout(hideSquares, thisSpeed, thisLevel);
}

function hideSquares(thisLevel){
	var cellCount=levelData[thisLevel].rows*levelData[thisLevel].rows;
	for(var i=0;i<cellCount;i++){
		var el = document.getElementById("block"+i);
		el.className = el.className + " no-color";
	}
}
window.onload = function() {
	mainLevelFunction(level);
}