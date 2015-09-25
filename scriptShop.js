
var totalDesignCount = 5;


var boughtDesigns = 0;
var chosedDesign = 0;

var cost = [
    0,
    200,
    300,
    500,
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

            var ach4 = store.get('ach_4');
            var aPro = ach4.progress;
            var aTar = ach4.a_target;
            aPro=parseInt(aPro);
            aPro+=1;
            console.log(aPro);
            if(aPro == aTar){
                store.set('ach_4', { a_id: '3', condition: 'Buy 2 designs', finished: true, reward: 100, progress: aPro, a_target: 2 });
                
                var curMoney = localStorage.getItem("money");
                curMoney = parseInt(curMoney);
                var aRew = ach4.reward;
                aRew = parseInt(aRew);
                localStorage.setItem("money", curMoney+aRew );
            }else{
                store.set('ach_4', { a_id: '3', condition: 'Buy 2 designs', finished: false, reward: 100, progress: aPro, a_target: 2 });
            }
        }   

    }
    //location.reload();
    document.getElementById("previewBox").innerHTML = "";
    showDesigns();
}

function showDesigns(){
    var catalog = "";
    //alert("funk.");

    getShopInfo();

    for(var  i = 0; i<totalDesignCount; i++){
        var chosedDes = "";


        //var underText = "<b style=\"color: darkgreen;\">Choose</b>";
        var underText = "<img width=\"30px\" src=\"images/choose.png\">";
        if(i==chosedDesign){
            chosedDes = " chosedDesCSS";
            //underText  = "<b style=\"color: darkgreen;\">Current</b>";
            underText = "<img width=\"30px\" src=\"images/current.png\">";
        } 

        
        var haventBoughtClass = "";
        if(i>=boughtDesigns){
            underText = "<img width=\"15px\" style=\"display:inline;vertical-align: middle;\" src=\"images/sqoin.png\"> " + cost[i]; 
            haventBoughtClass = " hvntBought";
        }
        if(i==boughtDesigns) {
            //underText = "<img width=\"15px\" style=\"display:inline;vertical-align: middle;\" src=\"images/sqoin.png\"> " + cost[i]; 
            haventBoughtClass = " canBuy";
        }

        var table = "<table><tr><td><img class=\"previewSquane\" src=\" images/pack" + i + "/square-blue.png \"></img> </td><td><img class=\"previewSquane\" src=\" images/pack" + i + "/square-red.png \"></img> </td></tr><tr><td><img class=\"previewSquane\" src=\" images/pack" + i + "/square-green.png \"></img> </td><td><img class=\"previewSquane\" src=\" images/pack" + i + "/square-yellow.png \"></img> </td></tr></table>";

        if(i>boughtDesigns){
            table = "<img style='display:table;' width='90px' src='images/lock.png'>"
        }

        var anotherDesign = "<div onclick=\"chooseDes(" + i + ");\" class=\"designPreviewBox" + chosedDes + haventBoughtClass + "\"> " + table + " <span>" + underText + "</span> </div>";        catalog = catalog + anotherDesign;
    }
    document.getElementById("previewBox").innerHTML = catalog;
}



window.onload = function() {
    //alert("ieladets");
    setBg();
    //alert("bg");
    showDesigns();
}
