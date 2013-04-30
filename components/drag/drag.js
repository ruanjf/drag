(function(){

	Dg = { VERSION: "0.1" };


	// tools
	Dg.isNode = function(n) {
		return n instanceof Dg.Node;
	};

	Dg.listNodes = function(c, fuc) {
		if ( _.isArray(c) ) {
			_.each(c, doFuc);
		} else {
			doFuc(c);
		}
		function doFuc(n) {
			if ( Dg.isNode(n) ) {
				fuc(n);
			}
		}
	};
	Dg.extend = function(d, s) {
		if (d && s && _.isFunction(d)) {
			if ( _.isFunction(s) ) {
				d.prototype = new s();
			} else if ( _.isObject(s) ) {
				d.prototype = s;
			}
			d.prototype.constructor = d;
		}
		return d;
	};
	Dg.extendNode = function(d, s) {
		if ( s ) {
			if ( !Dg.isNode(s) ) return d;
		} else {
			s = Dg.Node;
		}
		return Dg.extend(d, s);
	};


	// node
	Dg.Node = function(left, top, height, width) {
		var prop = {};
		if (! left) left = 0;
		if (! top) top = 0;
		// if (! height) height = 200;
		// if (! width) width = 200;
		prop.left = left;
		prop.top = top;
		prop.height = height;
		prop.width = width;

		var parent = null;
		this.parent = parent;
		var children = [];
		var nodeId = getNodeId("node");
		this.wrap = getWrap();

		function getWrap() {
			var css = {
				left: prop.left,
				top: prop.top,
				// height: prop.height,
				// width: prop.width,
				position: 'absolute',
				border: 'blue solid thin',
				overflow: 'hidden'
			};
			return $('<div id="'+nodeId+'"></div>').css( css );
		}
		function getNodeId(name) {
			return name + "_" + new Date().getTime();
		}

		this.getChildren = function() {
			return children;
		};
		this.addChildren = function(c) {
			var self = this;
			Dg.listNodes(c, function(n){
				children.push(n);
				n.parent = self;
				self.wrap.append(n.wrap);
				n.render();
			});
		};
		this.removeChildren = function(c) {
			var self = this;
			Dg.listNodes(c, function(n){
				children = _.without(children, n);
				n.parent = null;
				self.wrap.remove(n.wrap);
			});
		};
		this.render = function() {
			var wrap = this.wrap;
			if (! prop.height) {
				if (this.parent) {
					prop.height = this.parent.wrap.css("height").replace("px", "")-2;
				} else {
					prop.height = 200;
				}
			}
			wrap.css("height", prop.height+"px");

			if (! prop.width) {
				if (this.parent) {
					prop.width = this.parent.wrap.css("width").replace("px", "")-2;
				} else {
					prop.width = 200;
				}
			}
			wrap.css("width", prop.width+"px");
			wrap.append(nodeId);
			wrap.draggable({ containment: "parent" });
			wrap.mousedown(function(){
				$(this).css("cursor", "move");
			});
			wrap.mouseup(function(){
				$(this).css("cursor", "");
			});
			// wrap.click(function(){
				// $(this).css("border", "red solid thin");
				// if (hostKeyWidget) {
					// hostKeyWidget.css("border", "");
				// }
				// hostKeyWidget = $(this);
				// return false;
			// });
			wrap.dblclick(function(){
				alert(1);
				return false;
			});

			this.renderContent(wrap);
		};
		this.renderChildren = function() {
			_.each(children, function(n) {
				var vc = wrap.find(n);
				if (vc) vc.remove();
				wrap.append(n);
				n.render();
			});
		};

		this.renderContent = function(wrap) {};
	};

	// draw
	Dg.Draw = Dg.extendNode(function(id, height, width) {
		if (! id) {
			alert("id not found");
			return;
		}
		if (! height) height = 600;
		// if (! width) width = 1024;

		var root = $('#'+id);
		root.empty();

		var ct = {
			'margin-right': 'auto',
			'margin-left': 'auto'
		};
		if (width) ct.width = width+'px';
		// var dg = $('#drag');
		var dg = $('<div id="drag"></div>');
		root.append(dg);
		//dg.empty();
		dg.css(ct);
		dg.css({
			'background': '#FFFFFF url(img/bg.png) repeat 51% 0%',
			'position': 'relative',
			'height': height+'px',
			'overflow-y': 'scroll'
		});
		dg.css({'height': height+'px'});
		// var pl = $('#panel');
		var pl = $('<div id="panel"></div>');
		this.wrap = pl;
		this.panel = pl;
		dg.append(pl);
		pl.css({
			position: 'relative',
			'height': '2000px'
		});
		// var bc = $('#breadcrumb');
		var bc = $('<div id="breadcrumb"></div>');
		root.append(bc);
		bc.css(ct);

		this.render = function() {};

		// var nodes = [];
		// this.getNodes = function() {
		// 	return nodes;
		// };
		// this.addNodes = function(c) {
		// 	Dg.listNodes(c, function(n){
		// 		nodes.push(n);
		// 		pl.append(n.wrap);
		// 		n.render();
		// 	});
		// };
		// this.removeNodes = function(c) {
		// 	Dg.listNodes(c, function(n){
		// 		nodes = _.without(nodes, n);
		// 		pl.remove(n.wrap);
		// 	});
		// };
	});

}());