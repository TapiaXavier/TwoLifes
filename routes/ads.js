const router = require('express').Router();

const {
    getAd,
    createAd,
    editAd,
    deleteAd
} = require('../controllers/ads');

router.get('/', getAd);
router.get('/:id', getAd);
router.post('/', createAd);
router.put('/:id', editAd);
router.delete('/:id', deleteAd);

module.exports = router;