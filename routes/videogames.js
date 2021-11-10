const router = require('express').Router();
const filters=require('../middleware/filters')
const populate=require('../middleware/populate')
const sort= require('../middleware/sort')
const {
    createVideogame,
    getVideogame,
    modifyVideogame,
    deleteVideogame,
    getTitles
} = require('../controllers/videogames')

router.get('/',[filters,populate,sort], getVideogame)
router.get('/titles', getTitles)
router.get('/:id', getVideogame)
router.post('/', createVideogame)
router.put('/:id', modifyVideogame)
router.delete('/:id', deleteVideogame)

module.exports = router;