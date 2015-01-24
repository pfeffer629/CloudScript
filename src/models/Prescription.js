var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var prescriptionSchema = new Schema({
  name:     String,
  qty:      Number,
  ordered:  Boolean,
  read:     Boolean
});

module.exports = mongoose.model('prescription', prescriptionSchema);
