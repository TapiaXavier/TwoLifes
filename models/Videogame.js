class Videogame {
    constructor(name, gameType, ageCategory, languages, releaseDate, synopsis, idPlataform){
        this.name = name;
        this.gameType = gameType;
        this.ageCategory = ageCategory;
        this.languages = languages;
        this.releaseDate = releaseDate;
        this.synopsis = synopsis;
        this.idPlataform = idPlataform;
    }
}

module.exports = Videogame;