// importing required dependencies
var router = require('express').Router();

// endpoint root
router.get('/', (req, res)=>{
  res.send(`Welcome to the TwoLifes API, 
  dedicated for those seeking to buy and sell used video games without a hassle`);
});

router.use('/users', require('./users'));
router.use('/videogames', require('./videogames'));
router.use('/ads', require('./ads'));
router.use('/bids', require('./bids'));


// exporting
module.exports = router;