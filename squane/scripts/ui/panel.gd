extends Control

# class member variables go here, for example:
# var a = 2
# var b = "textvar"

func _ready():
	get_node("retry").connect("pressed", self, "_on_retry")
	get_node("shop").connect("pressed", self, "_on_shop")
	get_node("exit").connect("pressed", self, "_on_exit")

func _on_retry():
	if get_tree().get_current_scene().get_name() == "3x3":
		get_tree().change_scene("res://scenes/3x3.tscn")
	else:
		get_tree().change_scene("res://scenes/4x4.tscn")

func _on_shop():
	get_tree().change_scene("res://scenes/ui/shop.tscn")

func _on_exit():
	get_tree().change_scene("res://scenes/ui/mainmenu.tscn")