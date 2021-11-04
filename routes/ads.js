const router = require('express').Router();
const filters= require('../middleware/filters')
const populate=require('../middleware/populate')
const sort= require('../middleware/sort')
const {
    getAd,
    createAd,
    editAd,
    deleteAd
} = require('../controllers/ads');

router.get('/',[filters,populate,sort], getAd);
router.get('/:id', getAd);
router.post('/', createAd);
router.put('/:id', editAd);
router.delete('/:id', deleteAd);

module.exports = router;