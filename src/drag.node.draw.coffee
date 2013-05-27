###*
# 布局面板，用于生成界面的显示效果
# @class Dg.Draw
# @extends Dg.Node
###
class Dg.Draw extends Dg.Node
	###*
	# @class Dg.Draw
	# @constructor
	# @param id {String} 布局面板需要依托的html节点
	# @param height {Integer} 节点的高度
	# @param width {Integer} 节点的宽度
	###
	constructor: (id, height, width) ->

		super 0, 0, height, width

		if not id then alert "id not found"
		if not height then height = 600
		# if not width then width  = 1024

		root = $ '#'+id
		root.empty()

		ct =
			'margin-right': 'auto'
			'margin-left': 'auto'

		if width then ct.width = width+'px';
		# dg = $ '#drag'
		dg = $ '<div id="drag"></div>'
		root.append dg
		# dg.empty()
		dg.css ct
		dg.css
			'background': '#FFFFFF url(img/bg.png) repeat 51% 0%'
			'position': 'relative'
			'height': height+'px'
			'overflow-y': 'scroll'

		dg.css 'height': height+'px'
		# pl = $ '#panel'
		pl = $ '<div id="panel"></div>'
		@wrap = pl
		@panel = pl
		dg.append pl
		pl.css
			position: 'relative'
			'height': '2000px'
		@prop.width = Number pl.css("width").replace("px", "")
		@prop.height = Number pl.css("height").replace("px", "")

		# bc = $ '#breadcrumb'
		bc = $ '<div id="breadcrumb"></div>'
		root.append bc
		bc.css ct
		
		# @wrap.selectable()
		
		$(document).keydown (e) =>
			if @selectedWidget
				@moveNode @selectedWidget, Dg.getKeyCode e

		@render = ->

	###*
	# 使用方向键移动节点
	# 
	# @method moveNode
	# @chainable
	# @param n {Object} 需移动的节点
	# @param k {Object} 当前按键对于键码值
	# @param s {Object} 移动的步长
	###
	moveNode: (n, k, s) ->
		if n and k >= 37 and k <= 40
			w = n.wrap
			p = n.parent
			if not s then s = 1
			switch k
				when 37
					l = Number w.css("left").replace("px", "")
					if l > 0 then w.css "left", l-s+"px"
					# then w.css "left", Number(w.css("left").replace("px", ""))-s+"px"
				when 38
					t = Number w.css("top").replace("px", "")
					if t > 0 then w.css "top", t-s+"px"
					# then w.css "top", Number(w.css("top").replace("px", ""))-s+"px"
				when 39
					l = Number w.css("left").replace("px", "")
					wd = n.prop.width
					pwd = p.prop.width
					if pwd > wd + l + 2 then w.css "left", l+s+"px"
				when 40
					t = Number w.css("top").replace("px", "")
					ht = n.prop.height
					pht = p.prop.height
					if pht > ht + t + 2 then w.css "top", t+s+"px"
			return false
			# String.fromCharCode(e.keyCode);