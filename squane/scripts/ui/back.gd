extends TextureButton

func _ready():
	connect("pressed", self, "_on_back_pressed")

func _on_back_pressed():
	get_node("/root/data").hideBanner()
	get_node("/root/data/sounds").play("click")
	get_tree().change_scene_to(get_node("/root/data").menu_scene)