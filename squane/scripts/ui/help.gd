extends Node2D

func _ready():
	get_node("tutorial").connect("pressed", self, "_on_tutorial_pressed")
	get_node("/root/data").hideBanner()
	
func _on_tutorial_pressed():
	get_tree().change_scene("res://scenes/tutorial.tscn")