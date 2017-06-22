extends Node2D

# Object for each block
var references = [0,0,0,0,0,0,0,0,0]

# Board's position
export(int) var x = 100
export(int) var y = 100

func _ready():
	randomize()
	_getReferences()
	_setColors(2)

# Get refs of the blocks
func _getReferences():
	for i in range(1,10):
		var block = get_node(str(i))
		references[int(i)-1]=block

# Assign a random color for each of the blocks
func _setColors(cols):
	for i in range(0,9):
		var random_color = 1+randi()%cols
		references[i].color = random_color

	_displayColors()
	
func _getColors():
	var colors = [0,0,0,0,0,0,0,0,0]
	
	for i in range(0,9):
		colors[i]=references[int(i)].color
	
	return colors
	
func _unpackColors(colors):
	for i in range(0,9):
		references[int(i)].color = colors[i]
	_displayColors()
		
func _setGray():
	for i in range(0,9):
		references[i].changeColor(0)
		references[i].tapped=false
		
		references[i].get_node("correct").hide()
		references[i].get_node("correct4").hide()
		references[i].get_node("wrong").hide()
		references[i].get_node("wrong4").hide()
		
# Display the assigned colors
func _displayColors():
	for square in references:
		square.changeColor(square.color)