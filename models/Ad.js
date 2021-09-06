class Ad {
    constructor(idUser, IdVideogame, idPlatform, date, price, description) {
        this.idUser = idUser
        this.IdVideogame = IdVideogame
        this.idPlatform = idPlatform
        this.date =  date
        this.price = price
        this.description = description
    }
}

module.exports = Ad;