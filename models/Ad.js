const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
    idAdvertiser: {type: mongoose.Schema.Types.ObjectId, ref: 'users_col', required: true},
    idVideogame: {type: mongoose.Schema.Types.ObjectId, ref: 'games_col', required: true},
    idPlatform: {type: mongoose.Schema.Types.ObjectId, ref: 'platform_col', required: true},
    price: {type: Number, min: 0, required: true},
    description: {type: String, required: true},
    status: {type: String, enum: ['En venta', 'Vendido']}
}, {timestamps: true, collection: 'ads_col'})

AdSchema.methods.publicData = function() {
    return {
        advertiser: this.idAdvertiser,
        videogame: this.idVideogame,
        platform: this.idPlatform,
        price: this.price,
        description: this.description,
        status: this.status
    }
}

mongoose.model('Ad', AdSchema);