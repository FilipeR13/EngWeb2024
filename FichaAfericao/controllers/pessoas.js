var pessoas = require ('../models/pessoas');

module.exports.list = () => {
    return pessoas
        .find()
        .exec()
}

module.exports.lookUp = id => {
    return pessoas
        .findOne({id: id})
        .exec()
}

module.exports.insert = pessoa => {
    if ((pessoas.findOne({id: pessoa.id}).exec()) != null) {
        console.log("Adding person...")
        var novo = new pessoas(pessoa)
        return novo.save()
    }
    else {
        return null
    }
}

module.exports.update = (id, pessoa) => {
    return pessoas
        .findOneAndUpdate({id: id}, pessoa, {new: true})
        .exec()
}

module.exports.delete = id => {
    return pessoas
        .deleteOne({id: id})
        .exec()
}