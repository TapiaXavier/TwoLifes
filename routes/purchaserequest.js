const router = require('express').Router();

const {
    getPurchases,
    getPurchase,
    createPurchase,
    editPurchase,
    deletePurchase
} = require('../controllers/purchaserequest');

router.get('/', getPurchase)
router.get('/:id', getPurchase);
router.post('/', createPurchase);
router.put('/:id', editPurchase);
router.delete('/:id', deletePurchase);

module.exports = router;