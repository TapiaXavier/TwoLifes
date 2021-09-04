const Videogame = require('../models/Videogame')


function createVideogame(req, res){
    let game = new Videogame(req.body)
    res.status(201).send(game)
}

function getVideogames(req, res){
    let gameOne = new Videogame('Mario Bros','Plataforms','All ages',['English','Spanish'],'Un juego de plataformas muy chido','1');
    let gameTwo = new Videogame('PES 2021','Sports','All ages',['English','Spanish'],'El mejor juego de futbol','1');
    res.send([gameOne, gameTwo]);
}

function modifyVideogame(req, res){
    let gameOne = new Videogame('The Legend Of Zelda: Ocarina Of Time','Adventures',['English','Spanish'],'Link necesita salvar a Zelda')
    var modifications = req.body
    gameOne = { ...gameOne, ...modifications }
    res.send(gameOne)
}

function deleteVideogame(req, res){
    res.status(200).send(`Videogame ${req.params.name} deleted`);
}

module.exports = {
    createVideogame,
    getVideogames,
    modifyVideogame,
    deleteVideogame
};

