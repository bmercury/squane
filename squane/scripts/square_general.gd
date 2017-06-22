extends Sprite

var textures = [-1,-1,-1,-1,-1,-1]

var red = 1
var blue = 2
var green = 3
var yellow = 4
var purple = 5
var gray = 0

	
func changeColor(n):
	set_texture(textures[n])

#Load the pack
func _preloadAssets():
	
	var pack = get_node("/root/data").load_data.pack
	#get_node("/root/3x3/sqoins").set_text(str(pack+2))
	
	var tmp = "res://assets/img/pack"+str(pack)+"/"
	var pred = tmp+"/red.png"
	var pblue = tmp+"/blue.png"
	var pgreen = tmp+"/green.png"
	var pyellow = tmp+"/yellow.png"
	var ppurple = tmp+"/purple.png"
	var pgray = tmp+"/gray.png"
	
	textures[red] = load(pred)
	textures[blue] = load(pblue)
	textures[green] = load(pgreen)
	textures[yellow] = load(pyellow)
	textures[purple] = load(ppurple)
	textures[gray] = load(pgray)