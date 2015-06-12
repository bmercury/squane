var level = 1;
var score = 0;

var levelData = [
	{rows:2,colors:2,speed:0}, // kolonas,krasas,atrums
	{rows:2,colors:3,speed:0},
	{rows:2,colors:4,speed:0}
];

var colorMap = [
	"square-blue.png",
	"square-red.png",
	"square-green.png",
	"square-yellow.png",
	"square-purple.png"
];

function mainLevelFunction(thisLevel){
	createSquares(thisLevel);
}

function createSquares(thisLevel){
	var cellCount = levelData[thisLevel][rows]*levelData[thisLevel][rows];
	for(var i = 0; i<cellCount; i++){
		var thisColor = Math.floor((Math.random() * level));
		document.getElementById("#gameTable").innerHTML = "<div class='color" + thisColor + "' id='block" + i + "'></div>";
	}
}

function hideSquares(thisLevel){

}