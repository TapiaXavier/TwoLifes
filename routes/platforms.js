const router = require('express').Router();

const {
    getPlatform,
    addPlatform
} = require('../controllers/platforms')

router.get('/', getPlatform)
router.get('/:id', getPlatform)
router.post('/', addPlatform)

module.exports = router;