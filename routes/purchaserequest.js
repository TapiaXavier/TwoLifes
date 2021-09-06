const router = require('express').Router();

const {
    getPurchases,
    getPurchase,
    createPurchase,
    editPurchase,
    deletePurchase
} = require('../controllers/purchaserequest');

router.get('/:id', getPurchase);
router.get('/', getPurchases);
router.post('/', createPurchase);
router.put('/', editPurchase);
router.delete('/', deletePurchase);

module.exports = router()