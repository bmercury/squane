var achievements_count = 4;

function loadAchievements(){
    if(store.get("achievements_loaded")==undefined){
        store.set("achievements_loaded",true);

        store.set('ach_1', { a_id: '0', condition: 'Play game 10 times', finished: false, reward: 5, progress: -1 });
        store.set('ach_2', { a_id: '1', condition: 'Reach level 15', finished: false, reward: 12, progress: -1 });
        store.set('ach_3', { a_id: '2', condition: 'Reach level 25', finished: false, reward: 35, progress: -1 });
        store.set('ach_4', { a_id: '3', condition: 'Buy 2 designs', finished: false, reward: 100, progress: 0, a_target: 2 });
    }

    for(var i=1;i<=achievements_count;++i){

        var achievement = store.get('ach_'+i);
        var aTxt = achievement.condition;
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
                $( ".achievements_box" ).append( "<div id="+'ach'+aId+" onclick='togTxt("+aId+");' class='achievement ach_def'>"+aTxt+"  "+aPro+"/"+aTar+"</div>" );
            } 
        }
    }
}

function togTxt(i){
    var achievement = store.get('ach_'+i);
    // alert(achievement.a_id);
    var aTxt = achievement.condition;
    var aFinished = achievement.finished;
    var aReward = achievement.reward;
    var aPro = achievement.progress;
    var aTar = achievement.a_target;

    $("#ach"+i).html("Reward: "+aReward+" sqoin/s");


    if(aFinished){
        setTimeout(function(){ $("#ach"+i).html(aTxt); }, 2500);
    }else{
        if(aPro==-1){
            setTimeout(function(){ $("#ach"+i).html(aTxt); }, 2500);
        }else{
            setTimeout(function(){ $("#ach"+i).html(aTxt+"  "+aPro+"/"+aTar); }, 2500);
        }
    }
    
}

window.onload = function() {
    loadAchievements();
}
