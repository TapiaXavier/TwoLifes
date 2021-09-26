const config = require('./config')
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.connect(config.MONGODB_URI)
mongoose.set("debug", true)

require('./models/Ad');

const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/v1', require('./routes'));

const PORT = 4001
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})