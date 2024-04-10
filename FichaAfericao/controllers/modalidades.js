var Modalidades = require ('../models/modalidades');
var Pessoas = require ('../models/pessoas');

module.exports.list = () => {
    return Modalidades
        .find()
        .sort({nome: 1})
        .select({nome: 1})
        .exec()
}

module.exports.lookUp = async (nome) => {
    try {
        const modalidade = await Modalidades.findOne({ nome: nome }).select('pessoas').exec();

        if (!modalidade) {
            return []; // Return an empty array if modalidade is not found
        }

        const list_person_ids = modalidade.pessoas;

        console.log(list_person_ids);

        const list_person = await Promise.all(list_person_ids.map(async (personId) => {
            return await Pessoas.findOne({ id: personId }).exec();
        }));

        console.log(list_person);
        return list_person;
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error
    }
};

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