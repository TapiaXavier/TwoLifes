const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
    idAdvertiser: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    idVideogame: {type: mongoose.Schema.Types.ObjectId, ref: 'Videogame', required: true},
    idPlatform: {type: mongoose.Schema.Types.ObjectId, ref: 'Platform', required: true},
    price: {type: Number, min: 0, required: true},
    condition: {type: String, enum: ['Nuevo', 'Usado']},
    description: {type: String, required: true},
    status: {type: String, enum: ['En venta', 'Vendido']},
    mainImgURL: {type: String, required: true},
    optionalImgsURL:[String]
}, {timestamps: true, collection: 'ads_col'})

let filters=['publishDate','condition','videogame','platform','price','status','advertiser','_advertiser','sort','limit'];
let populates=['videogame','advertiser','platform'];
let sorts=['status','price','publishDate']

AdSchema.statics.isFiltersAllowed=function(filter){
    return  filters.includes(filter);
  }
AdSchema.statics.filtersAllowed=function(){
    return  filters;
}

AdSchema.statics.isPopulateAllowed=function(populate){
    return  populates.includes(populate);
}
AdSchema.statics.populateAllowed=function(){
    return  populates;
}

AdSchema.statics.isSortAllowed=function(sort){
    return  sorts.includes(sort);
}
AdSchema.statics.sortAllowed=function(){
    return  sorts;
}

mongoose.model('Ad', AdSchema);