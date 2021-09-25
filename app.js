const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:C28mc7iSC0BvHLjD@cluster0.tzwzo.mongodb.net/twolifes?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

mongoose.set("debug", true)

require('./models/Videogame');

app.use('/v1', require('./routes'));

const PORT = 4001
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})