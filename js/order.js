// Page load
$(document).ready(function() {

	// Variables
	var order_form = $("#new_order");
	var stat = $(".save_stat");
	var socket = io.connect("http://127.0.0.1:8080");
	var order_container = $("#order_table");

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
			update_stat(data.stat);
		});

		return false; // Stop the form from navigating after it's been submitted

	});

	// Listening for the old orders
	socket.on('orders', function(data) {
 
		// Adding order to page
		var i = 0;
		var len = data.length;

		while (i < len) {
			order_container.append("<tr colspan='2'><td>" + data[i].cli_name + " ordered a " + data[i].cli_order + "</td><td width='50px'><span class='glyphicon glyphicon-thumbs-up del_order' data-id='" + data[i]._id + "'></span></tr>");
			i = i + 1;
		}

	});

	// Listening for click on the Delete button
	$("#order_table").delegate('.del_order', 'click', function() {
		// Getting the order id
		var oid = $(this).attr('data-id');
		// Deleting the order
		socket.emit('delete_order', {order_id: oid});

	});

});

function update_stat (text_dis) {
	$(".save_stat").text(text_dis).show().delay(1000).fadeOut();
	$("#cli_name").val("");
	$("#cli_order").val("");
}