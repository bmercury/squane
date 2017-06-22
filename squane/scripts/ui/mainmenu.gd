extends Node2D

var sqoins_ref
var sqoins=0
var record=0

var ldata

#test
func _ready():
	
	_setButtons()
	
	ldata = get_node("/root/data").load_data
	sqoins = ldata.sqoins
	record = ldata.record

	get_node("sqoins").set_text(str(sqoins))
	get_node("record").set_text("Best score: "+str(record))
	
	if ldata.changes==1:
		get_node("changes").show()
		get_node("/root/data").hideBanner()
	else:	
		if ldata.firsttime==1:
			get_node("black").show()
			get_node("/root/data").hideBanner()
		else:
			get_node("/root/data").hideBanner()
			get_node("/root/data").showBanner()
			
	#get_node("/root/data").signIn()

func _setButtons():
	get_node("btn_play").connect("pressed", self, "_on_btn_play_pressed")
	get_node("btn_play4x4").connect("pressed", self, "_on_btn_play4x4_pressed")
	get_node("btn_shop").connect("pressed", self, "_on_btn_shop_pressed")
	get_node("btn_help").connect("pressed", self, "_on_btn_help_pressed")
	
	get_node("black/yes").connect("pressed", self, "_on_yes_pressed")
	get_node("black/no").connect("pressed", self, "_on_no_pressed")
	get_node("changes/continue").connect("pressed", self, "_on_continue_pressed")


#Ask for a tutorial buttons
func _on_yes_pressed():
	get_tree().change_scene("res://scenes/tutorial.tscn")
	
func _on_continue_pressed():
	get_node("/root/data").load_data.changes=0
	get_node("/root/data").save_play_data(false)
	get_node("/root/data").reload()
	ldata = get_node("/root/data").load_data
	get_node("changes").hide()
	
	
	if ldata.firsttime==1:
		get_node("black").show()
	else:
		get_node("/root/data").hideBanner()
		get_node("/root/data").showBanner()
	
func _on_no_pressed():
	get_node("/root/data").load_data.firsttime=0
	get_node("/root/data").save_play_data(false)

	get_node("black").hide()
	get_node("/root/data").hideBanner()
	get_node("/root/data").showBanner()


#Menu buttons
func _on_btn_play_pressed():
	get_node("/root/data/sounds").play("click")
	get_tree().change_scene_to(get_node("/root/data").game_scene)
func _on_btn_help_pressed():
	get_node("/root/data/sounds").play("click")
	get_tree().change_scene_to(get_node("/root/data").help_scene)
func _on_btn_shop_pressed():
	get_node("/root/data/sounds").play("click")
	get_tree().change_scene_to(get_node("/root/data").shop_scene)
func _on_btn_play4x4_pressed():
	get_node("/root/data/sounds").play("click")
	if record>=500:
		get_tree().change_scene_to(get_node("/root/data").game_large_scene)
	else:
		get_node("note").show()