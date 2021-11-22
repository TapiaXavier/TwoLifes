const router = require('express').Router();
const { upload } = require('../controllers/images')

router.post('/', upload)

module.exports = router;
