
var totalDesignCount = 3;
var boughtDesigns = 0;
var chosedDesign = 0;

var cost = [
    0,
    100,
    200,
    400,
    500
];


function getMoney(){
    if(localStorage.getItem("money") === null){
        localStorage.setItem("money",0);
    }
    document.getElementById("moneyContent").innerHTML = localStorage.getItem("money");
}

function getShopInfo(){
    if( localStorage.getItem("chosedDesign")===null ){
        localStorage.setItem("chosedDesign",0);
    }
    if( localStorage.getItem("boughtDesigns")===null ){
        localStorage.setItem("boughtDesigns",1);
    }
    boughtDesigns = localStorage.getItem("boughtDesigns");
    chosedDesign = localStorage.getItem("chosedDesign");

    getMoney();
}

function chooseDes(i){
    if(i<boughtDesigns){
        localStorage.setItem("chosedDesign",i);
    } else if(i==boughtDesigns){

        if(localStorage.getItem("money")>=cost[i] ){
            boughtDesigns++;
            localStorage.setItem("boughtDesigns",boughtDesigns);
            localStorage.setItem( "money" , localStorage.getItem("money") - cost[i] );
        }   

    }
    location.reload();
}

function showDesigns(){
    var catalog = "";
    //alert("funk.");

    getShopInfo();

    for(var  i = 0; i<totalDesignCount; i++){
        var chosedDes = "";
        if(i==chosedDesign){
            chosedDes = " chosedDesCSS";
        } 

        var underText = "<b style=\"color: darkgreen;\">Bought</b>";
        var haventBoughtClass = "";
        if(i>=boughtDesigns){
            underText = "<img width=\"15px\" style=\"display:inline;vertical-align: middle;\" src=\"images/sqoin.png\">" + cost[i]; 
            haventBoughtClass = " hvntBought";
        }
        if(i==boughtDesigns) haventBoughtClass = " canBuy";

        var anotherDesign = "<div onclick=\"chooseDes(" + i + ");\" class=\"designPreviewBox" + chosedDes + haventBoughtClass + "\"> <table><tr><td><img class=\"previewSquane\" src=\" images/pack" + i + "/square-blue.png \"></img> </td><td><img class=\"previewSquane\" src=\" images/pack" + i + "/square-red.png \"></img> </td></tr><tr><td><img class=\"previewSquane\" src=\" images/pack" + i + "/square-green.png \"></img> </td><td><img class=\"previewSquane\" src=\" images/pack" + i + "/square-yellow.png \"></img> </td></tr></table> <span>" + underText + "</span> </div>";        catalog = catalog + anotherDesign;
    }
    document.getElementById("previewBox").innerHTML = catalog;
}



window.onload = function() {
    //alert("ieladets");
    setBg();
    //alert("bg");
    showDesigns();
}
