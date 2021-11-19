const router = require('express').Router();

const {
    getPlatform,
    addPlatform,
    editPlatform,
    deletePlatform
} = require('../controllers/platforms')

router.get('/', getPlatform)
router.get('/:id', getPlatform)
router.post('/', addPlatform)
router.put('/:id', editPlatform)
router.delete('/:id', deletePlatform)

module.exports = router;