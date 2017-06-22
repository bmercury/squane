extends Node2D

var unlocked
var ldata
var costs = [0,500,1000,2500]

func _ready():
	get_node("/root/data").hideBanner()
	
	get_node("0/Button").connect("pressed", self, "_on_0_pressed")
	get_node("1/Button").connect("pressed", self, "_on_1_pressed")
	get_node("2/Button").connect("pressed", self, "_on_2_pressed")
	get_node("3/Button").connect("pressed", self, "_on_3_pressed")
	
	
	ldata = get_node("/root/data").load_data
	get_node("sqoins").set_text(str(ldata.sqoins))

	unlocked=ldata.unlocked

	get_node("ads").connect("pressed", self, "_on_ads_pressed")
	
	if ldata.ads==1:
		get_node("ads/Label").set_text("Disable ads")
		
	for i in range(4):
		if unlocked[i]==1:
			var btn = get_node(str(i)+"/Button")
			btn.get_node("Label").set_text("Select")
			if ldata.pack == i:
				var frame = get_node(str(i))
				frame.set_modulate("#eae8a0")
		else:
			var btn = get_node(str(i)+"/Button")
			btn.get_node("Label").set_text("Buy("+str(costs[i])+")")
	
	
func _on_ads_pressed():
	if ldata.ads==0:
		get_node("/root/data").load_data.ads=1
		get_node("/root/data").save_play_data(false)
		get_node("ads/Label").set_text("Disable ads")
	else:
		get_node("/root/data").load_data.ads=0
		get_node("/root/data").save_play_data(false)
		get_node("ads/Label").set_text("Enable ads")
	
	get_node("/root/data").reload()
	ldata=get_node("/root/data").load_data
	get_node("/root/data").hideBanner()
		
func _selectTheme(n):
	if(unlocked[n]==1):
		get_node("/root/data").load_data.pack=n
		get_node("/root/data").save_play_data(false)
		get_node("/root/data").reload()
		ldata = get_node("/root/data").load_data
		get_node("/root/data/sounds").play("click")
		
		get_node(str(0)).set_modulate("#ffffff")
		get_node(str(1)).set_modulate("#ffffff")
		get_node(str(2)).set_modulate("#ffffff")
		get_node(str(3)).set_modulate("#ffffff")
		get_node(str(n)).set_modulate("#eae8a0")
	else:
		if(ldata.sqoins>=costs[n]):
			unlocked[n]=1
			ldata.unlocked = unlocked
			ldata.sqoins-=costs[n]
			get_node("/root/data/sounds").play("cash");
			get_node("/root/data").load_data.sqoins=ldata.sqoins
			get_node("/root/data").load_data.pacl=n
			get_node("/root/data").save_play_data(false)
			get_node("/root/data").reload()
			ldata = get_node("/root/data").load_data
			get_node("sqoins").set_text(str(ldata.sqoins))
			get_node(str(n)+"/Button/Label").set_text("Select")
			_selectTheme(n)
		else:
			get_node("/root/data/sounds").play("wrong");

	get_node("/root/data").hideBanner()

#Select a theme buttons
func _on_0_pressed():
	_selectTheme(0)

func _on_1_pressed():
	_selectTheme(1)

func _on_2_pressed():
	_selectTheme(2)
	
func _on_3_pressed():
	_selectTheme(3)