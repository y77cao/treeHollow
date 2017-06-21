var mongoose = require('mongoose');

var stkSchema = new mongoose.Schema({
  name: String,
  uniID: String,
  stkContent: String,
  stkTime: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Stickers', stkSchema);

//TODO: replies schema???