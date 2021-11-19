const moongose = require('mongoose');
const Videogame = moongose.model('Videogame');
const {videogameFilters,populateVideogame,sortVideogame,limit}=require('../resource/filters')

function createVideogame(req, res, next) {

    let videogame = new Videogame(req.body)

    videogame.save().then( createdVideogame => {
        res.status(200).send(createdVideogame)
    }).catch(next)

}

function getVideogame(req, res, next) {

    if (req.params.id) {
        Videogame.findById(req.params.id).then(videogame => {
            res.send(videogame)
        }).catch(next)

    } else {
        Videogame.find(videogameFilters(req.query))
        .limit(limit(req.query))
        .sort(sortVideogame(req.query))
        .populate(populateVideogame(req.query))
        .then(videogames => {
            res.send(videogames)
        }).catch(next)
    }
}

function getTitles(req, res, next) {
    const titles = []

    Videogame.find().then(videogames => {
        videogames.forEach(videogame => { titles.push(videogame.getTitle()) })
        res.send(titles)
    }).catch(next)
}

function modifyVideogame(req, res, next) {

    Videogame.findById(req.params.id).then(videogame => {

        if (!videogame) {
            return res.sendStatus(401);
        }

        let newInfo = req.body

        if (typeof newInfo.name !== 'undefined')
            videogame.name = newInfo.name

        if (typeof newInfo.genre !== 'undefined')
            videogame.genre = newInfo.genre

        if (typeof newInfo.ageCategory !== 'undefined')
            videogame.ageCategory = newInfo.ageCategory

        if (typeof newInfo.languages !== 'undefined')
            videogame.languages = newInfo.languages

        if (typeof newInfo.releaseDate !== 'undefined')
            videogame.releaseDate = newInfo.releaseDate

        if (typeof newInfo.synopsis !== 'undefined')
            videogame.synopsis = newInfo.synopsis

        if (typeof newInfo.platforms !== 'undefined')
            videogame.platforms = newInfo.platforms

        videogame.save().then( updated => {
            res.status(200).json(updated.publicData())
        }).catch(next)

    }).catch(next)
}

function deleteVideogame(req, res, next) {
   
    Videogame.findOneAndDelete({
        _id: req.params.id
    }).then(r => {
        res.status(200).send(`El videojuego ${r.name} fue eliminado`);
    }).catch(next)
}

module.exports = {
    createVideogame,
    getVideogame,
    modifyVideogame,
    deleteVideogame,
    getTitles
};