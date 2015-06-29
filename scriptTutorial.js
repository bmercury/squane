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
        $(".alerts").html("Tagad apakšā ir mazāks klucītis, kurš norāda pašreizējo krāsu. Ar šo krāsu ir jāuzspiež uz visiem tās krāsas klucīšiem.<button onclick='hidesecond();'>Labi</button>");
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
    $(".alerts").html("Tu esi izgājis pamācību. vairāk informācijas vari izlasīt pamācības sadaļā.<button onclick='home();'>Pabeigt</button>");
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
            $(".alerts").html("Par pareizu atbildi saņem punktus par nepareizu - punkti nāk nost. Uz apakšējo klucīti var spiest, lai mainītu krāsu.<button onclick='hidethird();'>Labi</button>");
            $(".alerts").fadeIn(500);
            $(".black").fadeIn(500);
        },1000);
    }
}