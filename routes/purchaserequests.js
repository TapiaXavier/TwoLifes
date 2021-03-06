const router = require('express').Router();
const populate=require('../middleware/populate')
const filters=require('../middleware/filters')
const sort= require('../middleware/sort')
const {
    getPurchase,
    createPurchase,
    editPurchase,
    deletePurchase
} = require('../controllers/purchaserequest');

router.get('/',[filters,populate,sort], getPurchase)
router.get('/:id', getPurchase);
router.post('/', createPurchase);
router.put('/:id', editPurchase);
router.delete('/:id', deletePurchase);

module.exports = router;