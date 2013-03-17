require(
	[
		"jquery/jquery", 
		"underscore/underscore", 
		"bootstrap/js/bootstrap", 
		"holder/holder", 
		"backbone/backbone"
	],
	function() {
		//alert( $('body').text() );
		var object = {};
		_.extend(object, Backbone.Events);
		object.on("alert", function(msg) {
  			//alert("Triggered " + msg);
		});
		object.trigger("alert", "an event");
	}
);