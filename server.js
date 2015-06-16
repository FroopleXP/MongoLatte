// Grabbing the dependencies
var io = require('socket.io').listen(8080).sockets;
var mongojs = require('mongojs');
var db = mongojs('localhost/mongolatte', ['orders']);

console.log("Order server started...");

// New connection
io.on('connection', function(socket) {
	// Alerting the server
	console.log("User " + socket.id + " has connected.");

	// New order
	socket.on('new_order', function(data) {
		// Getting the order information
		var cli_name = data.cli_name;
		var cli_order = data.cli_order;
		var add_order = add_order(cli_name, cli_order);

		// Spitting the new order to the server
		console.log("A new order for: " + cli_name);

		// Saving the order
		db.orders.save(new_order, function(err, saved_order) {
			if (err || !saved_order) {
				// There was an error
				console.log("There was an error saving the order..." + err);
				// Sending the error back to the user
				socket.emit('order_stat', {stat: "There was an error: " + err});
			} else {
				// All good
				console.log("Record for " + saved_order.cli_name + " was saved successfully!");
			}
		});

	});

	// Disconnect
	socket.on('disconnect', function() {
		// Alerting the server
		console.log("User " + socket.id + " has disconnected.");

	});

});

// Object for storing the order
function add_order(cli_name, cli_order) {
	this.cli_name = cli_name;
	this.cli_order = cli_order;
}