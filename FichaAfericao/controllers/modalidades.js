var Modalidades = require ('../models/modalidades');
var Modalidades = require ('../models/pessoas');

module.exports.list = () => {
    return Modalidades
        .find()
        .sort({nome: 1})
        .select({nome: 1})
        .exec()
}

module.exports.lookUp = nome => {
    list_person =  Modalidades
        .findOne({nome: nome})
        .select({pessoas: 1})
        .exec()
    
    for (var i = 0; i < list_person.length; i++) {
        list_person[i] = Pessoas.findOne({_id: list_person[i]}).exec()
    }
    return list_person
}

module.exports.insert = modalidade => {
    if ((Modalidades.findOne({nome: modalidade.nome}).exec()) != null) {
        "Adding modalidade..."
        var novo = new Modalidades(modalidade)
        return novo.save()
    }
    else {
        return null
    }
}

module.exports.addPerson = (nome, person) => {
    console.log("Adding person to modalidade...")
    return Modalidades
        .findOneAndUpdate({nome: nome}, {$push: {pessoas: person.id}})
        .exec()
}