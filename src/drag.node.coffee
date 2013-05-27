###*
# 基础节点，提供通用方法支持
# @class Dg.Node
###
class Dg.Node
	###*
	# @class Dg.Node
	# @constructor
	# @param left {Integer} 相对于父节点左边位置的像素
	# @param top {Integer} 相对于父节点上边位置的像素
	# @param height {Integer} 节点的高度
	# @param width {Integer} 节点的宽度
	###
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

	###*
	# 获取包裹该节点的jquery对象
	# 
	# @static
	# @method getWrap
	# @param prop {Integer} 相对于父节点左边位置的像素
	# @param nodeId {String} 相对于父节点上边位置的像素
	# @return {Object} 返回该节点对应的jquery对象
	###
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

	###*
	# 获取该节点的唯一标识
	# 
	# @static
	# @method getNodeId
	# @param name {String} 指定标识的前缀
	# @return {String} 返回该节点的唯一标识
	###
	getNodeId = (name) -> name + "_" + new Date().getTime()

	###*
	# 获取该节点的子节点，只返回直接子节点
	# 
	# @method getChildren
	# @return {Array} 以数组的形式返回子节点
	###
	getChildren: -> children

	###*
	# 添加子节点到当前节点中
	# 
	# @method addChildren
	# @chainable
	# @param nodes {Object} 子节点，支持一个或者多个
	# @return {Object} 当前节点
	###
	addChildren: (c) ->
		self = @
		Dg.listNodes c, (n) ->
			self.children.push n
			n.parent = self
			self.wrap.append n.wrap
			n.render()
		self

	###*
	# 添加子节点到当前节点中
	# 
	# @method removeChildren
	# @chainable
	# @param nodes {Object} 子节点，支持一个或者多个
	# @return {Object} 当前节点
	###
	removeChildren: (c) ->
		self = @
		Dg.listNodes c, (n) ->
			self.children = _.without children, n
			n.parent = null
			self.wrap.remove n.wrap
		self

	###*
	# 绘制当前节点显示界面
	# 
	# @method render
	# @chainable
	# @return {Object} 当前节点
	###
	render: ->
		self = @
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
		# wrap.append @nodeId
		wrap.draggable containment: "parent"
		wrap.mousedown () -> $(@).css "cursor", "move"
		wrap.mouseup () -> $(@).css "cursor", ""
		# wrap.mousemove () -> $(@).css "cursor", "move"

		wrap.click ()->
			d = Dg.findDraw self
			if d
				if d.selectedWidget and d.selectedWidget.wrap
					d.selectedWidget.wrap.css "border", "blue dashed thin"
				d.selectedWidget = self
				$(@).css "border", "blue solid thin"
			false

		wrap.dblclick () ->
			alert 1
			false

		wrap.selectable()

		@renderContent wrap
		self

	###*
	# 绘制子节点显示界面
	# 
	# @method render
	# @chainable
	# @return {Object} 当前节点
	###
	renderChildren: ->
		wrap = @wrap
		_.each @children, (n) ->
			vc = wrap.find n
			if vc then vc.remove()
			wrap.append n
			n.render()
		@

	###*
	# 绘制子节点显示界面
	# 
	# @method render
	# @param wrap {Object} 子节点，支持一个或者多个
	# @return {Object} 当前节点
	###
	renderContent: (wrap) ->

