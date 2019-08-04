const mongoose = require('mongoose');

const dbSchema = new mongoose.Schema ({
	steakname: {type: String, required: "Name can not be blank!"},
	doneness: {type: String, required: "Name can not be blank!"},
	rating: {type: Number, required: "Cut can not be blank!"}
})

const Steak = mongoose.model('Steak', dbSchema);

module.exports = Steak 