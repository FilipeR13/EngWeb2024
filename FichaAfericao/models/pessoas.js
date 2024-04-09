const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Morada (Address) schema
const moradaSchema = new Schema({
    cidade: String,
    distrito: String
});

// Define the Atributos (Attributes) schema
const atributosSchema = new Schema({
    fumador: Boolean,
    gosta_cinema: Boolean,
    gosta_viajar: Boolean,
    acorda_cedo: Boolean,
    gosta_ler: Boolean,
    gosta_musica: Boolean,
    gosta_comer: Boolean,
    gosta_animais_estimacao: Boolean,
    gosta_dancar: Boolean,
    comida_favorita: String
});

// Define the Partido Politico (Political Party) schema
const partidoPoliticoSchema = new Schema({
    party_abbr: String,
    party_name: String
});

// Define the Pessoa (Person) schema
const pessoaSchema = new Schema({
    nome: String,
    idade: Number,
    sexo: String,
    morada: moradaSchema,
    descricao: String,
    profissao: String,
    partido_politico: partidoPoliticoSchema,
    religiao: String,
    desportos: [String],
    animais: [String],
    figura_publica_pt: [String],
    marca_carro: String,
    destinos_favoritos: [String],
    atributos: atributosSchema,
    id: String
});

module.exports = mongoose.model('pessoas', pessoaSchema);
