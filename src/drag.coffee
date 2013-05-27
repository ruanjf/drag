###*
# Drag框架的基础对象
# @class Dg
###
Dg = 
	VERSION: "0.1"

if window then window.Dg = Dg

# tools

###*
# 判断实例是否为节点
# 
# @static
# @method isNode
# @param n {Obejct} 指定节点
# @return {Boolean} 如果是返回true
###
Dg.isNode = (n) -> n instanceof Dg.Node


###*
# 判断实例是否为布局面板
# 
# @static
# @method isDraw
# @param n {Obejct} 指定节点
# @return {Boolean} 如果是返回true
###
Dg.isDraw = (n) -> n instanceof Dg.Draw

###*
# 迭代给定的节点列表，并回调执行方法
# 
# @static
# @method listNodes
# @param n {Obejct} 指定节点或者节点列表
# @param fuc {Function} 需执行的方法
###
Dg.listNodes = (c, fuc) ->
	doFuc = (n) ->
		if Dg.isNode n then fuc n
	if _.isArray c
		_.each c, doFuc
	else
		doFuc c

###*
# 查找节点的布局面板节点
# 
# @static
# @method findDraw
# @param n {Obejct} 指定节点
# @return {Obejct} 找到返回布局面板节点否则返回null
###
Dg.findDraw = (n) ->
	if n.parent
		if Dg.isNode n.parent
			Dg.findDraw n.parent
	else
		if Dg.isDraw n
			n
		else
			null

###*
# 添加子节点到当前节点中
# 
# @static
# @method getKeyCode
# @param e {Events} 事件对象
# @return {Integer} 当前按键对于键码值
###
Dg.getKeyCode = (e) ->
	# alert e.which + ',' + e.keyCode
	if e.which
			k = e.keyCode    # old IE
	else if e.which != 0 and e.charCode != 0
		k = e.which	  # All others
	else
		# special key
	k


