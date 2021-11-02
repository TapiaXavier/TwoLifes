const router = require('express').Router();
const filters=require('../middleware/filters')
const populate=require('../middleware/populate')
const {
    createVideogame,
    getVideogame,
    modifyVideogame,
    deleteVideogame
} = require('../controllers/videogames')

router.get('/',[filters,populate], getVideogame)
router.get('/:id', getVideogame)
router.post('/', createVideogame)
router.put('/:id', modifyVideogame)
router.delete('/:id', deleteVideogame)

module.exports = router;