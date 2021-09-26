// Express
const express = require('express')
const app = express()

//Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./models/Ad')
require('./models/User')
require('./models/PurchaseRequest')
require('./models/Videogame')
app.use('/v1', require('./routes'));


//Server iniciation
/*app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)*/
//})