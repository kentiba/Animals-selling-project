const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const path = require('path');

//setting port
const port = process.env.PORT || 4000;

//import models
const Client = require('./models/Clients');
const Order = require('./models/Order');

const app = express();

//Enable all CORS Requests
app.use(cors());

//Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//connect to db using sequlize
db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//create association
Client.hasMany(Order);
Order.belongsTo(Client);

//to create table using sequlize if not exist
db.sync()
    .then(() => {
        console.log('Tables have been created');
    })
    .catch(err => {
        console.error('Unable to create tables:', err);
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

//Server static assests if in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log('Server is running on ' + port);
});
