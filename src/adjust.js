(function(){
  "use strict";
  var root = this;

  var Adjust = root.Adjust = function(s){
    var a = $(s);
    var gid = 1;

    this.draggable = function(s) {
      var ads = $(s);
      var c = {};
      ads.each(function(){
        var node = new Node(this, ads.index(this.parentElement) > -1);
         c[node.id] = node;
      });

      new Drag(a[0], c);
    }

  };

  var Node = Adjust.Node = function(element, p){
    var jq = $(element),
        self = this,
        gid = Node.prototype.gid = Node.prototype.gid+1;

    this.id = 'node-' + gid;
    this.containment = p;
    this.e = element;
    this.$ = jq;

    jq.css({
      'display': 'block',
      'position': 'absolute'
    }).attr('nid', this.id);
  }
  Node.prototype.gid = 0;

  var Drag = Adjust.Drag = function(s, c){

    var jq = $(s),
        c = c,
        self = this;

    jq.mousedown(function(e){ self.dragStart(e) })
    .mousemove(function(e){ self.dragMove(e) })
    .mouseup(function(e){ self.dragEnd(e) });

    this.dragNode = null;
    this.$ = jq;
    this.e = s;
    this.collect = c;

    this.isDraggable = function(element) {
      if (element && element.getAttribute('nid')) {
        return typeof c[element.getAttribute('nid')] != 'undefined';
      }
      return false;
    }

    this.getContainment = function(node) {
      var n = node || this.dragNode;
      if (n.containment) {
        if (n.containment == true 
            && n.e.parentElement
            && n.e.parentElement.getAttribute('nid')
            && c[n.e.parentElement.getAttribute('nid')]) { // containment = true
          return c[n.e.parentElement.getAttribute('nid')];

        } else if (c[n.containment]) { // containment = nid
          return c[n.containment];

        } else if (n.containment.getAttribute('nid')
            && c[n.containment.getAttribute('nid')]) { // containment = element
          return c[n.containment];

        }
      }
      return this;
    }

    this.getDragNode = function(element) {
      if (element && element.getAttribute('nid')) {
        return c[element.getAttribute('nid')];
      }
    }

    this.dragStart = function(event) {
      // console.log("trackStart");
      // console.log(this.$.dragable.style);
      if (this.e != event.target 
          && this.isDraggable(event.target)) {
        this.dragNode = this.getDragNode(event.target);

        var jq = this.dragNode.$;
        // debugger;
        this.x = event.pageX - parseInt(jq.css("left"));
        this.y = event.pageY - parseInt(jq.css("top"));
        // console.log($(event.target).css("width"));

        // this.drag.css("cursor", "move");

        event.stopPropagation();
      }
    }

    this.dragMove = function(event) {
      // console.log("track x:" + event.pageX + "y:" + event.pageY);
      if (this.dragNode) {
        var x = event.pageX - this.x;
        var y = event.pageY - this.y;
          // debugger;
        // if (event.target.parentElement.tagName == "J-DRAG") {
        var containment = this.getContainment();
        if (containment) {
          // console.log(containment);
          if (x < 0) { x = 0; }
          if (y < 0) { y = 0; }

          var pw = containment.$.width();
          var ph = containment.$.height();
          var w = this.dragNode.$.width();
          var h = this.dragNode.$.height();
          if (x > pw-w) { x = pw - w; }
          if (y > ph-h) { y = ph - h; }
        }

        // event.target.style.left = x + "px";
        // event.target.style.top = y + "px";
        this.dragNode.$.css({
          left: x + "px",
          top: y + "px"
        });
        
        event.stopPropagation();
      }
    }

    this.dragEnd = function(event) {
      if (this.dragNode) {
        // this.x = 0;
        // this.y = 0;

        // this.drag.css("cursor", "");
        this.dragNode = null;

        event.stopPropagation();
      }
    }


  };

}).call(this);