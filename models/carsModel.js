const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
	name: 		{ type: String, required: true },
	hasCar: 	{ type: Boolean, required: true },
	license: 	{ type: String },
	barcode: 	{ type: String },
	lat: 		{ type: Number },
	lng: 		{ type: Number },
	time: 		{ type: Number, default: Date.now()/1000}
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
