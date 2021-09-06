const router = require('express').Router();

const {
    createVideogame,
    getVideogames,
    modifyVideogame,
    deleteVideogame
} = require('../controllers/videogames')

router.get('/', getVideogames)
router.post('/', createVideogame)
router.put('/:id', modifyVideogame)
router.delete('/:id', deleteVideogame)