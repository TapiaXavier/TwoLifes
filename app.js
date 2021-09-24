// Express
const express = require('express')
const app = express()

//Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//DB Config
const mongoose = require('mongoose');

/*mongoose.connect(
    //process.env.MONGODB_URI
    //{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
	);*/

mongoose.set("debug", true)

require('./models/Ad')
require('./models/User')

require('./models/PurchaseRequest')
require('./models/Videogame')
//require('./config/Videogame')

//require('./config/passport')

//Routes
app.use('/v1', require('./routes'));


//Server iniciation
/*app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)*/
//})