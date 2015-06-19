// Grabbing the dependencies
var io = require('socket.io').listen(8080).sockets;
var mongo = require('mongodb').MongoClient;

// Connecting to MongoDB
mongo.connect('mongodb://127.0.0.1/mongolatte', function(err, db) {
	// Checking for connection error
	if (err) {
		throw err; // Spitting out the error to the server
	} else {
		// New connection
		io.on('connection', function(socket) {
			// Alerting the server
			console.log("User " + socket.id + " has connected.");

			// Adding the orders collection
			var col = db.collection('orders');

			// Sending the orders to the new user
			col.find().sort({_id: 1}).toArray(function(err, res) {
				// Checking for errors
				if (err) {
					throw err; // Sending the error the server
				} else {
					socket.emit('orders', res); // Sending the orders to the user
				}
			});

			// New order
			socket.on('new_order', function(data) {
				// Getting the order information
				var cli_name = data.cli_name;
				var cli_order = data.cli_order;

				// Spitting the new order to the server
				console.log("A new order for: " + cli_name);

				// Saving the order
				col.insert({cli_name: cli_name, cli_order: cli_order}, function() {
					console.log('Order for: ' + cli_name + " has been inserted!");
				});

				// Sending response
				socket.emit('order_stat', {stat: "Order added!"});

			});

			// Disconnect
			socket.on('disconnect', function() {
				// Alerting the server
				console.log("User " + socket.id + " has disconnected.");

			});

			// Delete order
			socket.on('delete_order', function(data) {
				// Getting the ID from the request
				var id = data.oid;
				// Removing from the database
				col.remove({"_id": "'" + id + "'"});
				// Sending response
				socket.emit('order_stat', {stat: "Removed"});

			});

		});
	}
});

console.log("Order server started...");

// Object for storing the order
function add_order(cli_name, cli_order) {
	this.cli_name = cli_name;
	this.cli_order = cli_order;
}