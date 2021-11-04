const mongoose = require('mongoose');

const PurchaseRequestSchema = new mongoose.Schema({
    idAdvertiser: {type: mongoose.Schema.Types.ObjectId, ref: 'Ad', required: true},
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    relaseDate: {type: Date, required: true},
    status: {type: String, enum: ['Aceptada', 'En espera', 'Negada']},
    deliveryDate: {type: Date}
}, {timestamps: true, collection: 'purchaserequests_col'} )

let filters=['relaseDate','deliveryDate','status','advertiser','user','_user','orderBy','limit'];
let populates=['user','advertiser'];
let orders=['relaseDate','status','deliveryDate']

PurchaseRequestSchema.methods.publicData = function(){
    return {
        advertiser: this.idAdvertiser,
        user: this.idUser,
        relaseDate: this.relaseDate,
        status: this.status,
        deliveryDate: this.deliveryDate
    }
    
}

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

