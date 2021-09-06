const router = require('express').Router();

const {
    getAd,
    getAds,
    createAd,
    editAd,
    deleteAd
} = require('../controllers/ads');

router.get('/:id', getAd);
router.get('/', getAds);
router.post('/', createAd);
router.put('/:id', editAd);
router.delete('/:id', deleteAd);

module.exports = router