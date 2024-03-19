var Periodo = require ('../models/periodos');

module.exports.list = () => {
    return Periodo
        .find()
        .sort({id: 1})
        .exec()
}

module.exports.lookUp = id => {
    return Periodo
        .findOne({id: id})
        .exec()
}

module.exports.insert = periodo => {
    if ((Periodo.find({id: periodo.id}).exec()) != null) {
        var novo = new Periodo(periodo)
        return novo.save()
    }
    else {
        return null
    }
}

module.exports.update = (id, periodo) => {
    return Periodo
        .findOneAndUpdate({id: id}, periodo, {new: true})
        .exec()
}

module.exports.delete = id => {
    return Periodo
        .deleteOne({id: id})
        .exec()
}