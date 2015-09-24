var achievements_count = 1;

function loadAchievements(){
    if(store.get("achievements_loaded")==undefined){
        store.set("achievements_loaded",true);

        store.set('ach_1', { a_id: '0', condition: 'Play game 10 times', finished: false, reward: 10 });
    }

    for(var i=1;i<=achievements_count;++i){

        var achievement = store.get('ach_'+i);
        var aTxt = achievement.condition;
        var aFinished = achievement.finished;

        if(aFinished){
            $( ".achievements_box" ).append( "<div class='achievement finished'>"+aTxt+" ✔</div>" );
        }else{
            $( ".achievements_box" ).append( "<div class='achievement'>"+aTxt+"</div>" );
        }
    }
}

window.onload = function() {
    loadAchievements();
}
