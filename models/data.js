const mongoose = require('mongoose');

const dbSchema = new mongoose.Schema ({
	name: {type: String, required: "Name can not be blank!"},
	doneness: {type: String, required: "Name can not be blank!"},
	cut: {type: String, required: "Cut can not be blank!"}
})

const Steak = mongoose.model('Steaks', dbSchema);

module.exports = Steak 