extends Node2D


var block_colors=[1,1,1,1,2,2,1,2,2]
var refs=[0,0,0,0,0,0,0,0,0,0]

var ldata
var hint

var t1
var t2
var t3
var t4
var t5

var continue_btn
var finish_btn
var retry_btn

var black

var stage=1
var started=false
var cur_col=0

var squares_left=9
var red=0
var blue=0

var sounds

var timer

func _input(e):
	if e.type==InputEvent.SCREEN_DRAG || e.type==InputEvent.MOUSE_BUTTON:
		var epos = e.pos
		for i in range(0,9):
			var square = refs[i]
			var gpos=square.get_global_pos()
			var square_rect = Rect2(gpos.x, gpos.y, 128*square.get_scale().x, 128*square.get_scale().y)
			if square_rect.has_point(epos) && started:
				if !square.tapped:
					square.tapped=true
					sounds.play("block")
					_checkColor(square)

func _ready():
	_setButtons()
	
	get_node("/root/data").hideBanner()
	
	black = get_node("black")
	timer = get_node("timer")
	hint = get_node("hint")
	sounds = get_node("/root/data/sounds")
	ldata = get_node("/root/data").load_data
	
func _setButtons():
	get_node("black/continue").connect("pressed", self, "_continue")
	get_node("black/retry").connect("pressed", self, "_retry")
	get_node("black/finish").connect("pressed", self, "_finish")
	get_node("color").connect("pressed", self, "_nextCol")
	
	for i in range(1,10):
		refs[i-1]=get_node(str(i))
		refs[i-1].color=block_colors[i-1]

func _timeout():

	if stage==2:
		stage+=1
		
		for i in range(0,9):
			refs[i].changeColor(0)
		
		started=true
		get_node("color").set_normal_texture(preload("res://assets/img/pack0/red.png"))
		timer.stop()
		black.get_node("text2").hide()
		black.get_node("text3").show()
		black.show()

func _nextCol():
	if stage>=5:
		hint.set_text("Tap all the blue ones")
		sounds.play("switch")
		get_node("color").set_normal_texture(preload("res://assets/img/pack0/blue.png"))

func _continue():
	if stage==1:
		black.get_node("text1").hide()
		black.get_node("text2").show()
		stage+=1
	elif stage==2:
		timer.start()
		black.hide()
		hint.set_text("Remember the colors")
	elif stage==3:
		black.hide()
		set_process_input(true)
		hint.set_text("Tap all the red ones")
	elif stage==4:
		set_process_input(false)
		black.get_node("text3").hide()
		black.get_node("text4").show()
		black.show()
		stage+=1
	elif stage==5:
		black.hide()
		hint.set_text("Tap the 10th square")
		set_process_input(true)
	elif stage==6:
		set_process_input(true)
		black.get_node("text4").hide()
		black.get_node("text5").show()
		black.get_node("continue").hide()
		black.get_node("retry").show()
		black.get_node("finish").show()
		black.show()
	elif stage==10:
		get_tree().change_scene("res://scenes/tutorial.tscn")
	
func _finish():
	get_node("/root//data").load_data.firsttime=0
	get_node("/root//data").save_play_data(false)
	get_node("/root/data").reload()
	get_tree().change_scene("res://scenes/ui/mainmenu.tscn")
	
func _retry():
	get_tree().change_scene("res://scenes/tutorial.tscn")

func _checkColor(square):	
	if square.color==1 && stage<5 && started:
		print("Accept")
		square.reveal()
		square.accept()
		red+=1
		squares_left-=1
		sounds.play("block")
		
		if red==5:
			stage+=1
			_continue()

	elif square.color==2 && started && stage>=5:
		square.reveal()
		square.accept()
		blue+=1
		squares_left-=1
		sounds.play("block")
		
		if blue==4:
			stage+=1
			_continue()
		
	elif square.color == 2 && stage<5 || square.color==1 && stage>=5:
		square.reveal()
		square.deny()
		squares_left-=1
		
	if squares_left==0:
		if red==5 && blue==4:
			stage+=1
			_continue()
		else:
			_over()

#Level completed with flaws
func _over():
	black.get_node("text4").hide()
	black.get_node("continue").hide()
	black.get_node("retry").show()
	black.get_node("finish").show()
	black.get_node("text6").show()
	black.show()
	stage=10


func _1_pressed():
	_checkColor(0)
func _2_pressed():
	_checkColor(1)
func _3_pressed():
	_checkColor(2)
func _4_pressed():
	_checkColor(3)
func _5_pressed():
	_checkColor(4)
func _6_pressed():
	_checkColor(5)
func _7_pressed():
	_checkColor(6)
func _8_pressed():
	_checkColor(7)
func _9_pressed():
	_checkColor(8)