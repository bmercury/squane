extends Node2D

var color #Reference of the color choice block
var board #Reference of the game-board

var preview_time = 3.5 #Time you have before the blocks turn gray

var started=false #Has the game has started?

var squares_left = 16 #Untapped squares

var score = 0 #Score per session
var score_now = 0 #Score per level

var lastMatch = 0 #Score in the last match

var sqoins=0 #Sqoins
var shape=0

var ldata #Game data
var llevel #Last level data

var sounds

var timer_preview #Reference of the timer object
var timer_wait #Reference of another timer

var color_count=2
var minimap

func _ready():
	
	_setButtons() #Link all buttons
	
	ldata = get_node("/root/data").load_data
	llevel = get_node("/root/data").llevel4
	get_node("sqoins").set_text(str(ldata.sqoins))
	if llevel.exists==1:
		get_node("resume").show() #Ask if must continue
		get_node("/root/data").hideBanner()
	else:
		_getReferences()
		board._setColors(2) #Assign a random color
		color._setChoices(color_count) #Create choice block order
		_start_match() #Start the level
		_checkBanner() #Hide or show the banner



func _setButtons():
	get_node("bomb").connect("pressed", self, "_on_bomb_pressed")
	get_node("skip").connect("pressed", self, "_on_skip_pressed")
	
	get_node("resume/no").connect("pressed", self, "_on_no_pressed")
	get_node("resume/yes").connect("pressed", self, "_on_yes_pressed")



func _getReferences():
	sounds = get_node("/root/data/sounds")
	
	timer_preview = get_node("timer_preview")
	timer_preview.connect("timeout",self,"_preview_ended")
	timer_wait = get_node("timer_wait")
	timer_wait.connect("timeout",self,"_next_match")
	
	color = get_node("color_block")
	board = get_node("board")
	minimap = get_node("minimap")


func _start_match():
	_save_level() # Save the current level
	timer_preview.set_wait_time(preview_time)
	timer_preview.start()
	set_process_input(true)

# Squares become gray now
func _preview_ended():
	timer_preview.stop()
	board._setGray()
	color._show_first_color()
	started=true


func _checkBanner():
	if ldata.ads==0:
		get_node("/root/data").hideBanner()
	else:
		get_node("/root/data").showBanner()

func _save_level():
	get_node("/root/data").llevel4.score=score
	get_node("/root/data").llevel4.lvl=minimap.level
	get_node("/root/data").llevel4.exists=1
	get_node("/root/data").llevel4.colors=board._getColors()
	get_node("/root/data").llevel4.colcount=color_count
	
	get_node("/root/data").save_level4(false)
	llevel = get_node("/root/data").llevel4
	
func gameOver():
	started=false
	get_node("panel").show()
	sounds.play("wrong");
	get_node("panel/aplay").play("show")
	get_node("/root/data").hideBanner()

func game_complete():
	get_node("victory").show()

func _input(e):
	if e.type==InputEvent.SCREEN_DRAG || e.type==InputEvent.MOUSE_BUTTON:
		var epos = e.pos
		for square in board.references:
			var gpos=square.get_global_pos()
			var square_rect = Rect2(gpos.x, gpos.y, 128*square.get_scale().x, 128*square.get_scale().y)
			if square_rect.has_point(epos) && started && !square.tapped:
				if !square.tapped:
					square.tapped=true
					sounds.play("block")
					_checkColor(square)


func _checkColor(square):

	if square.color == color.choices[color.color]:
		square.reveal() #Show the real color
		square.accept() #Show border
		squares_left-=1
		score_now+=1
		score+=1
		minimap.update_score(score)

	else:
		square.reveal()
		square.deny()
		squares_left-=1
		score_now-=1
		score-=2*color_count
		if score<=0:
			gameOver() #You lose, show the retry panel
		else:
			minimap.update_score(score)
		sounds.play("block")


	if squares_left == 0 && started:
		started=false
		if score_now==16:
			sounds.play("combo")
			get_node("checkmark").show()
			get_node("checkmark/aplayer").play("pop")
			score+=10+color_count
			minimap.update_score(score)
			sqoins+=2*color_count
		
		if score_now>0:
			sqoins+=score_now
		
		if ldata.record4<score:
			get_node("/root/data").load_data.record4=score
			
		get_node("/root/data").load_data.sqoins=sqoins
		get_node("/root/data").save_play_data(false)
		get_node("/root/data").reload()
		ldata=get_node("/root/data").load_data
		get_node("sqoins").set_text(str(ldata.sqoins))
		timer_wait.start()
		_checkBanner()


func _next_match():

	started=false
	color.color=0
	squares_left=16
	score_now=0

		
	for i in range(0,6):
		color.used_colors[i]=false
		
	color.set_normal_texture(color.col_refs[0])
	
	if score>=minimap.leveling[2]:
		_changeShape(true) #True - random
	elif shape!=0:
		_changeShape(false)
		
	var difficulty = minimap.get_level_difficulty()
	color_count=difficulty.colors
	preview_time=difficulty.preview_time

	board._setGray()
	board._setColors(color_count)
	color._setChoices(color_count)
	_start_match()
	_checkBanner() #Hide or show the banner


# ====================================================================================
func _on_no_pressed():
	get_node("resume").hide()
	_getReferences()
	board._setColors(2) #Assign a random color
	color._setChoices(color_count) #Create choice block order
	_start_match() #Start the level
	_checkBanner() #Hide or show the banner
	
func _on_yes_pressed():
	get_node("resume").hide()
	
	score			=llevel.score
	var temp_colors =llevel.colors
	color_count		=llevel.colcount

	_getReferences()
	
	var difficulty = minimap.get_level_difficulty()
	color_count=difficulty.colors
	preview_time=difficulty.preview_time
	
	minimap.level	=llevel.lvl
	minimap.update_score(score)
	minimap.correct_level()
	
	board._unpackColors(temp_colors)
	color._setChoices(color_count)
	#_updateScore() #Update text and banner color
	_start_match()
	_checkBanner()


# =====================================================================================

func _changeShape(isrand):
	if isrand:
		shape = 0+randi()%7
	else:
		shape=0
	get_node("board_pos/board").free()
	var nshape = load("res://scenes/shapes/shape"+str(shape)+".tscn").instance()
	nshape.set_pos(Vector2(nshape.x,nshape.y))
	get_node("board_pos").add_child(nshape)
	board=nshape
	
# ======================================================================================

func _on_bomb_pressed():
	var div=1
	if ldata.ads==1:
		div=2
	else:
		div=1
	
	if ldata.sqoins >= 100/div && started && squares_left>2:
		var c = 200;
		var tmp = getSq()
	else:
		get_node("/root/data/sounds").play("wrong");


func getSq():
	var r = 0+randi()%16
	var r2 = 0+randi()%16
	
	if(board.references[r].tapped==false && board.references[r2].tapped==false && r!=r2):
		_explode(r,r2)
	else:
		getSq()


func _explode(n,n2):
	
	board.references[n].reveal()
	board.references[n2].reveal()
	
	board.references[n].tapped = true
	board.references[n2].tapped = true

	squares_left-=2
	
	if ldata.ads==1:
		ldata.sqoins-=50
	else:
		ldata.sqoins-=100
	
	get_node("sqoins").set_text(str(ldata.sqoins))
	get_node("/root/data/sounds").play("cash")

# ===================================================================================

func _on_skip_pressed():

	if ldata.ads == 1:
		var action=false
		if score<minimap.leveling[0] && ldata.record4>=minimap.leveling[0]:
			action=true
			score=minimap.leveling[0]
			_next_match()
		elif score>=minimap.leveling[0] && score<minimap.leveling[1] && ldata.record4>=minimap.leveling[1]:
			action=true
			score=minimap.leveling[1]
			_next_match()
		elif score>=minimap.leveling[1] && score<minimap.leveling[2] && ldata.record4>=minimap.leveling[2]:
			action=true
			score=minimap.leveling[2]
			_next_match()
		elif score>=minimap.leveling[2] && score<minimap.leveling[3] && ldata.record4>=minimap.leveling[3]:
			action=true
			score=minimap.leveling[3]
			_next_match()
		elif score>=minimap.leveling[3] && score<minimap.leveling[4] && ldata.record4>=minimap.leveling[4]:
			action=true
			score=minimap.leveling[4]
			_next_match()
		else:
			get_node("/root/data/sounds").play("wrong");
			
		if action:
			var difficulty = minimap.get_level_difficulty()
			color_count=difficulty.colors
			preview_time=difficulty.preview_time
			minimap.update_score(score)
			minimap.level_up()
	else:
		if ldata.sqoins >= 250:
			var action=false
			if score<minimap.leveling[0] && ldata.record4>=minimap.leveling[0]:
				action=true
				score=minimap.leveling[0]
				_next_match()
			elif score>= minimap.leveling[0] && score<minimap.leveling[1] && ldata.record4>=minimap.leveling[1]:
				action=true
				score=minimap.leveling[1]
				_next_match()
			elif score>= minimap.leveling[1] && score<minimap.leveling[2] && ldata.record4>=minimap.leveling[2]:
				action=true
				score=minimap.leveling[2]
				_next_match()
			elif score>=minimap.leveling[2] && score<minimap.leveling[3] && ldata.record4>=minimap.leveling[3]:
				action=true
				score=minimap.leveling[3]
				_next_match()
			elif score>=minimap.leveling[3] && score<minimap.leveling[4] && ldata.record4>=minimap.leveling[4]:
				action=true
				score=minimap.leveling[4]
				_next_match()
				
			if action:
				var difficulty = minimap.get_level_difficulty()
				color_count=difficulty.colors
				preview_time=difficulty.preview_time
				ldata.sqoins-=250
				get_node("sqoins").set_text(str(ldata.sqoins))
				get_node("/root/data/sounds").play("cash")
				minimap.update_score(score)
				minimap.level_up()
		else:
			get_node("/root/data/sounds").play("wrong");