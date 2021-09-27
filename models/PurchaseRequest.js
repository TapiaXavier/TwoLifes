const mongoose = require('mongoose');

const PurchaseRequestSchema = new mongoose.Schema({
    idAdvertiser: {type: mongoose.Schema.Types.ObjectId, ref: 'user_col', required: true},
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'user_col', required: true},
    relaseDate: {type: Date, required: true},
    status: {type: String, enum: ['Aceptada', 'En espera', 'Negada']},
    deliveryDate: {type: Date}
}, {timestamps: true, collection: 'purchaserequests_col'} )

PurchaseRequestSchema.methods.publicData = function(){
    return {
        advertiser: this.idAdvertiser,
        user: this.idUser,
        relaseDate: this.relaseDate,
        status: this.status,
        deliveryDate: this.deliveryDate
    }
    
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

