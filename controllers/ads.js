const mongoose = require('mongoose');
const Ad = mongoose.model('Ad');

function createAd(req, res, next) {
    let ad = new Ad(req.body);

    ad.save().then(newAd => {
        res.status(200).send(newAd)
    }).catch(next)
}

function getAd(req, res, next) {
    if (req.params.id) {
        Ad.findById(req.params.id)
            .then(ad => res.send(ad))
            .catch(next)
    } else {
        Ad.find()
            .then(ads => res.send(ads))
            .catch(next)
    }
}

function editAd(req, res, next) {
    Ad.findById(req.params.id).then(ad => {
        if (!ad) { return res.sendStatus(401); }
        let newData = req.body

        if (typeof newData.price !== 'undefined')
            ad.price = newData.price

        if (typeof newData.description !== 'undefined')
            ad.description = newData.description

            if (typeof newData.status !== 'undefined')
            ad.status = newData.status
        
        ad.save().then(updatedAd => {
            res.status(201).json(updatedAd.publicData())
        }).catch(next)
    }).catch(next)
}

function deleteAd(req, res, next) {
    Ad.findOneAndDelete({_id: req.params.id})
    .then(r => res.status(200).send("Anuncio eliminado"))
    .catch(next)
}

module.exports = {
    createAd,
    getAd,
    editAd,
    deleteAd
}