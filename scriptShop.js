
var totalDesignCount = 2;


function showDesigns(){
    var catalog = "";
    //alert("funk.");
    for(var  i = 0; i<totalDesignCount; i++){
        var anotherDesign = "<div class=\"designPreviewBox\"> <table><tr><td><img class=\"previewSquane\" src=\" images/pack" + i + "/square-blue.png \"></img> </td><td><img class=\"previewSquane\" src=\" images/pack" + i + "/square-red.png \"></img> </td></tr><tr><td><img class=\"previewSquane\" src=\" images/pack" + i + "/square-green.png \"></img> </td><td><img class=\"previewSquane\" src=\" images/pack" + i + "/square-yellow.png \"></img> </td></tr></table></div>";        catalog = catalog + anotherDesign;
    }
    document.getElementById("previewBox").innerHTML = catalog;
}



window.onload = function() {
    //alert("ieladets");
    setBg();
    //alert("bg");
    showDesigns();
}
