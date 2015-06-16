function splash(n){
    setTimeout(function(){
        $(".splashScreen").fadeOut(300, function() {
            location.replace("menu.html");
        });
    }, n);
}

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
    $(document).ready(function(){
        $("body").css('background-color', bg);
        $("body").css('color', color);
    });
}
