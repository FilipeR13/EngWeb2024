const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Columbofilia (Pigeon Racing) schema
const modalidadesSchema = new Schema({
    nome: String,
    pessoas: [String]
});

module.exports = mongoose.model('modalidades', modalidadesSchema);
