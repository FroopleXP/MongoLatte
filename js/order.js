// Page load
$(document).ready(function() {

	// Variables
	var order_form = $("#new_order");
	var stat = $(".save_stat");
	var socket = io.connect("http://127.0.0.1:8080");
	var order_container = $("#order_content");

	// On form submit
	order_form.on('submit', function() {

		// Changing the status
		stat.text("Saving...").show();

		// Form variables
		var cli_name = $("#cli_name").val();
		var cli_order = $("#cli_order").val();

		// Sending the order
		socket.emit('new_order', {
			cli_name: cli_name,
			cli_order: cli_order
		});

		// Listening for response
		socket.on('order_stat', function(data) {
			stat.text(data.stat).delay(1000).fadeOut();
			$("#cli_name").val("");
			$("#cli_order").val("");
		});

		return false; // Stop the form from navigating after it's been submitted

	});

	// Listening for the old orders
	socket.on('orders', function(data) {
 
		// Adding order to page
		var i = 0;
		var len = data.length;

		while (i < len) {
			order_container.append(data[i].cli_name + " ordered a " + data[i].cli_order + "<br />");
			i = i + 1;
		}

	});

});