//(function(){
//  //alert($);
//})();

//!function ($) {
//  //alert($);
//}(window.jQuery);

var Drag = function Drag(canvas) {

  var $ = window.jQuery;

  // get a reference to the canvas we'll be working with:
  // var canvas = document.getElementById("testCanvas");

  // create a stage object to work with the canvas. This is the top level node in the display list:
  var stage = new createjs.Stage(canvas);

  // Create a new Text object:
  var text = new createjs.Text("Hello World!", "36px Arial", "#777");

  var square = new createjs.Shape();
  square.graphics.beginFill("white").drawRect(-50, -50, 100, 100);
  square.x = 250;
  square.y = 100;
  square.name = "square";
  square.addEventListener("click", function(evt){
    square.graphics.beginStroke("red");
  });

  var label = new createjs.Text("drag me", "bold 14px Arial", "black");
  label.textAlign = "center";
  label.x = 250;
  label.y = 100;

  var dragger = new createjs.Container();
  dragger.x = dragger.y = 100;
  dragger.addChild(square, label);
  stage.addChild(dragger);

  // add the text as a child of the stage. This means it will be drawn any time the stage is updated
  // and that it's transformations will be relative to the stage coordinates:
  // stage.addChild(text);

  // position the text on screen, relative to the stage coordinates:
  text.x = 360;
  text.y = 200;

  // call update on the stage to make it render the current display list to the canvas:
  stage.update();
}