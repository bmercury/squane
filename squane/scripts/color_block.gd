extends TextureButton

# References of color textures
var col_refs = [0,0,0,0,0,0,0,0,0]

var choices = [0,0,0,0,0,0,0]
var used_colors = [false, false, false, false, false, false]
var color = 0

var sounds

var color_count

func _ready():
	_getReferences()


func _setChoices(n):
	color_count=n
	for i in range(0,n):
		_nextColor(i)

func _show_first_color():
	set_normal_texture(col_refs[choices[0]])

func _nextColor(i):
	var selected = false
	while selected==false:
		var r = 1+randi()%color_count
		if !used_colors[r]:
			used_colors[r]=true
			choices[i]=r
			selected=true


func _switchColor():
	if color<color_count-1:
		color+=1
		sounds.play("switch")
		set_normal_texture(col_refs[choices[color]])


func _getReferences():
	var pack = get_node("/root/data").load_data.pack
	
	var tmp = "res://assets/img/pack"+str(pack)+"/"
	var pred = tmp+"red.png"
	var pblue = tmp+"blue.png"
	var pgreen = tmp+"green.png"
	var pyellow = tmp+"yellow.png"
	var ppurple = tmp+"purple.png"
	var pgray = tmp+"gray.png"
	
	col_refs[0] = load(pgray)
	col_refs[1] = load(pred)
	col_refs[2] = load(pblue)
	col_refs[3] = load(pgreen)
	col_refs[4] = load(pyellow)
	col_refs[5] = load(ppurple)
	
	sounds = get_node("/root/data/sounds")
	self.connect("pressed", self, "_switchColor")