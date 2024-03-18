var mongoose = require('mongoose');

var periodoSchema = new mongoose.Schema({
    id : String
}, {versionKey: false});

module.exports = mongoose.model('periodo', periodoSchema);