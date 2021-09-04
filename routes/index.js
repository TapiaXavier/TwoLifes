let router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Welcome to TwoLifes')
})

router.use('/ads', require('./ads'))

module.exports = router