extends Node2D

var ldata
var balls_references = [0,0,0,0,0,0]
var arrow
var progress_reference
var score_reference

var progress

var leveling = [150,350,550,800,1000,1100,1200] #Score required to level up
#var leveling = [18,30,45,60,75,100,140] #Score required to level up
var level_times = [3.5,3.0,2.5,2.0,1.5]

var level=0
var arrow_anims
var ball_anims

func _ready():
	getReferences()
	ldata = get_node("/root/data").load_data
	
func getReferences():
	arrow = get_node("arrow")
	arrow_anims = get_node("arrow/animations")
	ball_anims = get_node("ball_anims")
	progress_reference = get_node("progress")
	score_reference = get_node("scorebox/score")

func update_score(score):
	
	print(level)
	
	var previous_progress=-1
	
	if level>0 && level<7:
		var a = score-leveling[level-1]
		var b = leveling[level]-leveling[level-1]
		
		previous_progress = (100*score)/leveling[level-1]
		progress = (100*a)/b
	elif level==0:
		progress = (100*score)/leveling[level]
		
	if previous_progress<100 && previous_progress>=0:
		progress_reference.set_text(str(previous_progress)+"%")
		level_down()
	elif (previous_progress>=100 || previous_progress==-1 ) && progress<=100:
		progress_reference.set_text(str(progress)+"%")
	elif (previous_progress>=100 || previous_progress==-1 ) && progress>100:
		progress_reference.set_text("0%")
		level_up()
	
	if level==5 && progress>100 && previous_progress>100:
		progress_reference.set_text("100%")

	score_reference.set_text(str(score))

func level_up():
	if level<leveling.size():
		if level<5:
			level+=1
			arrow_anims.play("move_to_"+str(level))
			ball_anims.play("ball"+str(level)+"_grow")

func level_down():
	if level>0:
		arrow_anims.play_backwards("move_to_"+str(level),-1)
		ball_anims.play_backwards("ball"+str(level)+"_grow",-1)
		level-=1

func correct_level():
	if level==0:
		get_node("ball1").set_scale(Vector2(0.65,0.65))
	if level==1:
		get_node("ball2").set_scale(Vector2(0.65,0.65))
		get_node("ball1").set_scale(Vector2(0.5,0.5))
		arrow_anims.play("move_to_1")
	if level==2:
		get_node("ball2").set_scale(Vector2(0.65,0.65))
		get_node("ball1").set_scale(Vector2(0.5,0.5))
		arrow_anims.play("move_to_2")
	if level==3:
		get_node("ball3").set_scale(Vector2(0.65,0.65))
		get_node("ball1").set_scale(Vector2(0.5,0.5))
		arrow_anims.play("move_to_3")
	if level==4:
		get_node("ball4").set_scale(Vector2(0.65,0.65))
		get_node("ball1").set_scale(Vector2(0.5,0.5))
		arrow_anims.play("move_to_4")
	if level==5:
		get_node("ball5").set_scale(Vector2(0.65,0.65))
		get_node("ball1").set_scale(Vector2(0.5,0.5))
		arrow_anims.play("move_to_5")

func get_level_difficulty():
	var tmp_colors = level+2
	var tmp_time = level
	if tmp_colors>5:
		tmp_colors=5
	if tmp_time>4:
		tmp_time=4
	
	return {"colors":tmp_colors,"preview_time":level_times[tmp_time]}