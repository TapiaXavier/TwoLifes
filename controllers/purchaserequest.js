const mongoose = require('mongoose');
const Purchase = mongoose.model('Purchase');
const {requestFilters,populatePurchaseRequest,sortPurchase,limit}=require('../resource/filters')

//Metodo para crear una solicitud
function createPurchase(req, res, next) {

    let purch = new Purchase(req.body);

    purch.save().then(newPurchase => {
        res.status(200).send(newPurchase)
    }).catch(next)

}


//Método para recuperar solicitudes
function getPurchase(req, res, next) {

    if(req.params.id){
        Purchase.findById(req.params.id).then(purchase => {
            res.send(purchase)
        }).catch(next)
    } else {
       
        Purchase.find(requestFilters(req.query))
        .limit(limit(req.query))
        .sort(sortPurchase(req.query))
        .populate(populatePurchaseRequest(req.query))
        .then(purchase => {
            res.send(purchase)
        }).catch(next)
       
    }
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
    createPurchase,
    editPurchase,
    deletePurchase
}