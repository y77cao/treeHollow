var mongoose = require('mongoose');

var user = new mongoose.Schema({
	name: Stirng,
	email: String,
	password: String,
	uniID: String
});
module.exports = mongoose.model('Users',user);