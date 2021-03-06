if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();
  }

// Express
const express = require('express')
const app = express()
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser')

var multer = require('multer');
var upload = multer();

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(upload.array())

mongoose.connect(process.env.MONGODB_URI, { 
    useUnifiedTopology: true,
    useNewUrlParser: true, 
    useCreateIndex: true 
}).catch(error => console.log(error));

require('./models/Ad')
require('./models/User')
require('./models/PurchaseRequest')
require('./models/Videogame')
require('./models/Platform')
require('./config/passport')

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/v1', require('./routes'));

var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Escuchando en el puerto ' + server.address().port);
});