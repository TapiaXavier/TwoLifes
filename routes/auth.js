const router = require('express').Router();
const auth=require('../middleware/auth');

const {
  signUp,
  login,
  deleteAccount
}= require('../controllers/auth');

router.post('/signup',signUp);
router.post('/login',login);
router.delete('/account',[auth.requerido],deleteAccount);

module.exports=router;