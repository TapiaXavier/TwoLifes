const router = require('express').Router();

const {
    getPurchase,
    getPurchaseByUser,
    createPurchase,
    editPurchase,
    deletePurchase
} = require('../controllers/purchaserequest');

router.get('/', getPurchase)
router.get('/u/:id', getPurchaseByUser);
router.get('/:id', getPurchase);
router.post('/', createPurchase);
router.put('/:id', editPurchase);
router.delete('/:id', deletePurchase);

module.exports = router;