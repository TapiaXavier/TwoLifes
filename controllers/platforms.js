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

module.exports = {
    getPlatform,
    addPlatform
}