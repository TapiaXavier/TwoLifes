const router = require('express').Router();

const {
    createVideogame,
    getVideogame,
    modifyVideogame,
    deleteVideogame
} = require('../controllers/videogames')

router.get('/', getVideogame)
router.get('/:id', getVideogame)
router.post('/', createVideogame)
router.put('/:id', modifyVideogame)
router.delete('/:id', deleteVideogame)

module.exports = router;