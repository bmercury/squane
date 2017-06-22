extends "res://scripts/square_general.gd"

var tapped = false #If the block is tapped
var color = 0 #Color of the block

func _ready():
	_preloadAssets()

func reveal():
	changeColor(color)
	print("Change my color to "+str(color))

func accept():
	if get_tree().get_current_scene().get_name()=="4x4":
		get_node("correct4").show()
	else:
		get_node("correct").show()
	
	tapped=true
	
func deny():
	if  get_tree().get_current_scene().get_name()=="4x4":
		get_node("wrong4").show()
	else:
		get_node("wrong").show()
	tapped=true