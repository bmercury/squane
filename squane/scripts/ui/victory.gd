extends TextureFrame

export var text = ""

func _ready():
	get_node("menu").connect("pressed", self, "_on_menu_pressed")
	get_node("text").set_text(text)

func _on_menu_pressed():
	get_tree().change_scene("res://scenes/ui/mainmenu.tscn")