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
        required: true
    },
    ageCategory: {
        type: String,
        enum: ['A - (Todo publico)', 'B - ( + 12 Años)',
            'B15 - (+ 15 Años)', 'C - (Adultos +18)',
            'D - (Extremo y contenido adulto)'
        ],
        required: true
    },
    languages: {
        type: [String],
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    plataforms: {
        type: [String],
        required: true
    }
}, {
    timestamps: true,
    collection: 'videogames_col'
});

VideogameSchema.methods.publicData = function () {
    return {
        name: this.name,
        genre: this.genre,
        ageCategory: this.ageCategory,
        languages: this.languages,
        releaseDate: this.releaseDate,
        synopsis: this.synopsis,
        plataforms: this.plataforms,
    };
};

VideogameSchema.plugin(uniqueValidator, {
    message: "El videojuego ya existe en nuestra base de datos"
});

mongoose.model('Videogame', VideogameSchema);