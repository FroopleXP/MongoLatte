// Page load
$(document).ready(function() {

	// Variables
	var order_form = $("#new_order");
	var socket = io.connect("http://127.0.0.1:8080");

	// On form submit
	order_form.on('submit', function() {

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
			alert(data.stat);
		});

		return false; // Stop the form from navigating after it's been submitted

	});

});