var achievements_count = 4;

var texts = [
    "Play game 10 times",
    "Reach level 15",
    "Reach level 25",
    "Buy 2 designs"
];

var rewards = [
    5,
    12,
    35,
    100
];

function getLiveInfoAboutAchievmentProgress(){
    if(store.get("achievements_loaded")==undefined){
        store.set("achievements_loaded",true);

        store.set('ach_1', { a_id: '0', finished: false, progress: -1 });
        store.set('ach_2', { a_id: '1', finished: false, progress: -1 });
        store.set('ach_3', { a_id: '2', finished: false, progress: -1 });
        store.set('ach_4', { a_id: '3', finished: false, progress: 0, a_target: 2 });
    }


    var total_games = localStorage.getItem("totalgames");
    var maxLvl = localStorage.getItem("mlvl");
    var boughtDesigns = localStorage.getItem("boughtDesigns");
    var ach1 = store.get('ach_1');
    var ach2 = store.get('ach_2');
    var ach3 = store.get('ach_3');

    if(total_games >= 10 && ach1.finished==false){
        store.set('ach_1', { a_id: '0', finished: true, progress: -1 });
        
        var lm = localStorage.getItem("money");
        lm = parseInt(lm);
        lm += 5;
        localStorage.setItem("money",lm);
    }

    if(maxLvl >= 25 && ach3.finished==false){
         store.set('ach_3', { a_id: '2', finished: true, progress: -1 });

        var lm = localStorage.getItem("money");
        lm = parseInt(lm);
        lm += 35;
        localStorage.setItem("money",lm);

    }
    if(maxLvl >= 15 && ach2.finished==false){
        store.set('ach_2', { a_id: '1', finished: true, progress: -1 });

        var lm = localStorage.getItem("money");
        lm = parseInt(lm);
        lm += 12;
        localStorage.setItem("money",lm);
    }
    if(boughtDesigns>=3){
        store.set('ach_4', { a_id: '1', finished: true, progress: -1 });

        var lm = localStorage.getItem("money");
        lm = parseInt(lm);
        lm += 12;
        localStorage.setItem("money",lm);
    }

}


function loadAchievements(){

    getLiveInfoAboutAchievmentProgress();

    for(var i=1;i<=achievements_count;++i){

        var achievement = store.get('ach_'+i);
        var aTxt = texts[i-1];
        var aFinished = achievement.finished;
        var aId = i;
        var aPro = achievement.progress;
        var aTar = achievement.a_target;

        if(aFinished){
            $( ".achievements_box" ).append( "<div id="+'ach'+aId+" onclick='togTxt("+aId+");' class='achievement finished'>"+aTxt+"</div>" );
        }else{
            if(aPro == -1){
                $( ".achievements_box" ).append( "<div id="+'ach'+aId+" onclick='togTxt("+aId+");' class='achievement ach_def'>"+aTxt+"</div>" );
            }else{
                $( ".achievements_box" ).append( "<div id="+'ach'+aId+" onclick='togTxt("+aId+");' class='achievement ach_def'>"+aTxt+"  "+Math.min(aPro,aTar)+"/"+aTar+"</div>" );
            } 
        }
    }
}

function togTxt(i){
    var achievement = store.get('ach_'+i);
    // alert(achievement.a_id);
    var aTxt = texts[i-1];
    var aFinished = achievement.finished;
    var aReward = rewards[i-1];
    var aPro = achievement.progress;
    var aTar = achievement.a_target;

    $("#ach"+i).html("Reward: "+aReward+" <img style='display:inline; vertical-align:bottom;' width='18px' src='images/sqoin.png'>");


    if(aFinished){
        setTimeout(function(){ $("#ach"+i).html(aTxt); }, 2500);
    }else{
        if(aPro==-1){
            setTimeout(function(){ $("#ach"+i).html(aTxt); }, 2500);
        }else{
            setTimeout(function(){ $("#ach"+i).html(aTxt+"  "+ Math.min(aPro,aTar) +"/"+aTar); }, 2500);
        }
    }
    
}

window.onload = function() {
    //getLiveInfoAboutAchievmentProgress();
    loadAchievements();
}
