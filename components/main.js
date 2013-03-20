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

		var ct = {
			'margin-right': 'auto',
			'margin-left': 'auto',
			'width': '1000px'
		};
		var dg = $('#drag');
		//dg.empty();
		dg.css(ct);
		dg.css({
			'height': '600px',
			'overflow-y': 'scroll'
		});
		var pl = $('#panel');
		pl.css({
			'height': '1000px',
			'background': '#FFFFFF url(img/bg.png) repeat 51% 0%'
		});
		pl.text('ccc');
		var bc = $('#breadcrumb');
		bc.css(ct);

	}
);