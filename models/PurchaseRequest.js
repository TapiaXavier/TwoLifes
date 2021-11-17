const mongoose = require('mongoose');

const PurchaseRequestSchema = new mongoose.Schema({
    idAd: {type: mongoose.Schema.Types.ObjectId, ref: 'Ad', required: true},
    idRequester: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    status: {type: String, enum: ['Aceptada', 'En espera', 'Rechazada'], required: true},
    deliveryDate: {type: Date}
}, {timestamps: true, collection: 'purchaserequests_col'} )

let filters=['deliveryDate','status','advertiser','user','_user','orderBy','limit'];
let populates=['user','advertiser'];
let orders=['status','deliveryDate']

PurchaseRequestSchema.statics.isFiltersAllowed=function(filter){
    return  filters.includes(filter);
  }
PurchaseRequestSchema.statics.filtersAllowed=function(){
    return  filters;
}

PurchaseRequestSchema.statics.isPopulateAllowed=function(populate){
    return  populates.includes(populate);
}
PurchaseRequestSchema.statics.populateAllowed=function(){
    return  populates;
}


PurchaseRequestSchema.statics.isOrderByAllowed=function(order){
    return  orders.includes(order);
}
PurchaseRequestSchema.statics.orderByAllowed=function(){
    return  orders;
}
 
mongoose.model('Purchase', PurchaseRequestSchema);

/*
class PurchaseRequest {
    constructor(idAd, idUser, relaseDate, status, deliveryDate) {
        this.idAd = idAd;
        this.idUser = idUser;
        this.relaseDate = relaseDate;
        this.status = status;
        this.deliveryDate = deliveryDate;
    }
}

module.exports = PurchaseRequest;
*/

