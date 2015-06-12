var level = 1;
var score = 0;

var colorCount = [
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

}

function createSquares(thisLevel){
	
}

function hideSquares(thisLevel){
	cellCount=levelData[thisLevel][rows]*[thisLevel][rows];
	for(var i=0;i<cellCount;i++){
		var element = document.getElementById("block"+i);
		document.getElementById("#game").innerHTML();
	}
}