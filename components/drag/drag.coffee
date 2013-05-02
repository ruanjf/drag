window.Dg = VERSION: "0.1"

# tools
Dg.isNode = (n) -> n instanceof Dg.Node

Dg.listNodes = (c, fuc) ->
	doFuc = (n) ->
		if Dg.isNode n  then fuc n
	if _.isArray c
		_.each c, doFuc
	else
		doFuc c

# Dg.extend = (d, s) ->
# 	if d and s and _.isFunction d
# 		if _.isFunction s
# 			d.prototype = new s()
# 		else if _.isObject s
# 			d.prototype = s
# 		d.prototype.constructor = d
# 	d

# Dg.extendNode = (d, s) ->
# 	if s
# 		if not Dg.isNode(s) then return d
# 	else
# 		s = Dg.Node
# 	Dg.extend d, s

class Dg.Node
	constructor: (left, top, height, width) ->
		if not left then left = 0
		if not top then top = 0
		@prop = {}
		@prop.left = left
		@prop.top = top
		@prop.height = height
		@prop.width = width

		# parent = null
		# @parent = parent
		@parent = null
		@children = []
		@nodeId = getNodeId "node" 
		@wrap = getWrap @prop, @nodeId

	getWrap = (prop, nodeId)->
		css = 
			left: prop.left
			top: prop.top
			# height: prop.height,
			# width: prop.width,
			position: 'absolute'
			border: 'blue dashed thin'
			overflow: 'hidden'

		$('<div id="'+nodeId+'"></div>').css css

	getNodeId = (name) -> name + "_" + new Date().getTime()


	getChildren: -> children

	addChildren: (c) ->
		self = @
		Dg.listNodes c, (n) ->
			self.children.push n
			n.parent = self
			self.wrap.append n.wrap
			n.render()

	removeChildren: (c) ->
		self = @
		Dg.listNodes c, (n) ->
			self.children = _.without children, n
			n.parent = null
			self.wrap.remove n.wrap

	render: ->
		wrap = @wrap
		if not @prop.height
			if @parent
				@prop.height = @parent.wrap.css("height").replace("px", "")-2
			else
				@prop.height = 200;

		wrap.css "height", @prop.height+"px" 

		if not @prop.width
			if @parent
				@prop.width = @parent.wrap.css("width").replace("px", "")-2
			else
				@prop.width = 200;

		wrap.css "width", @prop.width+"px" 
		wrap.append @nodeId
		wrap.draggable containment: "parent"
		wrap.mousedown () -> $(@).css "cursor", "move"
		wrap.mouseup () -> $(@).css "cursor", ""

		wrap.click ()->
			$(@).css "border", "red solid thin" 
			if hostKeyWidget then hostKeyWidget.css "border", ""
			hostKeyWidget = $ @
			false

		wrap.dblclick () ->
			alert 1
			false

		@renderContent wrap

	renderChildren: ->
		wrap = @wrap
		_.each @children, (n) ->
			vc = wrap.find n
			if vc then vc.remove()
			wrap.append n
			n.render()

	renderContent: (wrap) ->


class Dg.Draw extends Dg.Node
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

		# bc = $ '#breadcrumb'
		bc = $ '<div id="breadcrumb"></div>'
		root.append bc
		bc.css ct

		@render = ->

class Dg.Drawxxx extends Dg.Node
	aa: ->
		alert 1

	bb: ->
		alert 2