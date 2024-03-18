const mongoose = require('mongoose');
var Compositor = require ('../models/compositores');

module.exports.list = () => {
    return Compositor
        .find()
        .sort({nome: 1})
        .exec()
}

module.exports.lookUp = id => {
    return Compositor
        .findOne({id: id})
        .exec()
}

module.exports.compositorByPeriido = periodo => {
    return Compositor
        .find({periodo: periodo})
        .exec()
}

module.exports.insert = Compositor => {
    if ((Compositor.find({id: Compositor.id}).exec()) != null) {
        var novo = new Compositor(Compositor)
        return novo.save()
    }
    else {
        return null
    }
}

module.exports.update = (id, Compositor) => {
    return Compositor
        .findOneAndUpdate({id: id}, Compositor, {new: true})
        .exec()
}

module.exports.delete = id => {
    return Compositor
        .deleteOne({id: id})
        .exec()
}