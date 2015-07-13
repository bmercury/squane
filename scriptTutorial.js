var hided=false;
var blocks;
var b0=false;
var b1=false;
var b2=false;
var b3=false;

function hideIt(){
    setTimeout(function(){
        for (var i = 0; i < 4; i++) {
            var el = document.getElementById("block" + i);
            el.className = el.className + " no-color";
        }
        for(var i=0;i<4;++i){
               var klucis = document.getElementById("block"+i);
              klucis.addEventListener('touchstart',function(){
           },false);
        }
    },2000);
    setTimeout(function(){
        $("#currentPlace").fadeIn(500);
        $(".alerts").html("Now there is small square in the bottom that tells current color. With this color you have to press on all squares in this color.<button onclick='hidesecond();'>Continue</button>");
        $(".alerts").fadeIn(500);
        $(".black").fadeIn(500);
    },2800);
    hided=true;
}

function hidesecond(){
    $(".alerts").fadeOut(500);
    $(".black").fadeOut(500);
}
function hidethird(){
    $(".alerts").html("Tutorial is over. Get more info in help section.<button onclick='home();'>Continue</button>");
}

function home(){
    location.replace("menu.html");
}

function set(id){
    if(id=="block0"){
        if(!b0){
            if(hided){
                $("#"+id).removeClass("no-color");
                b0=true;
            }
        }
    }
    if(id=="block1"){
        if(!b1){
            if(hided){
                $("#"+id).removeClass("no-color");
                b1=true;
            }
        }
    }
    if(id=="block2"){
        if(!b2){
            if(hided){
                $("#"+id).removeClass("no-color");
                b2=true;
            }
        }
    }
    if(id=="block3"){
        if(!b3){
            if(hided){
                $("#"+id).removeClass("no-color");
                b3=true;
            }
        }
    }
    check();
}

function check(){
    if(b0 && b1 && b2 && b3){
        setTimeout(function(){
            $(".alerts").html("When answer is correct - you get points, otherwise - you lose points. To change color, tap on small square .<button onclick='hidethird();'>Continue</button>");
            $(".alerts").fadeIn(500);
            $(".black").fadeIn(500);
        },1000);
    }
}