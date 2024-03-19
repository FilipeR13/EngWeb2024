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

module.exports.compositorByPerido = periodo => {
    return Compositor
        .find({periodo: periodo})
        .exec()
}

module.exports.insert = compositor => {
    if ((Compositor.findOne({id: compositor.id}).exec()) != null) {
        var novo = new Compositor(compositor)
        return novo.save()
    }
    else {
        return null
    }
}

module.exports.update = (id, compositor) => {
    return Compositor
        .findOneAndUpdate({id: id}, compositor, {new: true})
        .exec()
}

module.exports.delete = id => {
    return Compositor
        .deleteOne({id: id})
        .exec()
}