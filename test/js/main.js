var webPaths = {
        "jquery": "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min",
        "underscore": "//underscorejs.org/underscore-min",
        "backbone": "//backbonejs.org/backbone-min",
    	"draggabilly": "//draggabilly.desandro.com/draggabilly.pkgd",
        "drag": "../../src/j-drag"
};
var localPaths = {
    "jquery": "../bower_components/jquery/jquery",
    "underscore": "../bower_components/underscore/underscore",
    "backbone": "../bower_components/backbone/backbone",

    // "classie/classie": "../bower_components/classie/classie", 
	// "eventEmitter/eventEmitter": "../bower_components/eventEmitter/eventEmitter", 
	// "eventie/eventie": "../bower_components/eventie/eventie", 
	// "get-size/get-size": "../bower_components/get-size/get-size", 
	// "get-style-property": "../bower_components/get-style-property/get-style-property",
	// "get-style-property/get-style-property": "../bower_components/get-style-property/get-style-property",
    "draggabilly": "../bower_components/draggabilly/draggabilly",
    "drag": "../../src/j-drag"
};
require.config({

    baseUrl: 'bower_components',

    deps: ["main"],

    paths: localPaths,

    shim: {
        "jquery": {
            exports: "$"
        },
        "underscore": {
            exports: "_"
        },
        "backbone": {
            exports: "Backbone",
            deps: ["underscore", "jquery"]
        },
        // "draggabilly": {
        //     exports: "Draggabilly",
        //     deps: [
        //     	"classie", 
        //     	"eventEmitter", 
        //     	"eventie", 
        //     	"get-size",
        //     	"get-style-property"
        //     ]
        // },
        "drag": [
            "draggabilly"
        ]
    }

});

require(
	[
		"backbone",
		"draggabilly"
	],
    function(Backbone, Draggabilly) {
        var drags = document.querySelectorAll(".j-drag");
        console.log(drags);
        var jdrags = [];
        for(var i=0; i < drags.length; i++) {
            var drag = drags[i];
            var containment = false;
            if (drag.parentElement.className
                && drag.parentElement.className.indexOf("j-drag") >= 0) {
                console.log(drag.parentElement.className);
                containment = drag.parentElement;
            }
            var jdrag = new Draggabilly(drag, { containment: containment });
            jdrags.push(jdrag);
        }
    }
);