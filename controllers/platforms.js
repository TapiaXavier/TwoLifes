const mongoose = require('mongoose');
const Plaform = mongoose.model('Platform');

function getPlatform(req, res, next) {
    if (req.params.id) {
        Plaform.findById(req.params.id)
            .then(platform => res.send(platform))
            .catch(next)
    } else {
        Plaform.find()
            .then(platforms => {
                res.send(platforms)
            })
            .catch(next)
    }
}

function addPlatform(req, res, next) {
    let platform = new Plaform(req.body);

    platform.save().then(newPlaform => {
        res.status(200).send(newPlaform)
    }).catch(next)
}

function editPlatform(req, res, next) {
    Plaform.findById(req.params.id).then(plat => {
        if (!plat) { return res.sendStatus(401); }
        let newData = req.body

        if (typeof newData.platform !== 'undefined')
            plat.platform = newData.platform

        ad.save().then(updatedPlat => {
            res.status(201).json(updatedPlat)
        }).catch(next)
    }).catch(next)
}

function deletePlatform(req, res, next) {
    Plaform.findOneAndDelete({ _id: req.params.id })
        .then(r => res.status(200).send("Plataforma eliminada"))
        .catch(next)
}

module.exports = {
    getPlatform,
    addPlatform,
    editPlatform,
    deletePlatform
}