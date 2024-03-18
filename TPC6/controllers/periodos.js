const mongoose = require('mongoose');
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

module.exports.insert = Periodo => {
    if ((Periodo.find({id: Periodo.id}).exec()) != null) {
        var novo = new Periodo(Periodo)
        return novo.save()
    }
    else {
        return null
    }
}

module.exports.update = (id, Periodo) => {
    return Periodo
        .findOneAndUpdate({id: id}, Periodo, {new: true})
        .exec()
}

module.exports.delete = id => {
    return Periodo
        .deleteOne({id: id})
        .exec()
}