const mongoose = require('mongoose');
const Purchase = mongoose.model('Purchase');
const {requestFilters, validatePopulate, populatePurchaseRequest}=require('../resource/filters')

//Metodo para crear una solicitud
function createPurchase(req, res, next) {

    let purch = new Purchase(req.body);

    purch.save().then(newPurchase => {
        res.status(200).send(newPurchase)
    }).catch(next)

}


//Método para recuperar solicitud by ID
function getPurchase(req, res, next) {

    if(req.params.id){
        Purchase.findById(req.params.id).then(purchase => {
            res.send(purchase)
        }).catch(next)
    } else {
       
        Purchase.find(requestFilters(req.query)).populate(populatePurchaseRequest(validatePopulate(req.query)))
        .then(purchase => {
            res.send(purchase)
        }).catch(next)
       
    }
}

// Método para obtener solicitudes de un usuario
function  getPurchaseByUser(req, res, next){
    Purchase.find({ idUser: req.params.id})
    .then(requests => res.send(requests))
    .catch(next)
}


//Método para editar una solicitud
function editPurchase(req, res, next) {

    Purchase.findById(req.params.id).then(purchase => {
        if(!purchase) {return res.sendStatus(401); }
        let newData = req.body

        if(typeof newData.status !== 'undefined')
            purchase.status = newData.status

        if(typeof newData.relaseDate !== 'undefined')
            purchase.relaseDate = newData.relaseDate

        if(typeof newData.deliveryDate !== 'undefined')
            purchase.deliveryDate = newData.deliveryDate

        purchase.save().then(updatePurchase => {
            res.status(201).json(updatePurchase.publicData())
        }).catch(next)
    }).catch(next)

}

//M étodo para eliminar una solicitud
function deletePurchase(req, res, next){

    Purchase.findOneAndDelete({_id: req.params.id})
    .then(r => res.status(200).send("Petición eliminada"))
    .catch(next)

}

module.exports = {
    getPurchase,
    getPurchaseByUser,
    createPurchase,
    editPurchase,
    deletePurchase
}