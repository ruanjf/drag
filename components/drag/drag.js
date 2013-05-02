// Generated by CoffeeScript 1.6.2
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Dg = {
    VERSION: "0.1"
  };

  Dg.isNode = function(n) {
    return n instanceof Dg.Node;
  };

  Dg.listNodes = function(c, fuc) {
    var doFuc;

    doFuc = function(n) {
      if (Dg.isNode(n)) {
        return fuc(n);
      }
    };
    if (_.isArray(c)) {
      return _.each(c, doFuc);
    } else {
      return doFuc(c);
    }
  };

  Dg.Node = (function() {
    var getNodeId, getWrap;

    function Node(left, top, height, width) {
      if (!left) {
        left = 0;
      }
      if (!top) {
        top = 0;
      }
      this.prop = {};
      this.prop.left = left;
      this.prop.top = top;
      this.prop.height = height;
      this.prop.width = width;
      this.parent = null;
      this.children = [];
      this.nodeId = getNodeId("node");
      this.wrap = getWrap(this.prop, this.nodeId);
    }

    getWrap = function(prop, nodeId) {
      var css;

      css = {
        left: prop.left,
        top: prop.top,
        position: 'absolute',
        border: 'blue dashed thin',
        overflow: 'hidden'
      };
      return $('<div id="' + nodeId + '"></div>').css(css);
    };

    getNodeId = function(name) {
      return name + "_" + new Date().getTime();
    };

    Node.prototype.getChildren = function() {
      return children;
    };

    Node.prototype.addChildren = function(c) {
      var self;

      self = this;
      return Dg.listNodes(c, function(n) {
        self.children.push(n);
        n.parent = self;
        self.wrap.append(n.wrap);
        return n.render();
      });
    };

    Node.prototype.removeChildren = function(c) {
      var self;

      self = this;
      return Dg.listNodes(c, function(n) {
        self.children = _.without(children, n);
        n.parent = null;
        return self.wrap.remove(n.wrap);
      });
    };

    Node.prototype.render = function() {
      var wrap;

      wrap = this.wrap;
      if (!this.prop.height) {
        if (this.parent) {
          this.prop.height = this.parent.wrap.css("height").replace("px", "") - 2;
        } else {
          this.prop.height = 200;
        }
      }
      wrap.css("height", this.prop.height + "px");
      if (!this.prop.width) {
        if (this.parent) {
          this.prop.width = this.parent.wrap.css("width").replace("px", "") - 2;
        } else {
          this.prop.width = 200;
        }
      }
      wrap.css("width", this.prop.width + "px");
      wrap.append(this.nodeId);
      wrap.draggable({
        containment: "parent"
      });
      wrap.mousedown(function() {
        return $(this).css("cursor", "move");
      });
      wrap.mouseup(function() {
        return $(this).css("cursor", "");
      });
      wrap.click(function() {
        var hostKeyWidget;

        $(this).css("border", "red solid thin");
        if (hostKeyWidget) {
          hostKeyWidget.css("border", "");
        }
        hostKeyWidget = $(this);
        return false;
      });
      wrap.dblclick(function() {
        alert(1);
        return false;
      });
      return this.renderContent(wrap);
    };

    Node.prototype.renderChildren = function() {
      var wrap;

      wrap = this.wrap;
      return _.each(this.children, function(n) {
        var vc;

        vc = wrap.find(n);
        if (vc) {
          vc.remove();
        }
        wrap.append(n);
        return n.render();
      });
    };

    Node.prototype.renderContent = function(wrap) {};

    return Node;

  })();

  Dg.Draw = (function(_super) {
    __extends(Draw, _super);

    function Draw(id, height, width) {
      var bc, ct, dg, pl, root;

      Draw.__super__.constructor.call(this, 0, 0, height, width);
      if (!id) {
        alert("id not found");
      }
      if (!height) {
        height = 600;
      }
      root = $('#' + id);
      root.empty();
      ct = {
        'margin-right': 'auto',
        'margin-left': 'auto'
      };
      if (width) {
        ct.width = width + 'px';
      }
      dg = $('<div id="drag"></div>');
      root.append(dg);
      dg.css(ct);
      dg.css({
        'background': '#FFFFFF url(img/bg.png) repeat 51% 0%',
        'position': 'relative',
        'height': height + 'px',
        'overflow-y': 'scroll'
      });
      dg.css({
        'height': height + 'px'
      });
      pl = $('<div id="panel"></div>');
      this.wrap = pl;
      this.panel = pl;
      dg.append(pl);
      pl.css({
        position: 'relative',
        'height': '2000px'
      });
      bc = $('<div id="breadcrumb"></div>');
      root.append(bc);
      bc.css(ct);
      this.render = function() {};
    }

    return Draw;

  })(Dg.Node);

}).call(this);