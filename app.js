// Express
const express = require('express')
const app = express()
const mongoose = require("mongoose");

//Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

require('./models/Ad')
require('./models/User')
require('./models/PurchaseRequest')
require('./models/Videogame')

app.use('/v1', require('./routes'));


var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Escuchando en el puerto ' + server.address().port);
  });
