const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const port = process.env.PORT || 4000;

const app = express();

//Enable all CORS Requests
app.use(cors());

//Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//connect to db using sequlizer
db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//to make uploads folder avaliable everywhere
app.use('/uploads', express.static('uploads'));
app.use('/editProduct/uploads', express.static('uploads'));

//Routes
const products = require('./api/products');
const users = require('./api/users');
const orders = require('./api/orders');
const clients = require('./api/clients');

//Use Routes
app.use('/products', products);
app.use('/users', users);
app.use('/orders', orders);
app.use('/clients', clients);

app.listen(port, () => {
    console.log('Server is running on ' + port);
});
