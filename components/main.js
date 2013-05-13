var webPaths = {
        "jquery": "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min",
		"jquery.ui.core": "jquery/ui/jquery.ui.core",
		"jquery.ui.widget": "jquery/ui/jquery.ui.widget",
		"jquery.ui.mouse": "jquery/ui/jquery.ui.mouse",
		"jquery.ui.draggable": "jquery/ui/jquery.ui.draggable",
		"jquery.ui.droppable": "jquery/ui/jquery.ui.droppable",
		"jquery.ui.resizable": "jquery/ui/jquery.ui.resizable",
		"underscore": "underscore/underscore",
        "bootstrap": "bootstrap/js/bootstrap",
        "holder": "holder/holder",
        "backbone": "backbone/backbone",
        "drag": "drag/drag"
};
var localPaths = {
    "jquery": "jquery/jquery",
	"jquery.ui.core": "jquery/ui/jquery.ui.core",
	"jquery.ui.widget": "jquery/ui/jquery.ui.widget",
	"jquery.ui.mouse": "jquery/ui/jquery.ui.mouse",
	"jquery.ui.draggable": "jquery/ui/jquery.ui.draggable",
	"jquery.ui.droppable": "jquery/ui/jquery.ui.droppable",
	"jquery.ui.resizable": "jquery/ui/jquery.ui.resizable",
	"underscore": "underscore/underscore",
    "bootstrap": "bootstrap/js/bootstrap",
    "holder": "holder/holder",
    "backbone": "backbone/backbone",
    "drag": "drag/drag"
};
require.config({

    deps: ["main"],

    paths: localPaths,

    shim: {
        "jquery": {
            exports: "jQuery"
        },
        "underscore": {
            exports: "_"
        },
        "backbone": {
            exports: "Backbone",
            deps: ["underscore", "jquery"]
        },
        "bootstrap": ["jquery", "holder"],
        "jquery.ui.core": ["jquery"],
        "jquery.ui.widget": ["jquery", "jquery.ui.core"],
        "jquery.ui.mouse": ["jquery", "jquery.ui.widget"],
        "jquery.ui.draggable": ["jquery", "jquery.ui.widget"],
        "jquery.ui.droppable": ["jquery", "jquery.ui.widget"],
        "jquery.ui.resizable": ["jquery", "jquery.ui.widget"],
        "drag": [
			"jquery",
			"jquery.ui.core",
			"jquery.ui.widget",
			"jquery.ui.mouse",
			"jquery.ui.draggable",
			"jquery.ui.droppable",
			"jquery.ui.resizable"
		]
    }

});
require(
	[
		// "jquery/jquery",
		// "jquery.ui",
		// "underscore",
		"bootstrap",
		// "holder",
		"backbone",
		"drag"
	],
	function() {
		//alert( $('body').text() );
		// console.log(Node);
		// console.log(Dg.VERSION);
		var dw = new Dg.Draw("ct", 500);
		var a = new Dg.Node(0, 0, 300);
		var b = new Dg.Node(20, 20, 100, 100);
		b.renderContent = function(wrap) {
			wrap.append("<div>bbbbbb</div>");
		};
		a.addChildren(b);
		dw.addChildren(a);

		var d = new Dg.Node(230, 0, 200, 200);
		var e = new Dg.Node(20, 20, 100, 100);
		e.renderContent = function(wrap) {
			wrap.append("<div>eeeeeee</div>");
		};
		d.addChildren(e);
		dw.addChildren(d);
		// dw.addChildren(new Dg.Node(430, 303));

		// console.log(_.pairs(a.getChildren()));
		// console.log(_.pairs(dw.getTopNodes()));

		// a.removeChildren(b);
		// dw.removeNodes(a);
		// console.log(_.pairs(a.getChildren()));
		// console.log(_.pairs(dw.getTopNodes()));

		// var TN = Dg.extendNode(function() {
		// 	this.aa = function(){
		// 		console.log(2);
		// 	};
		// 	this.getChildren = function() {
		// 		return 3;
		// 	};
		// 	this.renderContent = function(wrap) {
		// 		wrap.append("<div>xxxxx</div>");
		// 	};
		// });
		// var n = new TN(20, 20, 100, 100);
		// a.addChildren(n);
		// alert(n.getChildren());
		// alert(Dg.isNode(n));
		// alert(n instanceof TN);


		// console.log(_.pairs(a));
		var object = {};
		_.extend(object, Backbone.Events);
		object.on("alert", function(msg) {
  			// alert("Triggered " + msg);
		});
		object.trigger("alert", "an event");

	}
);