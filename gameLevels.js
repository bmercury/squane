var level = 0;
var score = 0;

var levelData = [
	{rows:2,colors:5,speed:0}, // kolonas,krasas,atrums
	{rows:2,colors:3,speed:0},
	{rows:2,colors:4,speed:0}
];


function mainLevelFunction(thisLevel){
	createSquares(thisLevel);
}

function createSquares(thisLevel){
	var cellCount = levelData[thisLevel].rows*levelData[thisLevel].rows;

	var squaneTable = "";

	for(var i = 0; i<cellCount; i++){
		var thisColor = Math.floor(Math.random() * (levelData[thisLevel].colors));
		squaneTable = squaneTable + "<div class='block size" + levelData[thisLevel].rows + " color" + thisColor + "' id='block" + i + "'></div>";
		//alert(squaneTable);
	}
	document.getElementById("gameTable").innerHTML = squaneTable;
}

function hideSquares(thisLevel){
	cellCount=levelData[thisLevel].rows*[thisLevel].rows;
	for(var i=0;i<cellCount;i++){
		var element = document.getElementById("block"+i);
		document.getElementById("block"+i).src;
	}
}
window.onload = function() {
	mainLevelFunction(level);
}