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

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

require('./models/Ad');

const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
require('./models/Ad')
require('./models/User')
require('./models/PurchaseRequest')
require('./models/Videogame')
app.use('/v1', require('./routes'));

const PORT = 4001
//Server iniciation
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})