extends Node2D

var load_data
var llevel #Last level save
var llevel4

var menu_scene = null
var help_scene = null
var shop_scene = null
var game_scene = null
var game_large_scene = null

var showads = true
var admob = null
var isReal = true
var isTop = false
var adBannerId = "ca-app-pub-2209488083737387/6757303753"
var testId = "ca-app-pub-3940256099942544/6300978111"


func _ready():
	
	load_data = load_play_data()
	llevel = load_last_level()
	llevel4 = load_last_level4()
	fix_saves()
	
	if(Globals.has_singleton("bbAdmob")):
		admob = Globals.get_singleton("bbAdmob")
		#You can call admob.init_admob_test or admob.init_admob_real
		#If the second argument is true, the banner ad will be at the top of the screen
		#Function prototype init_admob_test(final String app_id, boolean isTop)
		
		if isReal:
			admob.init_admob_banner_real(get_instance_ID(), adBannerId, false)
		else:
			admob.init_admob_banner_test(get_instance_ID(), adBannerId, false)
		showBanner()
		
	menu_scene = load("res://scenes/ui/mainmenu.tscn")
	help_scene = load("res://scenes/ui/help.tscn")
	shop_scene = load("res://scenes/ui/shop.tscn")
	game_scene = load("res://scenes/3x3.tscn")
	game_large_scene = load("res://scenes/4x4.tscn")

func reload():
	load_data = load_play_data()
	llevel = load_last_level()
	llevel4 = load_last_level4()


func hideBanner():
	if admob != null:
		admob.hide_banner()
		
func showBanner():
	if admob != null:
		admob.show_banner()

func _play(sound):
	get_node("sounds").play(sound)


func save_play_data(reset):
	
	var path = "user://play.data"
	var f = File.new()
	
	f.open(path, File.WRITE)
	
	if !reset:
		f.store_var({
		"sqoins":load_data.sqoins,
		"pack":load_data.pack,
		"unlocked":load_data.unlocked,
		"record":load_data.record,
		"record4":load_data.record4,
		"ads":load_data.ads,
		"firsttime":load_data.firsttime,
		"changes":load_data.changes})
	else:
		f.store_var({
		"sqoins":0,
		"pack":0,
		"unlocked":[1,0,0,0],
		"record":0,
		"record4":0,
		"ads":1,
		"firsttime":1,
		"changes":1})
	f.close()

func load_play_data():
	var path = "user://play.data"
	
	var f = File.new()
	if f.file_exists(path):
		f.open(path, File.READ)
		var data = f.get_var()
		f.close()
		return data
	else:
		save_play_data(true)
		
		f.open(path, File.READ)
		var data = f.get_var()
		f.close()
		return data

func fix_saves():
	var path = "user://play.data"
	
	var f = File.new()
	if f.file_exists(path):
		f.open(path, File.READ)
		load_data = f.get_var()
		f.close()
		
		if !load_data.has("sqoins"):
			load_data.sqoins=0
		if !load_data.has("pack"):
			load_data.pack=0
		if !load_data.has("unlocked"):
			load_data.unlocked=[1,0,0,0]
		if !load_data.has("record"):
			load_data.record=0
		if !load_data.has("record4"):
			load_data.record4=0
		if !load_data.has("ads"):
			load_data.ads=1
		if !load_data.has("firsttime"):
			load_data.firsttime=1
		if !load_data.has("changes"):
			load_data.changes=1
			
		save_play_data(false)
	
	path = "user://level.data"
	f = File.new()
	if f.file_exists(path):
		f.open(path, File.READ)
		llevel = f.get_var()
		f.close()
		
		if !llevel.has("exists"):
			llevel.exists=0
		if !llevel.has("colcount"):
			llevel.colcount=2
		if !llevel.has("colors"):
			llevel.colors=[0,0,0,0,0,0,0,0,0] # Not to confuse with colcount
		if !llevel.has("score"):
			llevel.score=0
		if !llevel.has("lvl"):
			llevel.lvl=0
		if !llevel.has("shape"):
			llevel.shape=0
		save_level(false)
		
	path = "user://level4.data"
	f = File.new()
	if f.file_exists(path):
		f.open(path, File.READ)
		llevel4 = f.get_var()
		f.close()
		
		if !llevel4.has("exists"):
			llevel4.exists=0
		if !llevel4.has("colcount"):
			llevel4.colcount=2
		if !llevel4.has("colors"):
			llevel4.colors=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] # Not to confuse with colcount
		if !llevel4.has("score"):
			llevel4.score=0
		if !llevel4.has("lvl"):
			llevel4.lvl=0
		save_level4(false)
		
	load_data = load_play_data()
	llevel = load_last_level()
	llevel4 = load_last_level4()
	
func save_level(reset):
	
	var path = "user://level.data"
	var f = File.new()
	f.open(path, File.WRITE)
	
	if !reset:
		f.store_var({
		"exists":llevel.exists,
		"colors":llevel.colors,
		"colcount":llevel.colcount,
		"score":llevel.score,
		"lvl":llevel.lvl,
		"shape":llevel.shape})
	else:
		f.store_var({
		"exists":0,
		"colors":[0,0,0,0,0,0,0,0,0],
		"colcount":2,
		"score":0,
		"lvl":1,
		"shape":0})
	
	f.close()

func load_last_level():
	var path = "user://level.data"
	var f = File.new()
	if f.file_exists(path):
		f.open(path, File.READ)
		var data = f.get_var()
		f.close()
		return data
	else:
		save_level(true)
		
		f.open(path, File.READ)
		var data = f.get_var()
		f.close()
		return data
		

func save_level4(reset):
	
	var path = "user://level4.data"
	var f = File.new()
	f.open(path, File.WRITE)
	
	if !reset:
		f.store_var({
		"exists":llevel.exists,
		"colors":llevel.colors,
		"colcount":llevel.colcount,
		"score":llevel.score,
		"lvl":llevel.lvl})
	else:
		f.store_var({
		"exists":0,
		"colors":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		"colcount":2,
		"score":0,
		"lvl":1})
	
	f.close()

func load_last_level4():
	var path = "user://level4.data"
	var f = File.new()
	if f.file_exists(path):
		f.open(path, File.READ)
		var data = f.get_var()
		f.close()
		return data
	else:
		save_level4(true)
		
		f.open(path, File.READ)
		var data = f.get_var()
		f.close()
		return data
		