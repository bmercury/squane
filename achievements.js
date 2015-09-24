var achievements_count = 2;

function loadAchievements(){
    if(store.get("achievements_loaded")==undefined){
        store.set("achievements_loaded",true);

        store.set('ach_1', { a_id: '0', condition: 'Play game 10 times', finished: false, reward: 10 });
        store.set('ach_2', { a_id: '1', condition: 'Reach level 15', finished: false, reward: 16 });
    }

    for(var i=1;i<=achievements_count;++i){

        var achievement = store.get('ach_'+i);
        var aTxt = achievement.condition;
        var aFinished = achievement.finished;
        var aId = i

        if(aFinished){
            $( ".achievements_box" ).append( "<div id="+'ach'+aId+" onclick='togTxt("+aId+");' class='achievement finished'>"+aTxt+" (Finished)</div>" );
        }else{
            $( ".achievements_box" ).append( "<div id="+'ach'+aId+" onclick='togTxt("+aId+");' class='achievement'>"+aTxt+"</div>" );
        }
    }
}

function togTxt(i){
    var achievement = store.get('ach_'+i);
    // alert(achievement.a_id);
    var aTxt = achievement.condition;
    var aFinished = achievement.finished;
    var aReward = achievement.reward;

    $("#ach"+i).html("Reward: "+aReward+" sqoin/s");


    if(aFinished){
        setTimeout(function(){ $("#ach"+i).html(aTxt+" (Finished)"); }, 2500);
    }else{
        setTimeout(function(){ $("#ach"+i).html(aTxt); }, 2500);
    }
    
}

window.onload = function() {
    loadAchievements();
}
