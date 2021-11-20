const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const VideogameSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    genre: {
        type: [String],
    },
    ageCategory: {
        type: String,
        enum: ['A - (Todo publico)', 'B - ( + 12 Años)',
            'B15 - (+ 15 Años)', 'C - (Adultos +18)',
            'D - (Extremo y contenido adulto)', ''
        ],
    },
    languages: {
        type: [String],
    },
    releaseDate: {
        type: Date,
    },
    synopsis: {
        type: String,
    },
    platforms:[ 
            {type: mongoose.Schema.Types.ObjectId, 
                ref: 'Platform', 
                required: true
            }
    ]
}, {
    timestamps: true,
    collection: 'videogames_col'
});

let filters=['releaseDate','name','platform','language','category','genre','synopsis','sort','limit'];
let populates=['platform'];
let sorts=['category','name','releaseDate']

// mongoose.Schema.Types.String.checkRequired(v => v != null);

VideogameSchema.methods.publicData = function () {
    return {
        name: this.name,
        genre: this.genre,
        ageCategory: this.ageCategory,
        languages: this.languages,
        releaseDate: this.releaseDate,
        synopsis: this.synopsis,
        platforms: this.platforms,
    };
};

VideogameSchema.methods.getTitle = function () {
    return{
        title: this.name,
        id: this._id
    }
}

VideogameSchema.statics.isFiltersAllowed=function(filter){
    return  filters.includes(filter);
}
VideogameSchema.statics.filtersAllowed=function(){
    return  filters;
}

VideogameSchema.statics.isPopulateAllowed=function(populate){
    return  populates.includes(populate);
}
VideogameSchema.statics.populateAllowed=function(){
    return  populates;
}

VideogameSchema.plugin(uniqueValidator, {
    message: "El videojuego ya existe en nuestra base de datos"
});


VideogameSchema.statics.isSortAllowed=function(sort){
    return  sorts.includes(sort);
}
VideogameSchema.statics.sortAllowed=function(){
    return  sorts;
}

mongoose.model('Videogame', VideogameSchema);